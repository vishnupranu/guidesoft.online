import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    console.log('[Webhook - Make] Received payload:', payload)

    // Example logic: trigger an internal agent workflow based on the webhook payload
    // if (payload.action === 'trigger_agent') { ... }

    return NextResponse.json({
      success: true,
      message: 'Make.com payload received successfully',
      receivedData: payload,
    })
  } catch (error) {
    console.error('[Webhook - Make] Error parsing payload:', error)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
