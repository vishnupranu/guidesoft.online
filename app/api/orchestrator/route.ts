import { NextResponse } from 'next/server'
import { LLMGateway } from '@/lib/llm-gateway'
import { VectorStore } from '@/lib/vector-store'
import { E2BSandbox } from '@/lib/e2b-sandbox'

export async function POST(request: Request) {
  try {
    const { query, requiresExecution = false } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    console.log(`[Orchestrator] Received query: "${query}"`)

    // 1. Vector Store Retrieval (RAG)
    const memory = new VectorStore('agent-memory')
    const similarDocs = await memory.searchSimilar(query)
    console.log(`[Orchestrator] Retrieved ${similarDocs.length} context documents.`)

    // 2. LLM Gateway Routing
    const taskType = query.toLowerCase().includes('code') ? 'coding' : 'reasoning'
    const router = LLMGateway.routeTask({
      taskType: taskType,
      prompt: query,
    })

    const llmResponse = await router.execute()
    let sandboxResult = null

    // 3. E2B Sandbox Execution (if code is generated and execution is requested)
    if (requiresExecution && taskType === 'coding') {
      const sandbox = new E2BSandbox()
      await sandbox.initialize()

      // We assume the LLM responded with some python code to run
      sandboxResult = await sandbox.runCode('python', 'print("Hello from orchestrated microVM")')

      await sandbox.close()
    }

    // 4. Send Webhooks to Make/n8n (Mocked)
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
