import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { agents, insertAgentSchema } from '@/lib/db/schema'
import { getSessionFromReq } from '@/lib/session/server'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userAgents = await db.select().from(agents).where(eq(agents.userId, session.user.id))

    return NextResponse.json({
      success: true,
      data: userAgents,
    })
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, type, description, config } = body as {
      name: string
      type: string
      description?: string
      config?: Record<string, unknown>
    }

    if (!name || !type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 })
    }

    const validated = insertAgentSchema.parse({
      id: nanoid(),
      userId: session.user.id,
      name,
      type,
      description: description ?? null,
      config: config ?? null,
    })

    const [newAgent] = await db.insert(agents).values(validated).returning()

    return NextResponse.json({
      success: true,
      data: newAgent,
    })
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
    }

    const [existing] = await db
      .select()
      .from(agents)
      .where(and(eq(agents.id, id), eq(agents.userId, session.user.id)))
      .limit(1)

    if (!existing) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    await db.delete(agents).where(eq(agents.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting agent:', error)
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 })
  }
}