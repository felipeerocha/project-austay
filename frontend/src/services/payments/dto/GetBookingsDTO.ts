export type GetBookingsDTO = {
  pago: boolean
  id: string
  pet: {
    nome: string
  }
  tutor: {
    name: string
  }
}
