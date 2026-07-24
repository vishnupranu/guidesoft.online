import { create } from 'zustand'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react'

export type AppNode = Node

export type WorkflowState = {
  nodes: AppNode[]
  edges: Edge[]
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  setNodes: (nodes: AppNode[]) => void
  setEdges: (edges: Edge[]) => void
}

const initialNodes: AppNode[] = [
  {
    id: 'start',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { label: 'Web Search', icon: 'search' },
  },
  {
    id: 'coder',
    type: 'custom',
    position: { x: 250, y: 150 },
    data: { label: 'GUIDESOFT.ONLINE', icon: 'code' },
  },
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: 'start', target: 'coder', animated: true }]

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange<AppNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  setNodes: (nodes: AppNode[]) => {
    set({ nodes })
  },
  setEdges: (edges: Edge[]) => {
    set({ edges })
  },
}))
