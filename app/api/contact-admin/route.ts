import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { contacts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message content are required.' },
        { status: 400 },
      )
    }

    const timestamp = new Date().toISOString()

    console.log(`[CONTACT ADMIN INQUIRY -> admin@guidesoft.online]`, {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      timestamp,
    })

    try {
      await db.insert(contacts).values({
        name: name || '',
        email,
        subject: subject || 'General Inquiry',
        message,
        createdAt: timestamp,
      })
    } catch (dbError) {
      console.error('Failed to save contact inquiry to DB:', dbError)
    }

    return NextResponse.json({
      success: true,
      recipient: 'admin@guidesoft.online',
      message: 'Your inquiry has been successfully transmitted to admin@guidesoft.online.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 },
    )
  }
}