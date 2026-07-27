import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollText, Settings, Rocket, Zap, Terminal, Eye } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from '@/lib/session/get-server-session'

interface Template {
  id: string
  name: string
  description: string
  techStack: string[]
  features: string[]
  category: string
  imageUrl?: string
  previewUrl?: string
  rating?: number
  useCount?: number
}

const TEMPLATES: Record<string, Template> = {
  'nextjs-dashboard': {
    id: 'nextjs-dashboard',
    name: 'Next.js Dashboard',
    description: 'A modern dashboard with charts, sidebar navigation, and dark mode support. Built with Next.js, TypeScript, and Tailwind CSS.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    features: ['Responsive layout', 'Dark mode toggle', 'Chart visualizations', 'User authentication', 'Real-time data updates'],
    category: 'Next.js',
    rating: 4.8,
    useCount: 1240,
  },
  'e-commerce-store': {
    id: 'e-commerce-store',
    name: 'E-Commerce Store',
    description: 'Full-featured online store with product listing, cart, and checkout. Powered by Next.js and Stripe.',
    techStack: ['Next.js', 'Prisma', 'Stripe', 'Tailwind CSS'],
    features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order tracking', 'Inventory management'],
    category: 'E-commerce',
    rating: 4.6,
    useCount: 890,
  },
  'ai-chatbot': {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'AI-powered chat interface with streaming responses and conversation history. Built with Vercel AI SDK.',
    techStack: ['Next.js', 'OpenAI', 'Vercel AI SDK', 'Tailwind CSS'],
    features: ['Streaming responses', 'Conversation history', 'Markdown rendering', 'Code block support', 'Multi-model support'],
    category: 'AI/ML',
    rating: 4.9,
    useCount: 2100,
  },
}

const DEFAULT_TEMPLATE: Template = {
  id: 'nextjs-dashboard',
  name: 'Next.js Dashboard',
  description: 'A modern dashboard template.',
  techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  features: ['Responsive', 'Dark mode', 'Charts'],
  category: 'Next.js',
}

async function getTemplate(id: string): Promise<Template | null> {
  const template = TEMPLATES[id]
  return template ?? null
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = await getTemplate(id)

  if (!template) {
    notFound()
  }

  const session = await getServerSession()

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/marketplace" className="hover:text-foreground transition-colors">Templates</Link>
        <span>/</span>
        <span className="text-foreground">{template.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="aspect-video bg-muted rounded-xl overflow-hidden flex items-center justify-center border">
          <div className="text-center">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Template Preview</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Badge variant="secondary" className="mb-2">{template.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold">{template.name}</h1>
          </div>
          <p className="text-muted-foreground leading-relaxed">{template.description}</p>

          <div className="flex flex-wrap gap-2">
            {template.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            {template.rating && (
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {template.rating}
              </span>
            )}
            <span className="text-muted-foreground">{template.useCount?.toLocaleString()} uses</span>
          </div>

          <div className="flex gap-3">
            <Link href={session?.user?.id ? `/tasks/new?template=${template.id}` : '/auth/signin'}>
              <Button className="gap-2">
                <Rocket className="h-4 w-4" />
                Use This Template
              </Button>
            </Link>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Customize with AI
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="tech">Tech Stack</TabsTrigger>
          <TabsTrigger value="prompt">AI Prompt Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-4">
          <Card>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-2">
                {template.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tech" className="mt-4">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-wrap gap-2">
                {template.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prompt" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                Prompt Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                `Build a ${template.name.toLowerCase()} with ${template.techStack[0]}`,
                `Create a ${template.name.toLowerCase()} with authentication and user profiles`,
                `Add real-time features to the ${template.name.toLowerCase()}`,
                `Implement ${template.techStack[1] || 'TypeScript'} patterns in the ${template.name.toLowerCase()}`,
              ].map((prompt) => (
                <div
                  key={prompt}
                  className="p-3 rounded-lg bg-muted/50 border text-sm cursor-pointer hover:bg-muted transition-colors"
                >
                  {prompt}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}