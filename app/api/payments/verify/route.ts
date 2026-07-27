import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSessionFromReq } from '@/lib/session/server'
import { saveSession } from '@/lib/session/create'
import { db } from '@/lib/db/client'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment gateway configuration missing' }, { status: 500 })
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      await db.update(users).set({ role: 'paid_user' }).where(eq(users.id, session.user.id))

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          role: 'paid_user' as const,
        },
      }

      const response = NextResponse.json({ success: true, message: 'Payment verified and role upgraded' })
      await saveSession(response, updatedSession)
      return response
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error)
    return NextResponse.json({ error: 'Failed to verify payment', details: error.message }, { status: 500 })
  }
}
