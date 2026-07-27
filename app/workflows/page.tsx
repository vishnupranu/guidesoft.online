'use client'

import { useState } from 'react'
import { Workflow, Plus, Trash2, Play, Clock, Bot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Workflow {
  id: string
  name: string
  description: string
  agentCount: number
  lastRunStatus: 'success' | 'failed' | 'running' | 'pending'
  lastRunTime: string
}

const sampleWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Automated QA Pipeline',
    description: 'Runs tests, lints code, and generates a quality report on every push.',
    agentCount: 3,
    lastRunStatus: 'success',
    lastRunTime: '2 hours ago',
  },
  {
    id: 'wf-2',
    name: 'Design to Code',
    description: 'Converts Figma designs into responsive React components with Tailwind styles.',
    agentCount: 2,
    lastRunStatus: 'running',
    lastRunTime: '15 min ago',
  },
  {
    id: 'wf-3',
    name: 'Data Ingestion Pipeline',
    description: 'Extracts data from APIs, validates schemas, and loads into the data warehouse.',
    agentCount: 4,
    lastRunStatus: 'success',
    lastRunTime: '1 day ago',
  },
  {
    id: 'wf-4',
    name: 'Deployment Checker',
    description: 'Validates deployment configurations, runs smoke tests, and rolls back on failure.',
    agentCount: 2,
    lastRunStatus: 'failed',
    lastRunTime: '3 days ago',
  },
  {
    id: 'wf-5',
    name: 'Documentation Generator',
    description: 'Generates API docs, README files, and inline documentation from source code.',
    agentCount: 1,
    lastRunStatus: 'success',
    lastRunTime: '5 hours ago',
  },
  {
    id: 'wf-6',
    name: 'Security Scan',
    description: 'Scans dependencies and code for vulnerabilities, secrets, and compliance issues.',
    agentCount: 2,
    lastRunStatus: 'pending',
    lastRunTime: 'Never',
  },
]

const statusVariants: Record<Workflow['lastRunStatus'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  success: { label: 'Success', variant: 'default' },
  failed: { label: 'Failed', variant: 'destructive' },
  running: { label: 'Running', variant: 'secondary' },
  pending: { label: 'Pending', variant: 'outline' },
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState(sampleWorkflows)

  const handleDelete = (id: string) => {
    setWorkflows(workflows.filter((w) => w.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Workflows</h1>
            <p className="text-muted-foreground text-lg">Design multi-agent chains and automated pipelines.</p>
          </div>
          <Button asChild>
            <Link href="/workflows/builder">
              <Plus className="w-4 h-4 mr-2" />
              Create New Workflow
            </Link>
          </Button>
        </div>

        {workflows.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Workflow className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No workflows yet</p>
            <p className="text-sm mt-1">Create your first workflow to get started.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => {
              const status = statusVariants[workflow.lastRunStatus]
              return (
                <Card key={workflow.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-muted-foreground" />
                        {workflow.name}
                      </CardTitle>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 pt-0 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {workflow.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bot className="w-3.5 h-3.5" />
                        {workflow.agentCount} agent{workflow.agentCount !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {workflow.lastRunTime}
                      </span>
                    </div>
                  </CardContent>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href="/workflows/builder">
                          <Play className="w-3.5 h-3.5 mr-1" />
                          Open
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(workflow.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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