'use client'

import { useState } from 'react'
import { InteractiveTerminal } from '@/components/terminal/interactive-terminal'
import { SkillsManager } from '@/components/skills/skills-manager'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Terminal,
  FolderTree,
  Monitor,
  Sparkles,
  Maximize2,
  Minimize2,
  Play,
  FileCode,
  Globe,
  Bot,
  Layers,
  Wrench,
} from 'lucide-react'

interface AgenticWorkspaceProps {
  taskId: string
  repoUrl?: string
  taskPrompt?: string
  agentName?: string
}

export function AgenticWorkspace({ taskId, repoUrl, taskPrompt, agentName = 'claude' }: AgenticWorkspaceProps) {
  const [activeWindow, setActiveWindow] = useState<'terminal' | 'files' | 'preview' | 'skills'>('terminal')
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 font-sans">
      {/* Agentic IDE Workspace Control Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-emerald-950/80 border-emerald-800 text-emerald-400 font-mono text-[11px] gap-1"
          >
            <Bot className="w-3 h-3" /> Agent Window Engine
          </Badge>
          <span className="text-xs font-semibold text-white capitalize">{agentName} Agent Workspace</span>
        </div>

        {/* Window Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800/80 text-xs font-medium">
          <button
            onClick={() => setActiveWindow('terminal')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
              activeWindow === 'terminal'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Terminal</span>
          </button>

          <button
            onClick={() => setActiveWindow('files')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
              activeWindow === 'files' ? 'bg-emerald-600 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>File Access & Tree</span>
          </button>

          <button
            onClick={() => setActiveWindow('skills')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
              activeWindow === 'skills'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Agentic Skills</span>
          </button>

          <button
            onClick={() => setActiveWindow('preview')}
            className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
              activeWindow === 'preview'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Dev Web Preview</span>
          </button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-zinc-400 hover:text-white"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </Button>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 p-3 overflow-hidden bg-zinc-950">
        {activeWindow === 'terminal' && (
          <div className="h-full">
            <InteractiveTerminal taskId={taskId} className="h-full" />
          </div>
        )}

        {activeWindow === 'files' && (
          <div className="h-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-xs overflow-y-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="font-semibold text-emerald-400 flex items-center gap-2">
                <FolderTree className="w-4 h-4" /> Workspace File Access & Code Tree
              </span>
              <span className="text-[10px] text-zinc-500">Path: /home/vercel-sandbox</span>
            </div>
            <div className="text-zinc-400 space-y-1">
              <div className="text-white font-bold">📁 src/</div>
              <div className="pl-4 text-emerald-300">📄 index.ts</div>
              <div className="pl-4 text-emerald-300">📄 app.tsx</div>
              <div className="text-white font-bold">📁 components/</div>
              <div className="pl-4 text-emerald-300">📄 header.tsx</div>
              <div className="pl-4 text-emerald-300">📄 sidebar.tsx</div>
              <div className="text-white font-bold">📄 package.json</div>
              <div className="text-white font-bold">📄 tsconfig.json</div>
            </div>
          </div>
        )}

        {activeWindow === 'skills' && (
          <div className="h-full overflow-y-auto p-2">
            <SkillsManager />
          </div>
        )}

        {activeWindow === 'preview' && (
          <div className="h-full bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Globe className="w-10 h-10 text-emerald-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">Live Dev Server Web Preview</h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Dev server proxy detected on port 3000 inside active Vercel Sandbox.
            </p>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-semibold text-xs transition-colors"
            >
              Open Live Web Preview
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
