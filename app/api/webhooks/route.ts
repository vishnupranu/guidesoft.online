import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('x-api-key')
    const validKey = process.env.WEBHOOK_API_KEY

    if (!validKey || authHeader !== validKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Trigger Celery Task via the FastAPI endpoint
    const fastApiUrl = process.env.FASTAPI_URL || 'http://localhost:8000'
    const celeryResponse = await fetch(`${fastApiUrl}/api/tasks/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_name: body.agent || 'Orchestrator',
        task_data: body.payload || {},
      }),
    })

    if (!celeryResponse.ok) {
      throw new Error('Failed to queue task in Celery')
    }

    const celeryResult = await celeryResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Workflow triggered successfully via Webhook',
      task_id: celeryResult.task_id,
    })
  } catch (error: any) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
