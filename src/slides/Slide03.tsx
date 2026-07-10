import { AlertTriangle, BanknoteArrowDown, CalendarClock, EyeOff, Gauge } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import Chart from '../components/Chart'
import MetricCard from '../components/MetricCard'
import SlideShell from '../components/SlideShell'
import type { PresentationData } from '../types'
import { brl, monthLabel, percent, points } from '../utils'

interface Props { data: PresentationData }

export default function Slide03({ data }: Props) {
  const monthly = data.monthly.slice(6, 17)
  const crisis = data.story[2] ?? data.story[1]
  const peakOverdue = data.collections.reduce((sum, row) => sum + row.pico2025, 0)

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: '#b8c8c2' } },
    grid: { left: 50, right: 50, top: 30, bottom: 46 },
    xAxis: { type: 'category', data: monthly.map((item) => monthLabel(item.mes)), axisLine: { lineStyle: { color: 'rgba(255,255,255,.18)' } }, axisLabel: { color: '#9eb2aa', fontSize: 10 } },
    yAxis: [
      { type: 'value', min: 60, max: 100, axisLabel: { formatter: '{value}%', color: '#9eb2aa' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.07)' } } },
      { type: 'value', min: 25, max: 70, axisLabel: { formatter: '{value}d', color: '#9eb2aa' }, splitLine: { show: false } },
    ],
    series: [
      { name: 'Acurácia do forecast', type: 'line', smooth: true, data: monthly.map((item) => Number(item.forecast.toFixed(1))), lineStyle: { width: 4, color: '#52C79A' }, itemStyle: { color: '#52C79A' }, areaStyle: { color: 'rgba(82,199,154,.12)' } },
      { name: 'DSO', type: 'line', yAxisIndex: 1, smooth: true, data: monthly.map((item) => Number(item.dso.toFixed(1))), lineStyle: { width: 4, color: '#D7AD54' }, itemStyle: { color: '#D7AD54' } },
    ],
  }

  return (
    <SlideShell page="03" eyebrow="O ponto de ruptura" title={<>Sem visibilidade, toda decisão <span className="accent-gold">fica mais cara.</span></>} subtitle="No pico da crise, o caixa perdeu previsibilidade, o prazo de recebimento aumentou e o fechamento deixou de ser uma ferramenta de gestão." theme="dark">
      <div className="crisis-layout">
        <aside className="crisis-score">
          <span><AlertTriangle size={16} /> Pico de valores vencidos</span>
          <strong>{brl(peakOverdue, true)}</strong>
          <small>somatório das carteiras simuladas</small>
          <div className="crisis-divider" />
          <p>O problema não era falta de crescimento. Era crescer sem conseguir distinguir resultado, risco e necessidade de caixa.</p>
        </aside>
        <div className="chart-card chart-card--dark">
          <div className="chart-heading"><div><span className="section-label">jul/24 a mai/25</span><h3>Forecast cai enquanto o DSO dispara</h3></div><span className="insight-chip insight-chip--dark"><EyeOff size={14} /> baixa previsibilidade</span></div>
          <Chart option={option} />
        </div>
      </div>
      <div className="metric-grid metric-grid--four metric-grid--dark">
        <MetricCard icon={CalendarClock} label="fechamentos em D+5" value={crisis.fechamentoD5} formatter={percent} trend="−19 p.p." tone="danger" delay={.12} />
        <MetricCard icon={BanknoteArrowDown} label="inadimplência" value={crisis.inadimplencia} formatter={percent} trend="2,2× maior" tone="danger" delay={.2} />
        <MetricCard icon={Gauge} label="DSO médio" value={crisis.dso} formatter={(v) => `${points(v)} dias`} trend="+23 dias" tone="gold" delay={.28} />
        <MetricCard icon={EyeOff} label="acurácia do forecast" value={crisis.forecast} formatter={percent} trend="mínima do ciclo" tone="green" delay={.36} />
      </div>
      <div className="crisis-conclusion"><span>A pergunta mudou</span><strong>Como crescer sem ampliar o risco financeiro na mesma velocidade?</strong></div>
    </SlideShell>
  )
}
