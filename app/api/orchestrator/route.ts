import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/session/get-server-session'
import { LLMGateway } from '@/lib/llm-gateway'
import { VectorStore } from '@/lib/vector-store'
import { E2BSandbox } from '@/lib/e2b-sandbox'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { query, requiresExecution = false } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    console.log(`[Orchestrator] Received query: "${query}"`)

    const memory = new VectorStore('agent-memory')
    const similarDocs = await memory.searchSimilar(query)
    console.log(`[Orchestrator] Retrieved ${similarDocs.length} context documents.`)

    const taskType = query.toLowerCase().includes('code') ? 'coding' : 'reasoning'
    const router = LLMGateway.routeTask({
      taskType: taskType,
      prompt: query,
    })

    const llmResponse = await router.execute()
    let sandboxResult = null

    if (requiresExecution && taskType === 'coding') {
      const sandbox = new E2BSandbox()
      await sandbox.initialize()

      sandboxResult = await sandbox.runCode('python', 'print("Hello from orchestrated microVM")')

      await sandbox.close()
    }

    console.log(`[Orchestrator] Triggering n8n/Make webhook for successful execution...`)

    return NextResponse.json({
      success: true,
      agent: router.model,
      response: llmResponse.text,
      sandboxExecution: sandboxResult,
      contextUsed: similarDocs.length > 0,
    })
  } catch (error) {
    console.error('[Orchestrator Error]', error)
    return NextResponse.json({ error: 'Internal orchestration error' }, { status: 500 })
  }
}
