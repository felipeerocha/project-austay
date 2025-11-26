export type GetBookingsDTO = {
  pago: boolean
  id: string
  valor_diaria: number
  valor_total: number | null
  pet: {
    nome: string
  }
  tutor: {
    name: string
  }
  data_entrada: string
  data_saida: string
}
