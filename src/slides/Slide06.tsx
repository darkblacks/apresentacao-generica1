import type React from 'react'
import { ArrowRight, Check, Download, Radar, Sparkles, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import SlideShell from '../components/SlideShell'
import { workbookDownloadUrl } from '../data/loadWorkbook'
import type { PresentationData } from '../types'
import { brl, compact, percent, points } from '../utils'

interface Props { data: PresentationData }

export default function Slide06({ data }: Props) {
  const goals = data.goals
  const achieved = goals.filter((goal) => goal.status === 'Atingida')
  const pending = goals.filter((goal) => goal.status !== 'Atingida')
  const last = data.monthly.at(-1)
  const phase = data.story.at(-1)
  const highlighted = goals.filter((goal) => ['Receita mensal recorrente', 'Margem bruta', 'Fechamentos em D+5', 'Taxa de conciliação', 'NPS'].includes(goal.kpi))

  const displayResult = (goal: (typeof goals)[number]) => {
    if (goal.unidade === 'R$') return brl(goal.resultado, true)
    if (goal.unidade === '%') return percent(goal.resultado < 2 ? goal.resultado * 100 : goal.resultado)
    if (goal.unidade === 'dias') return `${points(goal.resultado)} dias`
    if (goal.unidade === 'horas') return `${Math.round(goal.resultado)} h`
    if (goal.unidade === 'transações') return compact(goal.resultado)
    return `${points(goal.resultado, 0)}${goal.unidade === 'pontos' ? ' pts' : ''}`
  }

  const score = goals.length ? achieved.length / goals.length : 0

  return (
    <SlideShell page="06" eyebrow="A nova escala" title={<>A Valora aprendeu a crescer <span className="accent-gold">com clareza.</span></>} subtitle="Em junho de 2026, a operação encerra o ciclo com previsibilidade, margem e experiência superiores — pronta para transformar dados em vantagem competitiva." theme="dark" className="final-slide">
      <div className="final-layout">
        <div className="final-scorecard">
          <div className="goal-score">
            <div className="goal-score__ring" style={{ '--score': `${score * 360}deg` } as React.CSSProperties}><span><strong>{achieved.length}</strong><small>de {goals.length}</small></span></div>
            <div><span className="section-label">Metas executivas</span><h3>{Math.round(score * 100)}% atingidas</h3><p>O próximo ciclo deixa de ser recuperação operacional e passa a ser inteligência financeira preditiva.</p></div>
          </div>
          <div className="goal-bars">
            {highlighted.map((goal, index) => (
              <motion.article key={goal.kpi} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .16 + index * .07 }}>
                <div><span>{goal.kpi}</span><strong>{displayResult(goal)}</strong></div>
                <div className="goal-bars__track"><span style={{ width: `${Math.min(goal.atingimento * 100, 100)}%` }} /></div>
                <small>{percent(goal.atingimento * 100)} da meta <Check size={12} /></small>
              </motion.article>
            ))}
          </div>
        </div>
        <aside className="next-cycle">
          <span className="section-label">Próximo ciclo</span>
          <h3>Da clareza para a antecipação.</h3>
          <div className="next-cycle__issues">
            {pending.slice(0, 2).map((goal) => <article key={goal.kpi}><Target size={20} /><div><strong>{goal.kpi}</strong><small>{displayResult(goal)} • oportunidade remanescente</small></div></article>)}
          </div>
          <div className="next-cycle__priorities">
            <article><span>01</span><div><strong>Score financeiro preditivo</strong><small>agir antes que o atraso aconteça.</small></div></article>
            <article><span>02</span><div><strong>Benchmark por segmento</strong><small>transformar contexto em recomendação.</small></div></article>
            <article><span>03</span><div><strong>Copiloto de decisões</strong><small>levar insight financeiro para a rotina do gestor.</small></div></article>
          </div>
        </aside>
      </div>
      <div className="final-banner">
        <div><img src="/assets/valora-icon.png" alt="" /><span>Junho de 2026</span><strong>{Math.round(last?.clientes ?? phase?.clientes ?? 0)} clientes • {compact(last?.transacoes ?? phase?.transacoes ?? 0)} transações • {brl(last?.receita ?? phase?.receita ?? 0, true)} de receita • {percent((last?.margem ?? phase?.margem ?? 0) * 100)} de margem</strong></div>
        <a href={workbookDownloadUrl} download><Download size={17} /> Baixar base completa <ArrowRight size={17} /></a>
      </div>
      <div className="final-spark"><Sparkles size={15} /><span>Clareza para decidir. Controle para crescer.</span><Radar size={15} /></div>
    </SlideShell>
  )
}
