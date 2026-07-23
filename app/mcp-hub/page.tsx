'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Server, ShieldCheck, Key, Plus, CheckCircle2, Globe, Database, Terminal, Search, Zap } from 'lucide-react'

interface MCPServer {
  id: string
  name: string
  url: string
  description: string
  status: 'connected' | 'disconnected'
  category: string
  requiresAuth: boolean
}

export default function MCPHubPage() {
  const [servers, setServers] = useState<MCPServer[]>([
    {
      id: '1',
      name: 'PostgreSQL Database MCP',
      url: 'https://mcp.postgres.internal/v1',
      description:
        'Allows Claude Code agent to inspect schema definitions, execute queries, and generate migrations directly.',
      status: 'connected',
      category: 'Database',
      requiresAuth: true,
    },
    {
      id: '2',
      name: 'Brave Search & Web Scraper MCP',
      url: 'https://mcp.brave-search.dev',
      description: 'Provides live web search capabilities and documentation lookup for frameworks and npm packages.',
      status: 'connected',
      category: 'Search',
      requiresAuth: true,
    },
    {
      id: '3',
      name: 'GitHub Repository Manager MCP',
      url: 'https://mcp.github-tools.com',
      description: 'Enables deep issue tracking, PR reviews, and workflow dispatching.',
      status: 'disconnected',
      category: 'Development',
      requiresAuth: true,
    },
  ])

  const [newServerName, setNewServerName] = useState('')
  const [newServerUrl, setNewServerUrl] = useState('')
  const [newServerCategory, setNewServerCategory] = useState('Tools')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddServer = () => {
    if (!newServerName.trim() || !newServerUrl.trim()) return

    const newEntry: MCPServer = {
      id: Date.now().toString(),
      name: newServerName,
      url: newServerUrl,
      description: 'Custom user-attached Model Context Protocol (MCP) tool server.',
      status: 'connected',
      category: newServerCategory,
      requiresAuth: false,
    }

    setServers([...servers, newEntry])
    setNewServerName('')
    setNewServerUrl('')
    setIsModalOpen(false)
  }

  const toggleStatus = (id: string) => {
    setServers(
      servers.map((s) => (s.id === id ? { ...s, status: s.status === 'connected' ? 'disconnected' : 'connected' } : s)),
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 space-y-8 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide uppercase">
            <Server className="w-4 h-4" />
            <span>Model Context Protocol Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">MCP Tools & Servers</h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Extend Claude Code and CLI coding agents with custom tool servers, database connections, and external API
            capabilities.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-1.5 shadow-lg shadow-emerald-950/60"
        >
          <Plus className="w-4 h-4" /> Add MCP Server
        </Button>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                <Zap className="w-4 h-4 text-emerald-400" /> Connect MCP Server
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs">
                Provide server metadata and target URL for Model Context Protocol integration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Server Name</label>
                <input
                  type="text"
                  placeholder="e.g., PostgreSQL Inspector"
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Endpoint Base URL</label>
                <input
                  type="url"
                  placeholder="https://mcp.your-domain.com"
                  value={newServerUrl}
                  onChange={(e) => setNewServerUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium">Category</label>
                <select
                  value={newServerCategory}
                  onChange={(e) => setNewServerCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100 outline-none focus:border-emerald-500"
                >
                  <option value="Database">Database</option>
                  <option value="Search">Search</option>
                  <option value="Development">Development</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t border-zinc-800 pt-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddServer} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                Save & Connect
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Grid of Servers */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {servers.map((server) => (
          <Card key={server.id} className="bg-zinc-900 border-zinc-800 text-zinc-100 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-zinc-800 text-emerald-400 font-mono text-[10px]">
                  {server.category}
                </Badge>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      server.status === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                    }`}
                  />
                  <span className="text-[11px] font-medium capitalize text-zinc-300">{server.status}</span>
                </div>
              </div>
              <CardTitle className="text-base font-bold text-white mt-1">{server.name}</CardTitle>
              <CardDescription className="text-zinc-400 text-xs line-clamp-2 mt-0.5">
                {server.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="py-2 text-xs font-mono text-zinc-400 bg-zinc-950/50 border-y border-zinc-800/60 p-3 truncate">
              {server.url}
            </CardContent>

            <CardFooter className="pt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AES-256 Encrypted</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleStatus(server.id)}
                className={`border-zinc-800 text-xs ${
                  server.status === 'connected'
                    ? 'hover:bg-red-950/40 hover:text-red-300 text-zinc-300'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                }`}
              >
                {server.status === 'connected' ? 'Disconnect' : 'Connect'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
