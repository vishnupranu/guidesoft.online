import WorkflowCanvas from '@/components/workflows/WorkflowCanvas'

export const metadata = {
  title: 'Workflow Builder | GUIDESOFT.ONLINE',
  description: 'Design multi-agent workflows using a visual node editor.',
}

export default function BuilderPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6 gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Builder</h1>
          <p className="text-muted-foreground mt-2">
            Drag and drop agents, tools, and logic nodes to create complex automated workflows.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-background rounded-xl shadow-sm border border-border/40">
        <WorkflowCanvas />
      </div>
    </div>
  )
}
