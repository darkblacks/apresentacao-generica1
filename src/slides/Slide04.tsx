import { Bot, DatabaseZap, Landmark, RefreshCcw, Route, UsersRound } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import Chart from '../components/Chart'
import SlideShell from '../components/SlideShell'
import type { PresentationData } from '../types'
import { brl, percent } from '../utils'

interface Props { data: PresentationData }

const iconByArea = (area: string) => {
  if (area.includes('Tecnologia')) return DatabaseZap
  if (area.includes('Cobrança')) return Landmark
  if (area.includes('Automação')) return Bot
  if (area.includes('Pessoas')) return UsersRound
  if (area.includes('Dados')) return Route
  return RefreshCcw
}

export default function Slide04({ data }: Props) {
  const initiatives = data.initiatives.slice(0, 7)
  const investmentByArea = Object.entries(data.initiatives.reduce<Record<string, number>>((acc, item) => {
    acc[item.area] = (acc[item.area] ?? 0) + item.investimento
    return acc
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const totalInvestment = data.initiatives.reduce((sum, item) => sum + item.investimento, 0)
  const avgPayback = data.initiatives.length ? data.initiatives.reduce((sum, item) => sum + item.payback, 0) / data.initiatives.length : 0

  const option: EChartsOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
    legend: { bottom: 0, textStyle: { color: '#60736c', fontSize: 10 } },
    series: [{
      type: 'pie', radius: ['46%', '70%'], center: ['50%', '44%'],
      label: { show: false },
      itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 8 },
      data: investmentByArea.map(([name, value]) => ({ name, value })),
      color: ['#123C35', '#52C79A', '#D7AD54', '#6E9185', '#DDEAE5'],
    }],
    graphic: [{ type: 'text', left: 'center', top: '37%', style: { text: brl(totalInvestment, true), fill: '#123C35', font: '700 24px Inter' } }, { type: 'text', left: 'center', top: '49%', style: { text: 'investimento', fill: '#7a8d85', font: '11px Inter' } }],
  }

  return (
    <SlideShell page="04" eyebrow="A virada" title={<>A Valora lançou a <span className="accent">Operação Clareza.</span></>} subtitle="A recuperação não veio de uma única ferramenta. Veio da combinação entre integração, automação, responsabilidade por carteira e rituais de decisão.">
      <div className="turnaround-layout">
        <div className="initiative-timeline">
          <div className="initiative-timeline__rail" />
          {initiatives.map((item) => {
            const Icon = iconByArea(item.area)
            return (
              <article className="initiative-item" key={item.id}>
                <span className="initiative-item__node"><Icon size={16} /></span>
                <div><small>{item.area}</small><strong>{item.iniciativa}</strong><p>{item.objetivo}</p></div>
                <span className="initiative-item__impact">{item.impacto > 0 ? '+' : ''}{item.impacto.toLocaleString('pt-BR')} {item.unidade}</span>
              </article>
            )
          })}
        </div>
        <aside className="turnaround-side">
          <div className="chart-card chart-card--investment"><div className="chart-heading"><div><span className="section-label">Portfólio de transformação</span><h3>Investimento por frente</h3></div></div><Chart option={option} /></div>
          <div className="turnaround-stats">
            <article><RefreshCcw size={18} /><div><strong>{data.initiatives.length}</strong><small>iniciativas</small></div></article>
            <article><DatabaseZap size={18} /><div><strong>{percent(data.story.at(-1)?.automacao ?? 0)}</strong><small>automação final</small></div></article>
            <article><Landmark size={18} /><div><strong>{avgPayback.toFixed(0)} meses</strong><small>payback médio</small></div></article>
          </div>
          <div className="turnaround-thesis"><span>Princípio da virada</span><strong>Automatizar o repetitivo, tornar o desvio visível e dar dono para cada decisão.</strong></div>
        </aside>
      </div>
    </SlideShell>
  )
}
