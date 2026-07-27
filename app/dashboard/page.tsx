import { StatsCard } from '@/components/dashboard/stats-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { RecentProjects } from '@/components/dashboard/recent-projects'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { TemplateGallery } from '@/components/templates/template-gallery'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import {
  FolderOpen,
  CheckSquare,
  Zap,
  Rocket,
  Plus,
  LayoutTemplate,
  BookOpen,
  TrendingUp,
} from 'lucide-react'
import { getServerSession } from '@/lib/session/get-server-session'

async function getTasks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/tasks`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.tasks || []
  } catch {
    return []
  }
}

export default async function DashboardPage() {
  const session = await getServerSession()
  const tasks = await getTasks()

  const totalProjects = tasks.length
  const activeTasks = tasks.filter((t: { status: string }) => t.status === 'processing').length
  const apiCallsThisMonth = 1247
  const deployments = tasks.filter((t: { status: string }) => t.status === 'completed').length

  const quickActions = [
    { label: 'New Project', icon: Plus, href: '/', color: 'text-blue-500' },
    { label: 'Browse Templates', icon: LayoutTemplate, href: '/marketplace', color: 'text-green-500' },
    { label: 'View Docs', icon: BookOpen, href: '/docs', color: 'text-purple-500' },
  ]

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}. Here&apos;s your overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          icon={FolderOpen}
          description="All your projects"
        />
        <StatsCard
          title="Active Tasks"
          value={activeTasks}
          icon={CheckSquare}
          description="Currently running"
          trend={
            activeTasks > 0
              ? { value: `${activeTasks} active`, label: 'tasks', positive: true }
              : { value: 'No', label: 'active tasks', positive: false }
          }
        />
        <StatsCard
          title="API Calls This Month"
          value={apiCallsThisMonth.toLocaleString()}
          icon={Zap}
          description="Across all providers"
        />
        <StatsCard
          title="Deployments"
          value={deployments}
          icon={Rocket}
          description="Successfully deployed"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
        <div>
          <RecentProjects tasks={tasks} />
        </div>
      </div>

      <Card>
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <Button variant="outline" className="gap-2">
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Browse Templates</h2>
        <TemplateGallery />
      </div>

      <ActivityFeed tasks={tasks} />
    </div>
  )
}