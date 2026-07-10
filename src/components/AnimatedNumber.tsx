import { animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  value: number
  formatter?: (value: number) => string
  duration?: number
  className?: string
}

export default function AnimatedNumber({
  value,
  formatter = (number) => Math.round(number).toLocaleString('pt-BR'),
  duration = 1.15,
  className,
}: Props) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, { duration, ease: 'easeOut', onUpdate: setDisplay })
    return () => controls.stop()
  }, [duration, value])
  return <motion.span className={className}>{formatter(display)}</motion.span>
}
