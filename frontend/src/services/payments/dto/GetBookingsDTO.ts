export type GetBookingsDTO = {
  pago: boolean
  id: string
  pet: {
    nome: string
  }
  tutor: {
    name: string
  }
  data_entrada: string
  data_saida: string
}
