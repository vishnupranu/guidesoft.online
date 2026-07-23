import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    console.log('[Webhook - n8n] Received payload:', payload)

    // Example logic: trigger an internal agent workflow based on the webhook payload
    // if (payload.action === 'trigger_agent') { ... }

    return NextResponse.json({
      success: true,
      message: 'n8n payload received successfully',
      receivedData: payload,
    })
  } catch (error) {
    console.error('[Webhook - n8n] Error parsing payload:', error)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
