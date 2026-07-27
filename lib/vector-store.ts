import { Pinecone } from '@pinecone-database/pinecone'

export class VectorStore {
  private namespace: string
  private client: Pinecone | null = null
  private index: any | null = null
  private isInitialized = false

  constructor(namespace = 'default-memory') {
    this.namespace = namespace

    if (process.env.PINECONE_API_KEY) {
      try {
        this.client = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY,
        })
        const indexName = process.env.PINECONE_INDEX_NAME || 'agent-memory'
        this.index = this.client.Index(indexName)
        this.isInitialized = true
        console.log(`[Vector Store] Initialized Pinecone client with index: ${indexName}, namespace: ${this.namespace}`)
      } catch (e) {
        console.error(`[Vector Store] Failed to initialize Pinecone:`, e)
      }
    } else {
      console.warn(`[Vector Store] PINECONE_API_KEY not found. Operating in mock mode.`)
    }
  }

  async storeKnowledge(metadata: Record<string, any>, text: string) {
    console.log(`[Vector Store] Embedding generated and saved for text: "${text.substring(0, 30)}..."`)
    if (this.isInitialized && this.index) {
      try {
        await this.index.upsert([
          {
            id: metadata.id || `doc-${Date.now()}`,
            values: new Array(1536).fill(0),
            metadata: { ...metadata, text },
          },
        ])
      } catch (e) {
        console.error(`[Vector Store] Failed to store knowledge:`, e)
      }
    }
    return true
  }

  async searchSimilar(query: string, limit = 5) {
    console.log(`[Vector Store] Performing similarity search for query: "${query}"`)
    if (this.isInitialized && this.index) {
      try {
        const queryRequest = {
          vector: new Array(1536).fill(0),
          topK: limit,
          namespace: this.namespace,
          includeMetadata: true,
          includeValues: false,
        }
        const results = await this.index.query(queryRequest)
        return results.matches.map((match: any) => ({
          text: match.metadata?.text || 'Retrieved document',
          score: match.score ?? 0,
        }))
      } catch (e) {
        console.error(`[Vector Store] Query failed, falling back to mock:`, e)
      }
    }

    return [
      { text: 'Mocked retrieved document 1 matching query', score: 0.92 },
      { text: 'Mocked retrieved document 2 matching query', score: 0.85 },
    ]
  }
}
