import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <main className="loading-screen">
      <motion.img src="/assets/valora-logo.png" alt="Valora Operações Financeiras" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} />
      <div className="loading-screen__track"><motion.span animate={{ x: ['-100%', '310%'] }} transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }} /></div>
      <p>Organizando os dados para decidir melhor...</p>
    </main>
  )
}
