import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot, CheckCircle2, Clock, Rocket, AlertCircle } from 'lucide-react'
import type { Task } from '@/lib/db/schema'

interface ActivityFeedProps {
  tasks: Task[]
}

function getActivityIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case 'processing':
      return <Clock className="h-4 w-4 text-blue-500" />
    case 'stopped':
      return <Clock className="h-4 w-4 text-muted-foreground" />
    default:
      return <Bot className="h-4 w-4 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Completed</Badge>
    case 'error':
      return <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Failed</Badge>
    case 'processing':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Running</Badge>
    case 'stopped':
      return <Badge variant="secondary">Stopped</Badge>
    default:
      return <Badge variant="secondary">Pending</Badge>
  }
}

export function ActivityFeed({ tasks }: ActivityFeedProps) {
  const recentActivity = tasks.slice(0, 8)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentActivity.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((task) => (
              <div key={task.id} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {getActivityIcon(task.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {task.title || task.prompt.slice(0, 50)}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {getStatusBadge(task.status)}
                    <span className="text-xs text-muted-foreground">
                      {task.completedAt
                        ? new Date(task.completedAt).toLocaleString()
                        : new Date(task.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}