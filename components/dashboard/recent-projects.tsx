import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FolderOpen, Clock, ArrowUpRight } from 'lucide-react'
import type { Task } from '@/lib/db/schema'

interface RecentProjectsProps {
  tasks: Task[]
}

export function RecentProjects({ tasks }: RecentProjectsProps) {
  const recentTasks = tasks.slice(0, 5)

  if (recentTasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Recent Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent projects yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          Recent Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {task.title || task.prompt.slice(0, 40)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleDateString()
                      : new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link href={`/tasks/${task.id}`}>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}