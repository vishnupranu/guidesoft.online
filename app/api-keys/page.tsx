import { ApiKeysDialog } from '@/components/settings/api-keys-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Key, Plus, Shield } from 'lucide-react'

interface ProviderInfo {
  id: string
  name: string
  description: string
  docsUrl: string
}

const PROVIDERS: ProviderInfo[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT models, embeddings, and more',
    docsUrl: 'https://platform.openai.com/docs',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude models for coding and reasoning',
    docsUrl: 'https://docs.anthropic.com',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: "Google's AI models for code and text",
    docsUrl: 'https://ai.google.dev/docs',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-powered code editor and agent',
    docsUrl: 'https://docs.cursor.com',
  },
  {
    id: 'aigateway',
    name: 'AI Gateway',
    description: 'Unified proxy for multiple AI providers',
    docsUrl: 'https://docs.guidesoft.ai',
  },
]

export const metadata = {
  title: 'API Keys - GUIDESOFT.AI',
  description: 'Manage your API keys for AI providers',
}

export default async function ApiKeysPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground mt-1">
            Manage your API keys for connected providers. Add keys to enable AI agents and features.
          </p>
        </div>
        <ApiKeysDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROVIDERS.map((provider) => (
          <Card key={provider.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{provider.name}</CardTitle>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>{provider.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm">
                <Badge variant="outline">{provider.id}</Badge>
              </div>
            </CardContent>
            <CardContent className="pt-0">
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer">
                  View Docs
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}