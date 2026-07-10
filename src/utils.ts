export const brl = (value: number, compact = false) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)

export const compact = (value: number) =>
  new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value)

export const percent = (value: number, digits = 1) => `${value.toFixed(digits).replace('.', ',')}%`
export const points = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')
export const monthLabel = (date: Date) => new Intl.DateTimeFormat('pt-BR', { month: 'short', year: '2-digit' }).format(date).replace('.', '')
export const deltaPercent = (from: number, to: number) => from === 0 ? 0 : ((to - from) / from) * 100
