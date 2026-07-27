import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export type AvailableModels = 'claude-3-7-sonnet' | 'gpt-4-turbo' | 'deepseek-r1' | 'ollama-llama-3'

interface RouteOptions {
  taskType: 'reasoning' | 'coding' | 'general' | 'local-privacy'
  prompt: string
}

function getModelForTask(taskType: AvailableModels): AvailableModels {
  return taskType
}

export class LLMGateway {
  static routeTask(options: RouteOptions) {
    console.log(`[LLM Gateway] Routing task of type: ${options.taskType}`)

    let selectedModel: AvailableModels = 'gpt-4-turbo'
    let provider: 'openai' | 'anthropic' | 'deepseek' | 'ollama' = 'openai'

    switch (options.taskType) {
      case 'reasoning':
        selectedModel = 'deepseek-r1'
        provider = 'deepseek'
        break
      case 'coding':
        selectedModel = 'claude-3-7-sonnet'
        provider = 'anthropic'
        break
      case 'local-privacy':
        selectedModel = 'ollama-llama-3'
        provider = 'ollama'
        break
      case 'general':
      default:
        selectedModel = 'gpt-4-turbo'
        provider = 'openai'
    }

    console.log(`[LLM Gateway] Selected model: ${selectedModel} via provider: ${provider}`)

    return {
      model: selectedModel,
      execute: async () => {
        try {
          if (provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
            try {
              const { anthropic } = await import('@ai-sdk/anthropic')
              const { text } = await generateText({
                model: anthropic('claude-3-7-sonnet-20250219'),
                prompt: options.prompt,
              })
              return { text }
            } catch (importError) {
              console.warn('[LLM Gateway] Anthropic provider not available, falling back...', importError)
            }
          }

          if (provider === 'deepseek' && process.env.OPENAI_API_KEY) {
            const { text } = await generateText({
              model: openai('deepseek-r1'),
              prompt: options.prompt,
            })
            return { text }
          }

          if (provider === 'openai' && process.env.OPENAI_API_KEY) {
            const { text } = await generateText({
              model: openai('gpt-4-turbo'),
              prompt: options.prompt,
            })
            return { text }
          }

          if (provider === 'ollama' && process.env.OLLAMA_API_URL) {
            const { text } = await generateText({
              model: openai('ollama-llama-3', {
                baseURL: process.env.OLLAMA_API_URL + '/v1',
              }),
              prompt: options.prompt,
            })
            return { text }
          }

          console.warn(`[LLM Gateway] No API key found for provider ${provider}. Using fallback mock response.`)
        } catch (e) {
          console.warn(`[LLM Gateway] Execution failed, falling back to mock...`, e)
        }

        return { text: `Mocked response from ${selectedModel}` }
      },
    }
  }
}
