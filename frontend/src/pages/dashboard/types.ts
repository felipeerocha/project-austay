export interface CheckInOutSummary {
  date: string
  check_ins: number
  check_outs: number
}

export interface DashboardData {
  total_pets_hospedados: number
  taxa_ocupacao: number
  checkins_checkouts_hoje: CheckInOutSummary
  checkins_checkouts_proximos_dias: CheckInOutSummary[]
  capacidade_maxima: number
}

export interface PetHospedado {
  estadia_id: string
  pet_id: string
  pet_nome: string
  tutor_nome: string
  data_entrada: string
  data_saida: string | null
  valor_diaria: number
  pago: boolean
}

export interface MoreDaysData {
  checkins_checkouts: CheckInOutSummary[]
}

export interface MovimentacaoDetalhe {
  estadia_id: string
  pet_nome: string
  tutor_nome: string
  hora: string | null
  valor_diaria: number
  pago: boolean
}

export interface MovimentacoesPorData {
  data: string
  check_ins: MovimentacaoDetalhe[]
  check_outs: MovimentacaoDetalhe[]
}

