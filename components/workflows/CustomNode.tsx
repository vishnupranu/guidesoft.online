import { Handle, Position } from '@xyflow/react'
import { Search, Code, FileText, Settings, Terminal, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

type CustomNodeProps = {
  data: {
    label: string
    icon?: string
  }
  isConnectable: boolean
}

export default function CustomNode({ data, isConnectable }: CustomNodeProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'search':
        return <Search className="w-5 h-5 text-blue-500" />
      case 'code':
        return <Code className="w-5 h-5 text-green-500" />
      case 'terminal':
        return <Terminal className="w-5 h-5 text-orange-500" />
      case 'github':
        return <Github className="w-5 h-5 text-purple-500" />
      default:
        return <Settings className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="relative flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />

      <div className="flex-shrink-0 bg-gray-50 p-2 rounded-lg">{getIcon(data.icon)}</div>

      <div>
        <div className="text-sm font-semibold text-gray-900">{data.label}</div>
        <div className="text-xs text-gray-500">Agent Node</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  )
}
