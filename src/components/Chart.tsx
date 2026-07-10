import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

interface Props { option: EChartsOption; className?: string; height?: number | string }

export default function Chart({ option, className, height = '100%' }: Props) {
  return (
    <ReactECharts
      option={{
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        textStyle: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' },
        ...option,
      }}
      notMerge
      lazyUpdate
      className={className}
      style={{ width: '100%', height }}
    />
  )
}
