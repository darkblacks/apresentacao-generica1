import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, Building2, Landmark, ShieldCheck } from 'lucide-react'
import AnimatedNumber from '../components/AnimatedNumber'
import type { PresentationData } from '../types'
import { brl, compact, deltaPercent, percent } from '../utils'

interface Props { data: PresentationData }

export default function Slide01({ data }: Props) {
  const first = data.story[0]
  const lastPhase = data.story.at(-1) ?? first
  const last = data.monthly.at(-1)
  const clients = last?.clientes ?? lastPhase.clientes
  const transactions = last?.transacoes ?? lastPhase.transacoes
  const revenue = last?.receita ?? lastPhase.receita
  const reconciliation = last?.conciliacao ?? lastPhase.conciliacao
  const growth = deltaPercent(first?.transacoes ?? 1, transactions)

  return (
    <section className="slide slide--hero">
      <div className="hero-grid" />
      <div className="hero-curve hero-curve--one" />
      <div className="hero-curve hero-curve--two" />
      <div className="hero-copy">
        <motion.div className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <BarChart3 size={17} /> Storytelling executivo • 2024—2026
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .12 }}>
          Crescer era o objetivo.<br /><span>Controle virou o diferencial.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }}>
          A história de como a Valora transformou uma operação pressionada pelo volume em uma plataforma financeira previsível, automatizada e pronta para escalar.
        </motion.p>
        <motion.div className="hero-metrics" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .09, delayChildren: .35 } } }}>
          {[
            { icon: Building2, value: clients, label: 'clientes ativos', format: (v: number) => Math.round(v).toLocaleString('pt-BR') },
            { icon: Landmark, value: transactions, label: 'transações em jun/26', format: compact },
            { icon: ArrowUpRight, value: revenue, label: 'receita mensal', format: (v: number) => brl(v, true) },
            { icon: ShieldCheck, value: reconciliation, label: 'conciliação', format: (v: number) => percent(v) },
          ].map(({ icon: Icon, value, label, format }) => (
            <motion.article key={label} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>
              <span><Icon size={18} /></span><strong><AnimatedNumber value={value} formatter={format} /></strong><small>{label}</small>
            </motion.article>
          ))}
        </motion.div>
        <motion.div className="hero-thesis" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .72 }}>
          <span>+{percent(growth, 0)}</span>
          <div><strong>de volume processado</strong><small>sem ampliar o caos operacional na mesma proporção</small></div>
        </motion.div>
      </div>
      <motion.aside className="hero-visual" initial={{ opacity: 0, scale: .92, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .8, delay: .18 }}>
        <div className="hero-logo-card"><img src="/assets/valora-icon.png" alt="" /></div>
        <div className="hero-pulse hero-pulse--a"><span>Forecast</span><strong>96%</strong></div>
        <div className="hero-pulse hero-pulse--b"><span>Margem</span><strong>{percent((last?.margem ?? lastPhase.margem) * 100)}</strong></div>
        <div className="hero-pulse hero-pulse--c"><span>NPS</span><strong>{Math.round(last?.nps ?? lastPhase.nps)}</strong></div>
      </motion.aside>
    </section>
  )
}
