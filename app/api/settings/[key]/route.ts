import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { settings } from '@/lib/db/schema'
import { getSessionFromReq } from '@/lib/session/server'
import { eq, and } from 'drizzle-orm'

interface RouteParams {
  params: Promise<{ key: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { key } = await params

    const [setting] = await db
      .select()
      .from(settings)
      .where(and(eq(settings.userId, session.user.id), eq(settings.key, key)))
      .limit(1)

    if (!setting) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: setting,
    })
  } catch (error) {
    console.error('Error fetching setting:', error)
    return NextResponse.json({ error: 'Failed to fetch setting' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { key } = await params

    await db.delete(settings).where(and(eq(settings.userId, session.user.id), eq(settings.key, key)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting setting:', error)
    return NextResponse.json({ error: 'Failed to delete setting' }, { status: 500 })
  }
}