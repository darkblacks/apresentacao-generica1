import { Clock3, FileWarning, Layers3, TrendingUp } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import Chart from '../components/Chart'
import MetricCard from '../components/MetricCard'
import SlideShell from '../components/SlideShell'
import type { PresentationData } from '../types'
import { compact, deltaPercent, monthLabel, percent, points } from '../utils'

interface Props { data: PresentationData }

export default function Slide02({ data }: Props) {
  const monthly = data.monthly.slice(0, 16)
  const start = data.story[0]
  const crisis = data.story[2] ?? data.story.at(-1) ?? start
  const volumeGrowth = deltaPercent(start.transacoes, crisis.transacoes)
  const hoursGrowth = deltaPercent(start.horasManuais, crisis.horasManuais)

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: '#60736c' } },
    grid: { left: 54, right: 58, top: 28, bottom: 48 },
    xAxis: { type: 'category', data: monthly.map((item) => monthLabel(item.mes)), axisTick: { show: false }, axisLine: { lineStyle: { color: '#d7dfda' } }, axisLabel: { fontSize: 10, color: '#6c7d77' } },
    yAxis: [
      { type: 'value', name: 'Transações', axisLabel: { formatter: (v: number) => compact(v), color: '#6c7d77' }, splitLine: { lineStyle: { color: '#edf1ee' } } },
      { type: 'value', name: 'Horas', axisLabel: { color: '#6c7d77' }, splitLine: { show: false } },
    ],
    series: [
      { name: 'Transações', type: 'bar', data: monthly.map((item) => item.transacoes), itemStyle: { color: '#123C35', borderRadius: [6, 6, 0, 0] }, barMaxWidth: 22 },
      { name: 'Horas manuais', type: 'line', yAxisIndex: 1, smooth: true, symbolSize: 6, data: monthly.map((item) => item.horasManuais), lineStyle: { width: 4, color: '#D7AD54' }, itemStyle: { color: '#D7AD54' } },
    ],
  }

  return (
    <SlideShell page="02" eyebrow="O crescimento" title={<>O volume acelerou. <span className="accent">A estrutura não.</span></>} subtitle="Entre 2024 e o início de 2025, novas carteiras entraram mais rápido do que os processos, integrações e rituais de controle conseguiam acompanhar.">
      <div className="growth-layout">
        <div className="chart-card chart-card--large">
          <div className="chart-heading"><div><span className="section-label">jan/24 a abr/25</span><h3>Volume e esforço manual cresceram juntos</h3></div><span className="insight-chip">o custo oculto da expansão</span></div>
          <Chart option={option} />
        </div>
        <aside className="story-panel">
          <span className="section-label">Leitura executiva</span>
          <h3>A operação passou a trabalhar mais para enxergar menos.</h3>
          <div className="story-steps">
            <article><span>01</span><div><strong>Mais clientes</strong><small>carteiras maiores e mais complexas</small></div></article>
            <article><span>02</span><div><strong>Mais lançamentos</strong><small>sem integração bancária suficiente</small></div></article>
            <article><span>03</span><div><strong>Mais retrabalho</strong><small>fechamentos e cobranças perdiam velocidade</small></div></article>
          </div>
          <div className="story-equation"><strong>+{percent(volumeGrowth, 0)}</strong><span>volume</span><b>+</b><strong>+{percent(hoursGrowth, 0)}</strong><span>horas manuais</span></div>
        </aside>
      </div>
      <div className="metric-grid metric-grid--four">
        <MetricCard icon={Layers3} label="transações médias" value={crisis.transacoes} formatter={compact} trend={`+${percent(volumeGrowth, 0)}`} tone="green" delay={.14} />
        <MetricCard icon={Clock3} label="horas manuais/mês" value={crisis.horasManuais} formatter={(v) => `${Math.round(v).toLocaleString('pt-BR')} h`} trend={`+${percent(hoursGrowth, 0)}`} tone="gold" delay={.22} />
        <MetricCard icon={FileWarning} label="erros por mil" value={crisis.erros} formatter={(v) => points(v)} trend={`+${points(crisis.erros - start.erros)}`} tone="danger" delay={.3} />
        <MetricCard icon={TrendingUp} label="receita média" value={crisis.receita} formatter={(v) => `R$ ${compact(v)}`} trend="crescimento preservado" tone="light" delay={.38} />
      </div>
    </SlideShell>
  )
}
