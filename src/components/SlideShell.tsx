import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  page: string
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  theme?: 'light' | 'dark' | 'mint'
  className?: string
}

export default function SlideShell({ page, eyebrow, title, subtitle, children, theme = 'light', className = '' }: Props) {
  return (
    <section className={`slide slide--${theme} ${className}`}>
      <div className="slide__orb slide__orb--one" />
      <div className="slide__orb slide__orb--two" />
      <header className="slide__header">
        <motion.div className="slide__eyebrow" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}>
          <span>{page}</span>{eyebrow}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}>
          {title}
        </motion.h1>
        {subtitle && <motion.p className="slide__subtitle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}>{subtitle}</motion.p>}
      </header>
      <div className="slide__content">{children}</div>
    </section>
  )
}
