export type CreatePetRequestDTO = {
  nome: string
  especie: string
  raca: string
  nascimento: string
  sexo: string
  vermifugado: boolean
  vacinado: boolean
  tutor_ids: string[]
}
