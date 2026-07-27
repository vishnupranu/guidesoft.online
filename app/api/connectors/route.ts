import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { connectors } from '@/lib/db/schema'
import { encrypt, decrypt } from '@/lib/crypto'
import { getSessionFromReq } from '@/lib/session/server'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          data: [],
        },
        { status: 401 },
      )
    }

    const userConnectors = await db.select().from(connectors).where(eq(connectors.userId, session.user.id))

    const decryptedConnectors = userConnectors.map((connector) => ({
      ...connector,
      oauthClientSecret: connector.oauthClientSecret ? decrypt(connector.oauthClientSecret) : null,
      env: connector.env ? JSON.parse(decrypt(connector.env)) : null,
    }))

    return NextResponse.json({
      success: true,
      data: decryptedConnectors,
    })
  } catch (error) {
    console.error('Error fetching connectors:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch connectors',
        data: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, type, baseUrl, oauthClientId, oauthClientSecret, command, env } = body as {
      name: string
      description?: string
      type: 'local' | 'remote'
      baseUrl?: string
      oauthClientId?: string
      oauthClientSecret?: string
      command?: string
      env?: Record<string, string>
    }

    if (!name || !type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 })
    }

    if (!['local', 'remote'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const encryptedSecret = oauthClientSecret ? encrypt(oauthClientSecret) : null
    const encryptedEnv = env ? encrypt(JSON.stringify(env)) : null

    const [newConnector] = await db
      .insert(connectors)
      .values({
        id: nanoid(),
        userId: session.user.id,
        name,
        description: description ?? null,
        type,
        baseUrl: baseUrl ?? null,
        oauthClientId: oauthClientId ?? null,
        oauthClientSecret: encryptedSecret,
        command: command ?? null,
        env: encryptedEnv,
        status: 'disconnected',
      })
      .returning()

    return NextResponse.json({
      success: true,
      data: {
        ...newConnector,
        oauthClientSecret: newConnector.oauthClientSecret ? decrypt(newConnector.oauthClientSecret) : null,
        env: newConnector.env ? JSON.parse(decrypt(newConnector.env)) : null,
      },
    })
  } catch (error) {
    console.error('Error creating connector:', error)
    return NextResponse.json({ error: 'Failed to create connector' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, name, description, type, baseUrl, oauthClientId, oauthClientSecret, command, env, status } = body as {
      id: string
      name?: string
      description?: string
      type?: 'local' | 'remote'
      baseUrl?: string
      oauthClientId?: string
      oauthClientSecret?: string
      command?: string
      env?: Record<string, string>
      status?: 'connected' | 'disconnected'
    }

    if (!id) {
      return NextResponse.json({ error: 'Connector ID is required' }, { status: 400 })
    }

    const [existing] = await db
      .select()
      .from(connectors)
      .where(and(eq(connectors.id, id), eq(connectors.userId, session.user.id)))
      .limit(1)

    if (!existing) {
      return NextResponse.json({ error: 'Connector not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}

    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (type !== undefined) {
      if (!['local', 'remote'].includes(type)) {
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
      }
      updateData.type = type
    }
    if (baseUrl !== undefined) updateData.baseUrl = baseUrl
    if (oauthClientId !== undefined) updateData.oauthClientId = oauthClientId
    if (oauthClientSecret !== undefined) updateData.oauthClientSecret = encrypt(oauthClientSecret)
    if (command !== undefined) updateData.command = command
    if (env !== undefined) updateData.env = encrypt(JSON.stringify(env))
    if (status !== undefined) {
      if (!['connected', 'disconnected'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
      }
      updateData.status = status
    }

    updateData.updatedAt = new Date()

    const [updated] = await db
      .update(connectors)
      .set(updateData)
      .where(eq(connectors.id, id))
      .returning()

    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        oauthClientSecret: updated.oauthClientSecret ? decrypt(updated.oauthClientSecret) : null,
        env: updated.env ? JSON.parse(decrypt(updated.env)) : null,
      },
    })
  } catch (error) {
    console.error('Error updating connector:', error)
    return NextResponse.json({ error: 'Failed to update connector' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  return PUT(req)
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
      return NextResponse.json({ error: 'Connector ID is required' }, { status: 400 })
    }

    const [existing] = await db
      .select()
      .from(connectors)
      .where(and(eq(connectors.id, id), eq(connectors.userId, session.user.id)))
      .limit(1)

    if (!existing) {
      return NextResponse.json({ error: 'Connector not found' }, { status: 404 })
    }

    await db.delete(connectors).where(eq(connectors.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting connector:', error)
    return NextResponse.json({ error: 'Failed to delete connector' }, { status: 500 })
  }
}
