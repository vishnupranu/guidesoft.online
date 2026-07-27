'use client'

import { useState } from 'react'
import { Bot, Search, Star, Download } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const categories = ['All', 'Coding', 'Design', 'Testing', 'DevOps', 'Data']

const agents = [
  {
    id: '1',
    name: 'Code Generator',
    description: 'Generates clean, boilerplate code for common patterns and components.',
    category: 'Coding',
    icon: Bot,
    rating: 4.8,
    installs: 3420,
  },
  {
    id: '2',
    name: 'UI Designer',
    description: 'Creates responsive, accessible UI layouts from natural language descriptions.',
    category: 'Design',
    icon: Bot,
    rating: 4.6,
    installs: 2180,
  },
  {
    id: '3',
    name: 'Test Runner',
    description: 'Automates test generation, execution, and coverage reporting for your codebase.',
    category: 'Testing',
    icon: Bot,
    rating: 4.7,
    installs: 1890,
  },
  {
    id: '4',
    name: 'CI Pipeline',
    description: 'Builds and deploys CI/CD pipelines with automated testing and deployment steps.',
    category: 'DevOps',
    icon: Bot,
    rating: 4.5,
    installs: 1560,
  },
  {
    id: '5',
    name: 'Data Analyzer',
    description: 'Performs exploratory data analysis, generates visualizations and statistical reports.',
    category: 'Data',
    icon: Bot,
    rating: 4.9,
    installs: 4210,
  },
  {
    id: '6',
    name: 'Linter Fixer',
    description: 'Automatically detects and fixes linting issues across multiple languages.',
    category: 'Coding',
    icon: Bot,
    rating: 4.3,
    installs: 980,
  },
  {
    id: '7',
    name: 'Prototype Builder',
    description: 'Builds interactive design prototypes with animations and component previews.',
    category: 'Design',
    icon: Bot,
    rating: 4.4,
    installs: 1340,
  },
  {
    id: '8',
    name: 'E2E Tester',
    description: 'Generates end-to-end test suites with realistic user interaction simulations.',
    category: 'Testing',
    icon: Bot,
    rating: 4.6,
    installs: 1120,
  },
  {
    id: '9',
    name: 'Infra Provisioner',
    description: 'Provisions cloud infrastructure with IaC templates for reproducible deployments.',
    category: 'DevOps',
    icon: Bot,
    rating: 4.5,
    installs: 870,
  },
  {
    id: '10',
    name: 'ETL Pipeline',
    description: 'Extracts, transforms, and loads data between sources with incremental processing.',
    category: 'Data',
    icon: Bot,
    rating: 4.7,
    installs: 2050,
  },
  {
    id: '11',
    name: 'Refactoring Assistant',
    description: 'Intelligently refactors codebases for performance, readability, and maintainability.',
    category: 'Coding',
    icon: Bot,
    rating: 4.8,
    installs: 2760,
  },
  {
    id: '12',
    name: 'Design System Builder',
    description: 'Generates consistent design tokens, components, and documentation from a style guide.',
    category: 'Design',
    icon: Bot,
    rating: 4.4,
    installs: 720,
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = agents.filter((agent) => {
    const matchesCategory = activeCategory === 'All' || agent.category === activeCategory
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Agent Marketplace</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover and install specialized AI agents to supercharge your workflow.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No agents found matching your criteria.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((agent) => (
              <Card key={agent.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <agent.icon className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate">{agent.name}</h3>
                      <Badge variant="secondary" className="mt-0.5">
                        {agent.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {agent.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {agent.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {agent.installs.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/marketplace/${agent.id}`}>Install</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}