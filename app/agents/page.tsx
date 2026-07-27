'use client'

import { useState } from 'react'
import { Bot, Plus, Settings, FileText, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type AgentType = 'Builder' | 'Designer' | 'Debugger' | 'Optimizer' | 'Tester' | 'Documenter'
type AgentStatus = 'active' | 'inactive'

interface Agent {
  id: string
  name: string
  type: AgentType
  description: string
  status: AgentStatus
  tasksCompleted: number
}

const sampleAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Frontend Builder',
    type: 'Builder',
    description: 'Builds React components and pages from design specs and requirements.',
    status: 'active',
    tasksCompleted: 142,
  },
  {
    id: 'agent-2',
    name: 'UI Polisher',
    type: 'Designer',
    description: 'Refines layouts, typography, and color schemes for visual consistency.',
    status: 'active',
    tasksCompleted: 89,
  },
  {
    id: 'agent-3',
    name: 'Bug Hunter',
    type: 'Debugger',
    description: 'Identifies and reproduces bugs, suggests fixes with code diffs.',
    status: 'active',
    tasksCompleted: 237,
  },
  {
    id: 'agent-4',
    name: 'Perf Optimizer',
    type: 'Optimizer',
    description: 'Analyzes bundle size, lazy loads assets, and optimizes rendering paths.',
    status: 'inactive',
    tasksCompleted: 56,
  },
  {
    id: 'agent-5',
    name: 'QA Bot',
    type: 'Tester',
    description: 'Generates and runs unit, integration, and e2e test suites automatically.',
    status: 'active',
    tasksCompleted: 314,
  },
  {
    id: 'agent-6',
    name: 'Docs Writer',
    type: 'Documenter',
    description: 'Generates API docs, README files, and inline JSDoc comments.',
    status: 'active',
    tasksCompleted: 178,
  },
  {
    id: 'agent-7',
    name: 'API Builder',
    type: 'Builder',
    description: 'Constructs REST and GraphQL endpoints with type-safe schemas.',
    status: 'inactive',
    tasksCompleted: 95,
  },
  {
    id: 'agent-8',
    name: 'Accessibility Checker',
    type: 'Tester',
    description: 'Audits components for WCAG compliance and suggests ARIA improvements.',
    status: 'active',
    tasksCompleted: 201,
  },
]

const typeIcons: Record<AgentType, typeof Bot> = {
  Builder: Bot,
  Designer: Bot,
  Debugger: Bot,
  Optimizer: Bot,
  Tester: Bot,
  Documenter: Bot,
} as const

export default function AgentsPage() {
  const [agents, setAgents] = useState(sampleAgents)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Your Agents</h1>
            <p className="text-muted-foreground text-lg">Manage and orchestrate your active AI agents.</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No agents yet</p>
            <p className="text-sm mt-1">Create your first agent to get started.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => {
              const Icon = typeIcons[agent.type]
              return (
                <Card key={agent.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        {agent.name}
                      </CardTitle>
                      <Badge
                        variant={agent.status === 'active' ? 'default' : 'secondary'}
                        className={agent.status === 'active' ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : ''}
                      >
                        {agent.status === 'active' ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : null}
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 pt-0 space-y-3">
                    <Badge variant="outline">{agent.type}</Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {agent.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="w-3.5 h-3.5" />
                      {agent.tasksCompleted} tasks completed
                    </div>
                  </CardContent>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/agents/${agent.id}`}>
                          <Settings className="w-3.5 h-3.5 mr-1" />
                          Configure
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/agents/${agent.id}/logs`}>
                          <FileText className="w-3.5 h-3.5 mr-1" />
                          View Logs
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}