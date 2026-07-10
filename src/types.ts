export type GenericRow = Record<string, string | number | boolean | null | undefined>

export interface StoryPhase {
  fase: string
  inicio: Date
  fim: Date
  clientes: number
  transacoes: number
  receita: number
  margem: number
  fechamentoD5: number
  conciliacao: number
  inadimplencia: number
  dso: number
  forecast: number
  horasManuais: number
  erros: number
  automacao: number
  nps: number
  novosClientes: number
  clientesPerdidos: number
}

export interface MonthlyRow {
  mes: Date
  fase: string
  clientes: number
  transacoes: number
  receita: number
  custoOperacional: number
  lucroBruto: number
  margem: number
  fechamentoD5: number
  diasFechamento: number
  conciliacao: number
  inadimplencia: number
  dso: number
  forecast: number
  horasManuais: number
  erros: number
  automacao: number
  nps: number
  valoresRecuperados: number
  chamados: number
  novosClientes: number
  clientesPerdidos: number
}

export interface Initiative {
  id: string
  dataInicio: Date
  area: string
  iniciativa: string
  objetivo: string
  investimento: number
  status: string
  conclusao: number
  kpi: string
  impacto: number
  unidade: string
  payback: number
  prioridade: string
}

export interface Goal {
  kpi: string
  categoria: string
  meta: number
  resultado: number
  unidade: string
  pilar: string
  desvio: number
  atingimento: number
  status: string
}

export interface ClientRow {
  id: string
  cliente: string
  segmento: string
  cidade: string
  plano: string
  mensalidade: number
  transacoes: number
  risco: string
  nps2024: number
  nps2026: number
  variacaoNps: number
  status: string
  participacao: number
}

export interface CollectionRow {
  id: string
  cliente: string
  segmento: string
  risco: string
  vencido2024: number
  pico2025: number
  vencido2026: number
  recuperado: number
  promessas: number
  cumpridas: number
  taxaCumprimento: number
  estrategia: string
  status: string
}

export interface PresentationData {
  story: StoryPhase[]
  monthly: MonthlyRow[]
  initiatives: Initiative[]
  goals: Goal[]
  clients: ClientRow[]
  collections: CollectionRow[]
}
