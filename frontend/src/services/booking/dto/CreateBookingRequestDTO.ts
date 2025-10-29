export type CreateBookingRequestDTO = {
  pet_id: string
  tutor_id: string
  data_entrada: string
  data_saida: string
  valor_diaria: number
  observacoes: string
  pago: boolean
}
