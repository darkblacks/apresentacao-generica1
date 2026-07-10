import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Topbar from './components/Topbar'
import { fallbackData } from './data/fallback'
import { loadPresentationData } from './data/loadWorkbook'
import Slide01 from './slides/Slide01'
import Slide02 from './slides/Slide02'
import Slide03 from './slides/Slide03'
import Slide04 from './slides/Slide04'
import Slide05 from './slides/Slide05'
import Slide06 from './slides/Slide06'
import type { PresentationData } from './types'

export default function App() {
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState<PresentationData | null>(null)

  useEffect(() => {
    let active = true
    loadPresentationData()
      .then((result) => { if (active) setData(result) })
      .catch((error) => { console.error(error); if (active) setData(fallbackData) })
    return () => { active = false }
  }, [])

  const slides = useMemo(() => data ? [
    <Slide01 data={data} />,
    <Slide02 data={data} />,
    <Slide03 data={data} />,
    <Slide04 data={data} />,
    <Slide05 data={data} />,
    <Slide06 data={data} />,
  ] : [], [data])

  const next = useCallback(() => setCurrent((value) => Math.min(value + 1, slides.length - 1)), [slides.length])
  const previous = useCallback(() => setCurrent((value) => Math.max(value - 1, 0)), [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); next() }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); previous() }
      if (event.key === 'Home') setCurrent(0)
      if (event.key === 'End') setCurrent(Math.max(slides.length - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, previous, slides.length])

  if (!data) return <LoadingScreen />

  return (
    <main className="app-shell">
      <Topbar current={current} total={slides.length} onPrevious={previous} onNext={next} onGoTo={setCurrent} />
      <section className="presentation-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            className="slide-frame"
            initial={{ opacity: 0, x: 72, scale: .986 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -72, scale: .986 }}
            transition={{ duration: .46, ease: [0.22, 1, 0.36, 1] }}
          >
            {slides[current]}
          </motion.div>
        </AnimatePresence>
      </section>
      <div className="mobile-navigation"><button onClick={previous} disabled={current === 0}>Anterior</button><span>{current + 1} / {slides.length}</span><button onClick={next} disabled={current === slides.length - 1}>Próxima</button></div>
    </main>
  )
}
