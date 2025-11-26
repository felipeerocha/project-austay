export interface Booking {
  id: string
  pet_name: string
  tutor_name: string
  data_entrada: string
  data_saida: string
  hora_inicio?: string
  hora_final?: string | null
  valor_diaria?: number
  valor_total?: number
  observacoes?: string | null
  pago?: boolean
  pet_avatar?: string
}