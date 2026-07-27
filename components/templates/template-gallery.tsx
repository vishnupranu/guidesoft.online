'use client'

import { useState } from 'react'
import { TemplateCard } from './template-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Grid3X3, LayoutGrid } from 'lucide-react'

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

const CATEGORIES = ['All', 'Next.js', 'Full-Stack', 'Mobile', 'AI/ML', 'DevOps', 'E-commerce', 'Dashboard']

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: 'nextjs-dashboard',
    name: 'Next.js Dashboard',
    description: 'A modern dashboard with charts, sidebar navigation, and dark mode support.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    features: ['Responsive layout', 'Dark mode', 'Chart visualizations', 'User auth'],
    category: 'Next.js',
    rating: 4.8,
    useCount: 1240,
  },
  {
    id: 'e-commerce-store',
    name: 'E-Commerce Store',
    description: 'Full-featured online store with product listing, cart, and checkout.',
    techStack: ['Next.js', 'Prisma', 'Stripe', 'Tailwind CSS'],
    features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order tracking'],
    category: 'E-commerce',
    rating: 4.6,
    useCount: 890,
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'AI-powered chat interface with streaming responses and conversation history.',
    techStack: ['Next.js', 'OpenAI', 'Vercel AI SDK', 'Tailwind CSS'],
    features: ['Streaming responses', 'Conversation history', 'Markdown rendering', 'Code blocks'],
    category: 'AI/ML',
    rating: 4.9,
    useCount: 2100,
  },
  {
    id: 'rest-api',
    name: 'REST API Starter',
    description: 'FastAPI-based REST API with authentication, rate limiting, and OpenAPI docs.',
    techStack: ['FastAPI', 'Python', 'PostgreSQL', 'Docker'],
    features: ['JWT auth', 'Rate limiting', 'OpenAPI docs', 'Docker support'],
    category: 'Full-Stack',
    rating: 4.5,
    useCount: 650,
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Template',
    description: 'React Native mobile app with navigation, authentication, and push notifications.',
    techStack: ['React Native', 'TypeScript', 'Expo', 'Tailwind Native'],
    features: ['Auth flows', 'Push notifications', 'Deep linking', 'Offline support'],
    category: 'Mobile',
    rating: 4.3,
    useCount: 430,
  },
  {
    id: 'CI-CD-pipeline',
    name: 'CI/CD Pipeline',
    description: 'Complete CI/CD setup with GitHub Actions, Docker, and deployment configs.',
    techStack: ['Docker', 'GitHub Actions', 'Terraform', 'AWS'],
    features: ['Auto deployment', 'Testing pipeline', 'Infrastructure as code', 'Monitoring'],
    category: 'DevOps',
    rating: 4.7,
    useCount: 310,
  },
]

interface TemplateGalleryProps {
  onUseTemplate?: (template: Template) => void
}

export function TemplateGallery({ onUseTemplate }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const filteredTemplates = SAMPLE_TEMPLATES.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1 border rounded-lg p-0.5">
          <Button
            variant={layout === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayout('grid')}
            className="px-2"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLayout('list')}
            className="px-2"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}