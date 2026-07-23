'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Terminal as TerminalIcon, Play, Trash2, ArrowDown, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InteractiveTerminalProps {
  taskId: string
  className?: string
  isActive?: boolean
  isMobile?: boolean
  initialCwd?: string
}

interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'system'
  content: string
  timestamp: Date
  exitCode?: number
}

export interface InteractiveTerminalRef {
  clear: () => void
  getTerminalText: () => string
  executeCommand: (cmd: string) => Promise<void>
}

export const InteractiveTerminal = forwardRef<InteractiveTerminalRef, InteractiveTerminalProps>(
  function InteractiveTerminal({ taskId, className, isActive, isMobile, initialCwd = '/home/vercel-sandbox' }, ref) {
    const [history, setHistory] = useState<TerminalLine[]>([
      {
        id: '1',
        type: 'system',
        content: '⚡ Vercel Sandbox Interactive Terminal ready.',
        timestamp: new Date(),
      },
    ])
    const [currentCommand, setCurrentCommand] = useState('')
    const [isExecuting, setIsExecuting] = useState(false)
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [cwd, setCwd] = useState(initialCwd)
    const [isAutocompleting, setIsAutocompleting] = useState(false)
    const [autoScroll, setAutoScroll] = useState(true)

    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      clear: () => {
        setHistory([])
        setCommandHistory([])
        setHistoryIndex(-1)
      },
      getTerminalText: () => {
        return history.map((line) => (line.type === 'command' ? `$ ${line.content}` : line.content)).join('\n')
      },
      executeCommand: async (cmd: string) => {
        await executeCommand(cmd)
      },
    }))

    useEffect(() => {
      if (autoScroll && terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, [history, autoScroll])

    useEffect(() => {
      if (isActive && !isMobile) {
        inputRef.current?.focus()
      }
    }, [isActive, isMobile])

    const handleTerminalClick = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) return
      if (!isMobile) {
        inputRef.current?.focus()
      }
    }

    const executeCommand = async (command: string) => {
      if (!command.trim() || isExecuting) return

      setCurrentCommand('')
      setIsExecuting(true)

      const lineId = Date.now().toString()

      setHistory((prev) => [
        ...prev,
        {
          id: lineId,
          type: 'command',
          content: command,
          timestamp: new Date(),
        },
      ])

      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)

      try {
        const response = await fetch(`/api/tasks/${taskId}/terminal`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command }),
        })

        const result = await response.json()

        if (response.ok && result.success) {
          const newLines: TerminalLine[] = []

          if (result.data.stdout) {
            newLines.push({
              id: `${lineId}-out`,
              type: 'output',
              content: result.data.stdout,
              timestamp: new Date(),
              exitCode: result.data.exitCode,
            })
          }

          if (result.data.stderr) {
            newLines.push({
              id: `${lineId}-err`,
              type: 'error',
              content: result.data.stderr,
              timestamp: new Date(),
              exitCode: result.data.exitCode,
            })
          }

          setHistory((prev) => [...prev, ...newLines])

          if (command.trim().startsWith('cd ') && result.data.exitCode === 0) {
            try {
              const pwdResp = await fetch(`/api/tasks/${taskId}/terminal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: 'pwd' }),
              })
              const pwdRes = await pwdResp.json()
              if (pwdRes.success && pwdRes.data.stdout) {
                setCwd(pwdRes.data.stdout.trim())
              }
            } catch {
              // Ignore pwd errors
            }
          }
        } else {
          setHistory((prev) => [
            ...prev,
            {
              id: `${lineId}-err`,
              type: 'error',
              content: result.error || 'Command execution failed in sandbox.',
              timestamp: new Date(),
            },
          ])
        }
      } catch (error) {
        console.error('Error running sandbox command:', error)
        setHistory((prev) => [
          ...prev,
          {
            id: `${lineId}-err`,
            type: 'error',
            content: 'Network error executing command.',
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsExecuting(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        executeCommand(currentCommand)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex = historyIndex + 1
          if (newIndex < commandHistory.length) {
            setHistoryIndex(newIndex)
            setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
          }
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
        } else if (historyIndex === 0) {
          setHistoryIndex(-1)
          setCurrentCommand('')
        }
      }
    }

    const quickCommands = [
      { label: 'Git Status', cmd: 'git status' },
      { label: 'List Files', cmd: 'ls -la' },
      { label: 'Check Node', cmd: 'node -v' },
      { label: 'Git Log', cmd: 'git log -n 5 --oneline' },
    ]

    return (
      <div
        className={cn(
          'flex flex-col h-full bg-zinc-950 text-zinc-100 font-mono text-xs border border-zinc-800 rounded-lg overflow-hidden shadow-2xl',
          className,
        )}
        onClick={handleTerminalClick}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2 text-zinc-400">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-zinc-200">Interactive Sandbox Shell</span>
            <span className="text-zinc-500 text-[10px] bg-zinc-800 px-2 py-0.5 rounded font-mono">{cwd}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className={cn('h-6 w-6 text-zinc-400 hover:text-white', autoScroll && 'text-emerald-400')}
              onClick={() => setAutoScroll(!autoScroll)}
              title="Toggle Auto-Scroll"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-zinc-400 hover:text-red-400"
              onClick={() => setHistory([])}
              title="Clear Terminal Output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Quick Command Shortcuts Toolbar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 border-b border-zinc-800/60 overflow-x-auto text-[11px]">
          <span className="text-zinc-500 font-medium text-[10px] uppercase shrink-0">Quick Runs:</span>
          {quickCommands.map((q) => (
            <button
              key={q.cmd}
              onClick={() => executeCommand(q.cmd)}
              disabled={isExecuting}
              className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors shrink-0 disabled:opacity-50"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Output Stream View */}
        <div ref={terminalRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 font-mono leading-relaxed">
          {history.map((line) => {
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-emerald-400/90 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{line.content}</span>
                </div>
              )
            }

            if (line.type === 'command') {
              return (
                <div key={line.id} className="text-cyan-300 font-semibold flex items-center gap-1 mt-2">
                  <span className="text-emerald-400">$</span>
                  <span>{line.content}</span>
                </div>
              )
            }

            return (
              <div
                key={line.id}
                className={cn(
                  'whitespace-pre-wrap break-words pl-3 border-l-2',
                  line.type === 'error'
                    ? 'text-red-400 border-red-500/50 bg-red-950/10 py-1'
                    : 'text-zinc-200 border-emerald-500/20',
                )}
              >
                {line.content}
              </div>
            )
          })}
        </div>

        {/* Input Bar */}
        <div className="border-t border-zinc-800 p-2.5 bg-zinc-900/90 flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isExecuting}
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500 text-xs font-mono disabled:opacity-50"
            placeholder={isExecuting ? 'Executing command...' : 'Type command and press Enter...'}
          />
          <Button
            size="sm"
            onClick={() => executeCommand(currentCommand)}
            disabled={!currentCommand.trim() || isExecuting}
            className="h-7 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs gap-1"
          >
            <Play className="w-3 h-3 fill-current" />
            Run
          </Button>
        </div>
      </div>
    )
  },
)
