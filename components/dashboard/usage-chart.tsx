import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UsageData {
  day: string
  value: number
}

interface UsageChartProps {
  data?: UsageData[]
  title?: string
  maxValue?: number
}

const DEFAULT_DATA: UsageData[] = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 72 },
  { day: 'Wed', value: 38 },
  { day: 'Thu', value: 89 },
  { day: 'Fri', value: 63 },
  { day: 'Sat', value: 28 },
  { day: 'Sun', value: 51 },
]

export function UsageChart({ data = DEFAULT_DATA, title = 'API Calls (Last 7 Days)', maxValue = 100 }: UsageChartProps) {
  const bars = data.map((item) => ({
    ...item,
    heightPercentage: Math.max((item.value / maxValue) * 100, 4),
  }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-40">
          {bars.map((bar) => (
            <div key={bar.day} className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full rounded-t-md bg-primary transition-all duration-300"
                style={{ height: `${bar.heightPercentage}%`, minHeight: '4px' }}
              />
              <span className="text-xs text-muted-foreground">{bar.day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0</span>
          <span>{maxValue}</span>
        </div>
      </CardContent>
    </Card>
  )
}