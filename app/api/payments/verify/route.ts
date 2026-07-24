import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSessionFromReq } from '@/lib/session/server'
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
      // Payment successful, upgrade user role
      await db.update(users).set({ role: 'paid_user' }).where(eq(users.id, session.user.id))

      // Note: The session cookie will still have role: 'free_user' until they re-login or
      // the session is refreshed. A robust implementation would also update the session cookie here.

      return NextResponse.json({ success: true, message: 'Payment verified and role upgraded' })
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error)
    return NextResponse.json({ error: 'Failed to verify payment', details: error.message }, { status: 500 })
  }
}
