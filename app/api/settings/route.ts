import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { settings, insertSettingSchema } from '@/lib/db/schema'
import { getSessionFromReq } from '@/lib/session/server'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userSettings = await db.select().from(settings).where(eq(settings.userId, session.user.id))

    return NextResponse.json({
      success: true,
      data: userSettings,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { key, value } = body as { key: string; value: string }

    if (typeof key !== 'string' || typeof value !== 'string') {
      return NextResponse.json({ error: 'Key and value must be strings' }, { status: 400 })
    }

    const [existing] = await db
      .select()
      .from(settings)
      .where(and(eq(settings.userId, session.user.id), eq(settings.key, key)))
      .limit(1)

    if (existing) {
      const [updated] = await db
        .update(settings)
        .set({ value, updatedAt: new Date() })
        .where(and(eq(settings.userId, session.user.id), eq(settings.key, key)))
        .returning()

      return NextResponse.json({
        success: true,
        data: updated,
      })
    }

    const validated = insertSettingSchema.parse({
      id: nanoid(),
      userId: session.user.id,
      key,
      value,
    })

    const [newSetting] = await db.insert(settings).values(validated).returning()

    return NextResponse.json({
      success: true,
      data: newSetting,
    })
  } catch (error) {
    console.error('Error saving setting:', error)
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    await db.delete(settings).where(and(eq(settings.userId, session.user.id), eq(settings.key, key)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting setting:', error)
    return NextResponse.json({ error: 'Failed to delete setting' }, { status: 500 })
  }
}