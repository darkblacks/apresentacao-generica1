import * as XLSX from 'xlsx'
import type { ClientRow, CollectionRow, GenericRow, Goal, Initiative, MonthlyRow, PresentationData, StoryPhase } from '../types'

export const workbookDownloadUrl = '/data/base_ficticia_valora_storytelling.xlsx'

const numberValue = (value: unknown, fallback = 0) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const stringValue = (value: unknown, fallback = '') => value === null || value === undefined ? fallback : String(value)

const excelDate = (value: unknown): Date => {
  if (value instanceof Date) return value
  if (typeof value === 'number') {
    const parsed = XLSX.SSF.parse_date_code(value)
    if (parsed) return new Date(parsed.y, parsed.m - 1, parsed.d)
  }
  const date = new Date(String(value))
  return Number.isNaN(date.getTime()) ? new Date(2024, 0, 1) : date
}

const rows = (workbook: XLSX.WorkBook, name: string): GenericRow[] => {
  const sheet = workbook.Sheets[name]
  if (!sheet) throw new Error(`Planilha não encontrada: ${name}`)
  return XLSX.utils.sheet_to_json<GenericRow>(sheet, { defval: null, raw: true })
}

export async function loadPresentationData(): Promise<PresentationData> {
  const response = await fetch(workbookDownloadUrl)
  if (!response.ok) throw new Error('Não foi possível carregar a base XLSX.')
  const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array', cellDates: false })

  const story: StoryPhase[] = rows(workbook, 'Storyline_KPIs').map((row) => ({
    fase: stringValue(row.Fase),
    inicio: excelDate(row.Início),
    fim: excelDate(row.Fim),
    clientes: numberValue(row.Clientes_Ativos_Médios),
    transacoes: numberValue(row.Transações_Médias_Mês),
    receita: numberValue(row.Receita_Média_Mês),
    margem: numberValue(row['Margem_Bruta_%']),
    fechamentoD5: numberValue(row['Fechamentos_D5_%']),
    conciliacao: numberValue(row['Conciliação_%']),
    inadimplencia: numberValue(row['Inadimplência_%']),
    dso: numberValue(row.DSO_Dias),
    forecast: numberValue(row['Acurácia_Forecast_%']),
    horasManuais: numberValue(row.Horas_Manuais_Mês),
    erros: numberValue(row.Erros_por_1000),
    automacao: numberValue(row['Automação_%']),
    nps: numberValue(row.NPS),
    novosClientes: numberValue(row.Novos_Clientes),
    clientesPerdidos: numberValue(row.Clientes_Perdidos),
  }))

  const monthly: MonthlyRow[] = rows(workbook, 'Resumo_Mensal').map((row) => ({
    mes: excelDate(row.Mês),
    fase: stringValue(row.Fase),
    clientes: numberValue(row.Clientes_Ativos),
    transacoes: numberValue(row.Transações_Processadas),
    receita: numberValue(row.Receita),
    custoOperacional: numberValue(row.Custo_Operacional),
    lucroBruto: numberValue(row.Lucro_Bruto),
    margem: numberValue(row['Margem_Bruta_%']),
    fechamentoD5: numberValue(row['Fechamentos_D5_%']),
    diasFechamento: numberValue(row.Dias_para_Fechar),
    conciliacao: numberValue(row['Conciliação_%']),
    inadimplencia: numberValue(row['Inadimplência_%']),
    dso: numberValue(row.DSO_Dias),
    forecast: numberValue(row['Acurácia_Forecast_%']),
    horasManuais: numberValue(row.Horas_Manuais),
    erros: numberValue(row.Erros_por_1000),
    automacao: numberValue(row['Automação_%']),
    nps: numberValue(row.NPS),
    valoresRecuperados: numberValue(row.Valores_Recuperados),
    chamados: numberValue(row.Chamados_Operacionais),
    novosClientes: numberValue(row.Novos_Clientes),
    clientesPerdidos: numberValue(row.Clientes_Perdidos),
  }))

  const initiatives: Initiative[] = rows(workbook, 'Iniciativas').map((row) => ({
    id: stringValue(row.ID_Iniciativa),
    dataInicio: excelDate(row.Data_Início),
    area: stringValue(row.Área),
    iniciativa: stringValue(row.Iniciativa),
    objetivo: stringValue(row.Objetivo),
    investimento: numberValue(row.Investimento),
    status: stringValue(row.Status),
    conclusao: numberValue(row['Conclusão_%']),
    kpi: stringValue(row.KPI_Principal),
    impacto: numberValue(row.Impacto_Estimado),
    unidade: stringValue(row.Unidade),
    payback: numberValue(row.Payback_Meses),
    prioridade: stringValue(row.Prioridade),
  }))

  const goals: Goal[] = rows(workbook, 'Metas_vs_Resultado').map((row) => ({
    kpi: stringValue(row.KPI),
    categoria: stringValue(row.Categoria),
    meta: numberValue(row.Meta_Jun_2026),
    resultado: numberValue(row.Resultado_Jun_2026),
    unidade: stringValue(row.Unidade),
    pilar: stringValue(row.Pilar),
    desvio: numberValue(row.Desvio_Absoluto),
    atingimento: numberValue(row['Atingimento_%']),
    status: stringValue(row.Status_Meta),
  }))

  const clients: ClientRow[] = rows(workbook, 'Clientes').map((row) => ({
    id: stringValue(row.ID_Cliente),
    cliente: stringValue(row.Cliente),
    segmento: stringValue(row.Segmento),
    cidade: stringValue(row.Cidade),
    plano: stringValue(row.Plano),
    mensalidade: numberValue(row.Mensalidade),
    transacoes: numberValue(row.Transações_Mês),
    risco: stringValue(row.Risco),
    nps2024: numberValue(row.NPS_2024),
    nps2026: numberValue(row.NPS_Jun_2026),
    variacaoNps: numberValue(row.Variação_NPS),
    status: stringValue(row.Status),
    participacao: numberValue(row['Participação_Receita_%']),
  }))

  const collections: CollectionRow[] = rows(workbook, 'Cobrancas').map((row) => ({
    id: stringValue(row.ID_Cliente),
    cliente: stringValue(row.Cliente),
    segmento: stringValue(row.Segmento),
    risco: stringValue(row.Risco),
    vencido2024: numberValue(row.Vencido_2024),
    pico2025: numberValue(row.Pico_Vencido_2025),
    vencido2026: numberValue(row.Vencido_Jun_2026),
    recuperado: numberValue(row.Valor_Recuperado),
    promessas: numberValue(row.Promessas_Pagamento),
    cumpridas: numberValue(row.Promessas_Cumpridas),
    taxaCumprimento: numberValue(row['Taxa_Cumprimento_%']),
    estrategia: stringValue(row.Estratégia_Principal),
    status: stringValue(row.Status_Cliente),
  }))

  return { story, monthly, initiatives, goals, clients, collections }
}
