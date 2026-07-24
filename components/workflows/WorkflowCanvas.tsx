'use client'

import { useCallback, useMemo } from 'react'
import { ReactFlow, MiniMap, Controls, Background, BackgroundVariant, Panel } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useWorkflowStore } from '@/lib/store/workflowStore'
import CustomNode from './CustomNode'
import { Button } from '@/components/ui/button'
import { Play, Save } from 'lucide-react'

export default function WorkflowCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useWorkflowStore()

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])

  const handleSave = () => {
    // TODO: Send to backend API
    console.log('Saved Workflow:', { nodes, edges })
  }

  const handleRun = () => {
    // TODO: Trigger Celery execution
    console.log('Running Workflow...')
  }

  return (
    <div className="w-full h-full min-h-[600px] border rounded-xl overflow-hidden bg-gray-50/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap zoomable pannable className="rounded-lg shadow-sm" />

        <Panel position="top-right" className="flex gap-2 p-2">
          <Button variant="outline" size="sm" onClick={handleSave} className="bg-white">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button size="sm" onClick={handleRun}>
            <Play className="w-4 h-4 mr-2" />
            Run Workflow
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}
