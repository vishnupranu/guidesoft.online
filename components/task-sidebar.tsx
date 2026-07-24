'use client'

import { Task } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Trash2,
  Search,
  MessageSquare,
  Layers,
  Server,
  FolderGit2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Image as ImageIcon,
  BookOpen,
  Puzzle,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  Sliders,
  User,
  Zap,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Claude, Codex, Copilot, Cursor, Gemini, OpenCode, Ollama, OpenRouter } from '@/components/logos'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { useTasks } from '@/components/app-layout'
import { useAtomValue } from 'jotai'
import { sessionAtom } from '@/lib/atoms/session'
import { ApiKeysDialog } from '@/components/api-keys-dialog'
import { SignIn } from '@/components/auth/sign-in'

interface TaskSidebarProps {
  tasks: Task[]
  width?: number
}

export function TaskSidebar({ tasks, width = 288 }: TaskSidebarProps) {
  const pathname = usePathname()
  const { refreshTasks, toggleSidebar } = useTasks()
  const session = useAtomValue(sessionAtom)
  const [searchQuery, setSearchQuery] = useState('')
  const [showApiKeysDialog, setShowApiKeysDialog] = useState(false)

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      toggleSidebar()
    }
  }

  const getAgentLogo = (agent: string | null) => {
    if (!agent) return null
    switch (agent.toLowerCase()) {
      case 'claude':
        return Claude
      case 'codex':
        return Codex
      case 'copilot':
        return Copilot
      case 'cursor':
        return Cursor
      case 'gemini':
        return Gemini
      case 'opencode':
        return OpenCode
      case 'ollama':
        return Ollama
      case 'openrouter':
        return OpenRouter
      default:
        return null
    }
  }

  // Filter tasks by search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks
    const q = searchQuery.toLowerCase()
    return tasks.filter(
      (t) =>
        t.prompt.toLowerCase().includes(q) ||
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.repoUrl && t.repoUrl.toLowerCase().includes(q)),
    )
  }, [tasks, searchQuery])

  // Group tasks by time (Today, Yesterday, Older)
  const groupedTasks = useMemo(() => {
    const today: Task[] = []
    const yesterday: Task[] = []
    const older: Task[] = []

    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const startOfYesterday = startOfToday - 86400000

    filteredTasks.forEach((t) => {
      const taskTime = new Date(t.createdAt).getTime()
      if (taskTime >= startOfToday) {
        today.push(t)
      } else if (taskTime >= startOfYesterday) {
        yesterday.push(t)
      } else {
        older.push(t)
      }
    })

    return { today, yesterday, older }
  }, [filteredTasks])

  const handleDeleteTask = async (taskId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const resp = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('Task deleted')
        refreshTasks()
      }
    } catch {
      toast.error('Failed to delete task')
    }
  }

  const handleLogout = () => {
    window.location.href = '/api/auth/signout'
  }

  return (
    <div
      className="h-full border-r border-zinc-800/80 bg-zinc-950 px-2.5 pt-3 pb-3 flex flex-col justify-between select-none font-sans text-xs text-zinc-200"
      style={{ width: `${width}px` }}
    >
      <div className="space-y-3 overflow-hidden flex flex-col flex-1">
        {/* Top Header & Brand Logo */}
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/guidesoft-logo.png" alt="Logo" className="h-7 w-7 object-contain" />
            </Link>
            <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded">
              v2.0 AI Studio
            </span>
          </div>

          <Link href="/" onClick={handleLinkClick} className="block">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-9 justify-start px-3 gap-2 shadow-sm shadow-emerald-950/40">
              <Plus className="w-4 h-4" />
              <span>New AI Task & Chat</span>
            </Button>
          </Link>
        </div>

        {/* Dynamic AI Navigation Links (ChatGPT, Cursor & bolt.new Standard) */}
        <div className="space-y-0.5 px-1 py-1 border-y border-zinc-800/60 font-medium">
          {session?.user && ['paid_user', 'admin', 'super_admin'].includes(session.user.role) && (
            <Link
              href="/workflow"
              onClick={handleLinkClick}
              className={cn(
                'flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors hover:bg-zinc-900 text-zinc-300',
                pathname === '/workflow' && 'bg-zinc-900 text-emerald-400 font-semibold',
              )}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agentic Workflows</span>
              </div>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
            </Link>
          )}

          {session?.user && ['admin', 'super_admin'].includes(session.user.role) && (
            <>
              <Link
                href="/mcp-hub"
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors hover:bg-zinc-900 text-zinc-300',
                  pathname === '/mcp-hub' && 'bg-zinc-900 text-emerald-400 font-semibold',
                )}
              >
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Connectors &amp; MCP Hub</span>
                </div>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </Link>

              <Link
                href="/skills"
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors hover:bg-zinc-900 text-zinc-300',
                  pathname === '/skills' && 'bg-zinc-900 text-emerald-400 font-semibold',
                )}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Skills &amp; System Prompts</span>
                </div>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </Link>
            </>
          )}

          <Link
            href="/repos/new"
            onClick={handleLinkClick}
            className={cn(
              'flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors hover:bg-zinc-900 text-zinc-300',
              pathname?.startsWith('/repos') && 'bg-zinc-900 text-emerald-400 font-semibold',
            )}
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Projects &amp; Repos</span>
            </div>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
          </Link>
        </div>

        {/* Real-time Task Search Bar */}
        <div className="relative px-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search chats & tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/90 border border-zinc-800/80 rounded-md pl-8 pr-2 py-1.5 text-[11px] text-zinc-200 outline-none focus:border-emerald-500 placeholder-zinc-500"
          />
        </div>

        {/* Task History Feed */}
        <div className="flex-1 overflow-y-auto space-y-3 px-1 pr-1 font-mono text-[11px]">
          {filteredTasks.length === 0 ? (
            <div className="p-4 text-center text-zinc-500 text-[11px] font-sans">
              No tasks found. Start a new coding session!
            </div>
          ) : (
            <>
              {groupedTasks.today.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-wider px-1">
                    Today
                  </div>
                  {groupedTasks.today.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      pathname={pathname}
                      handleLinkClick={handleLinkClick}
                      handleDeleteTask={handleDeleteTask}
                      getAgentLogo={getAgentLogo}
                    />
                  ))}
                </div>
              )}

              {groupedTasks.yesterday.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-wider px-1 pt-1">
                    Yesterday
                  </div>
                  {groupedTasks.yesterday.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      pathname={pathname}
                      handleLinkClick={handleLinkClick}
                      handleDeleteTask={handleDeleteTask}
                      getAgentLogo={getAgentLogo}
                    />
                  ))}
                </div>
              )}

              {groupedTasks.older.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-wider px-1 pt-1">
                    Previous Sessions
                  </div>
                  {groupedTasks.older.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      pathname={pathname}
                      handleLinkClick={handleLinkClick}
                      handleDeleteTask={handleDeleteTask}
                      getAgentLogo={getAgentLogo}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer Profile, Settings, Upgrade Plan & Logout Dropdown */}
      <div className="pt-2 border-t border-zinc-800/80 px-1 font-sans">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-zinc-900 transition-colors text-left outline-none group">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src="/guidesoft-logo.png"
                  alt="Profile"
                  className="h-6 w-6 object-contain rounded-full border border-zinc-800"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-zinc-200 text-xs truncate">
                    {session?.user ? session.user.username || 'User Session' : 'GUIDESOFT.AI User'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Pro Sandbox
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform group-data-[state=open]:rotate-90" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-64 bg-zinc-950 border-zinc-800 text-zinc-200 shadow-2xl p-1.5 font-sans text-xs"
          >
            <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-400 px-2 py-1">
              Account &amp; Personalization
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => toast.info('You are on the Pro AI Plan')}
              className="flex items-center gap-2 px-2 py-1.5 text-emerald-400 font-semibold cursor-pointer hover:bg-emerald-950/40 rounded-md"
            >
              <Zap className="w-4 h-4" />
              <span>Upgrade Plan (Pro Active)</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setShowApiKeysDialog(true)}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-zinc-900 rounded-md"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              <span>Settings &amp; API Keys</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => toast.info('Personalization custom instructions enabled')}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-zinc-900 rounded-md"
            >
              <Sliders className="w-4 h-4 text-zinc-400" />
              <span>Personalization &amp; Prompts</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-zinc-800 my-1" />

            <DropdownMenuItem
              onClick={() => window.open('https://github.com', '_blank')}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-zinc-900 rounded-md"
            >
              <HelpCircle className="w-4 h-4 text-zinc-400" />
              <span>Help &amp; Documentation</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-zinc-800 my-1" />

            {session?.user ? (
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 py-1.5 text-red-400 hover:bg-red-950/30 cursor-pointer rounded-md"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => (window.location.href = '/auth/signin')}
                className="flex items-center gap-2 px-2 py-1.5 text-emerald-400 hover:bg-emerald-950/30 cursor-pointer rounded-md font-semibold"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Sign Up</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ApiKeysDialog open={showApiKeysDialog} onOpenChange={setShowApiKeysDialog} />
    </div>
  )
}

function TaskItem({
  task,
  pathname,
  handleLinkClick,
  handleDeleteTask,
  getAgentLogo,
}: {
  task: Task
  pathname: string
  handleLinkClick: () => void
  handleDeleteTask: (id: string, e: React.MouseEvent) => void
  getAgentLogo: (agent: string | null) => any
}) {
  const isActive = pathname === `/tasks/${task.id}`
  const AgentLogo = getAgentLogo(task.selectedAgent)

  return (
    <Link
      href={`/tasks/${task.id}`}
      onClick={handleLinkClick}
      className={cn(
        'group flex items-center justify-between p-2 rounded-md transition-all hover:bg-zinc-900 border border-transparent',
        isActive && 'bg-zinc-900 border-zinc-800/80 text-white font-medium',
      )}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {AgentLogo ? (
          <AgentLogo className="w-3.5 h-3.5 shrink-0" />
        ) : (
          <MessageSquare className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
        )}
        <span className="truncate text-zinc-300 group-hover:text-white font-sans text-xs">
          {task.title || task.prompt}
        </span>
      </div>

      <button
        onClick={(e) => handleDeleteTask(task.id, e)}
        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-opacity"
        title="Delete task"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </Link>
  )
}
