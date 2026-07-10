import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'

interface Props {
  label: string
  value: number
  formatter?: (value: number) => string
  note?: string
  trend?: string
  icon: LucideIcon
  tone?: 'green' | 'gold' | 'light' | 'danger' | 'success'
  delay?: number
}

export default function MetricCard({ label, value, formatter, note, trend, icon: Icon, tone = 'light', delay = 0 }: Props) {
  return (
    <motion.article
      className={`metric-card metric-card--${tone}`}
      initial={{ opacity: 0, y: 22, scale: .98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: .5, delay, ease: 'easeOut' }}
    >
      <div className="metric-card__top">
        <span className="metric-card__icon"><Icon size={18} /></span>
        {trend && <span className="metric-card__trend">{trend}</span>}
      </div>
      <strong className="metric-card__value"><AnimatedNumber value={value} formatter={formatter} /></strong>
      <span className="metric-card__label">{label}</span>
      {note && <p>{note}</p>}
    </motion.article>
  )
}
