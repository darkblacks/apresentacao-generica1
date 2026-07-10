import type { PresentationData } from '../types'

const phase = (fase: string, index: number, values: number[]) => ({
  fase,
  inicio: new Date(2024 + Math.floor(index / 2), index === 0 ? 0 : index * 5 % 12, 1),
  fim: new Date(2024 + Math.floor(index / 2), index === 4 ? 5 : (index * 5 + 5) % 12, 1),
  clientes: values[0], transacoes: values[1], receita: values[2], margem: values[3],
  fechamentoD5: values[4], conciliacao: values[5], inadimplencia: values[6], dso: values[7],
  forecast: values[8], horasManuais: values[9], erros: values[10], automacao: values[11],
  nps: values[12], novosClientes: values[13], clientesPerdidos: values[14],
})

export const fallbackData: PresentationData = {
  story: [
    phase('Base controlada', 0, [15, 17000, 90000, .35, 91, 97, 7, 36, 87, 820, 6, 26, 60, 14, 5]),
    phase('Crescimento sem escala', 1, [19, 24000, 125000, .30, 83, 91, 10, 46, 77, 1210, 10, 31, 51, 18, 8]),
    phase('Pico do descontrole', 2, [22, 31000, 158000, .24, 72, 83, 15, 59, 63, 1640, 14, 36, 42, 8, 6]),
    phase('Operação Clareza', 3, [25, 38000, 190000, .34, 88, 94, 10, 44, 82, 1110, 8, 62, 57, 24, 4]),
    phase('Escala inteligente', 4, [30, 48000, 230000, .43, 97, 99, 5.5, 31, 96, 600, 3, 89, 77, 21, 2]),
  ],
  monthly: [],
  initiatives: [],
  goals: [],
  clients: [],
  collections: [],
}
