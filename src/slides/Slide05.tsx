import { BadgeCheck, BrainCircuit, HandCoins, SmilePlus } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import Chart from '../components/Chart'
import MetricCard from '../components/MetricCard'
import SlideShell from '../components/SlideShell'
import type { PresentationData } from '../types'
import { brl, monthLabel, percent, points } from '../utils'

interface Props { data: PresentationData }

export default function Slide05({ data }: Props) {
  const monthly = data.monthly.slice(12)
  const crisis = data.story[2]
  const finalPhase = data.story.at(-1) ?? crisis
  const topRecovered = [...data.collections].sort((a, b) => b.recuperado - a.recuperado).slice(0, 5)

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: '#60736c' } },
    grid: { left: 50, right: 52, top: 28, bottom: 48 },
    xAxis: { type: 'category', data: monthly.map((item) => monthLabel(item.mes)), axisLine: { lineStyle: { color: '#d7dfda' } }, axisLabel: { color: '#6c7d77', fontSize: 10 } },
    yAxis: [
      { type: 'value', min: 60, max: 100, axisLabel: { formatter: '{value}%', color: '#6c7d77' }, splitLine: { lineStyle: { color: '#edf1ee' } } },
      { type: 'value', min: 0, max: 18, axisLabel: { formatter: '{value}%', color: '#6c7d77' }, splitLine: { show: false } },
    ],
    series: [
      { name: 'Conciliação', type: 'line', smooth: true, symbolSize: 6, data: monthly.map((item) => item.conciliacao), lineStyle: { width: 4, color: '#123C35' }, itemStyle: { color: '#123C35' }, areaStyle: { color: 'rgba(18,60,53,.11)' } },
      { name: 'Forecast', type: 'line', smooth: true, symbolSize: 6, data: monthly.map((item) => item.forecast), lineStyle: { width: 3, color: '#52C79A' }, itemStyle: { color: '#52C79A' } },
      { name: 'Inadimplência', type: 'line', yAxisIndex: 1, smooth: true, symbolSize: 5, data: monthly.map((item) => item.inadimplencia), lineStyle: { width: 3, color: '#D7AD54' }, itemStyle: { color: '#D7AD54' } },
    ],
  }

  return (
    <SlideShell page="05" eyebrow="A recuperação" title={<>A visibilidade voltou. <span className="accent">E o caixa respondeu.</span></>} subtitle="A partir do segundo semestre de 2025, a operação passou a fechar mais rápido, conciliar melhor e cobrar com inteligência — sem interromper o crescimento.">
      <div className="recovery-layout">
        <div className="chart-card chart-card--recovery">
          <div className="chart-heading"><div><span className="section-label">jan/25 a jun/26</span><h3>Controle sobe enquanto a inadimplência cai</h3></div><span className="insight-chip insight-chip--success">recuperação sustentada</span></div>
          <Chart option={option} />
        </div>
        <aside className="recovery-ranking">
          <span className="section-label">Maiores recuperações de carteira</span>
          <h3>A melhoria chegou ao cliente.</h3>
          <div>
            {topRecovered.map((row, index) => (
              <article key={row.id}><span>0{index + 1}</span><div><strong>{row.cliente}</strong><small>{row.segmento} • risco {row.risco.toLowerCase()}</small></div><b>{brl(row.recuperado, true)}</b></article>
            ))}
          </div>
        </aside>
      </div>
      <div className="metric-grid metric-grid--four">
        <MetricCard icon={BadgeCheck} label="conciliação" value={finalPhase.conciliacao} formatter={percent} trend={`+${points(finalPhase.conciliacao - crisis.conciliacao)} p.p.`} tone="success" delay={.14} />
        <MetricCard icon={BrainCircuit} label="acurácia do forecast" value={finalPhase.forecast} formatter={percent} trend={`+${points(finalPhase.forecast - crisis.forecast)} p.p.`} tone="green" delay={.22} />
        <MetricCard icon={HandCoins} label="inadimplência" value={finalPhase.inadimplencia} formatter={percent} trend={`−${points(crisis.inadimplencia - finalPhase.inadimplencia)} p.p.`} tone="gold" delay={.3} />
        <MetricCard icon={SmilePlus} label="NPS" value={finalPhase.nps} formatter={(v) => points(v, 0)} trend={`+${points(finalPhase.nps - crisis.nps)} pts`} tone="light" delay={.38} />
      </div>
    </SlideShell>
  )
}
