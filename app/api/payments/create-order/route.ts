import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getSessionFromReq } from '@/lib/session/server'
import { requireRole } from '@/lib/auth/rbac'

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromReq(req)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Optional: Check if already paid_user
    // if (session.user.role === 'paid_user') {
    //   return NextResponse.json({ error: 'Already upgraded' }, { status: 400 })
    // }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn('Razorpay keys are missing. Cannot process payment.')
      return NextResponse.json({ error: 'Payment gateway configuration missing' }, { status: 500 })
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
      amount: 999 * 100, // Amount is in currency subunits (e.g., paise). 999 INR
      currency: 'INR',
      receipt: `receipt_order_${session.user.id}_${Date.now()}`,
    }

    const order = await instance.orders.create(options)

    return NextResponse.json(order)
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error)
    return NextResponse.json({ error: 'Failed to create order', details: error.message }, { status: 500 })
  }
}
