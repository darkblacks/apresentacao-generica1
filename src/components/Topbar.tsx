import { ChevronLeft, ChevronRight, Database, Download, Maximize2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { workbookDownloadUrl } from '../data/loadWorkbook'

interface Props {
  current: number
  total: number
  onPrevious: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

export default function Topbar({ current, total, onPrevious, onNext, onGoTo }: Props) {
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen()
    else await document.exitFullscreen()
  }

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <img src="/assets/valora-logo.png" alt="Valora Operações Financeiras" />
        <div><span>Jornada de transformação financeira</span><small>Dados fictícios • jan/2024 a jun/2026</small></div>
      </div>
      <nav className="topbar__navigation" aria-label="Navegação da apresentação">
        <button className="icon-button" onClick={onPrevious} disabled={current === 0} aria-label="Página anterior"><ChevronLeft size={18} /></button>
        <div className="topbar__dots">
          {Array.from({ length: total }, (_, index) => (
            <button key={index} className={`topbar__dot ${index === current ? 'is-active' : ''}`} onClick={() => onGoTo(index)} aria-label={`Ir para a página ${index + 1}`}>
              {index === current && <motion.span layoutId="active-dot" />}
            </button>
          ))}
        </div>
        <span className="topbar__counter">{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <button className="icon-button" onClick={onNext} disabled={current === total - 1} aria-label="Próxima página"><ChevronRight size={18} /></button>
      </nav>
      <div className="topbar__actions">
        <button className="icon-button topbar__fullscreen" onClick={toggleFullscreen} aria-label="Tela cheia"><Maximize2 size={17} /></button>
        <a className="download-button" href={workbookDownloadUrl} download>
          <span><Database size={16} /></span><div><small>Baixar base</small>Dados XLSX</div><Download size={16} />
        </a>
      </div>
    </header>
  )
}
