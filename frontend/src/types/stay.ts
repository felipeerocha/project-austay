export interface StayPet {
  id: string
  nome: string
}

export interface StayTutor {
  id: string
  name: string
}

export interface Stay {
  id: string
  data_entrada: string
  data_saida: string | null
  hora_inicio: string
  hora_final: string | null
  valor_diaria: number
  valor_total: number
  observacoes: string | null
  pago: boolean
  pet: StayPet
  tutor: StayTutor
}

export interface UpdateStayPayload {
  data_saida?: string | null
  hora_final?: string | null
  valor_diaria?: number
  observacoes?: string | null
  pago?: boolean
}

