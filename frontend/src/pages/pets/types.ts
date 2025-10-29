export type Pet = {
  id: string
  nome: string
  especie: string
  raca: string
  nascimento: string
  sexo: 'macho' | 'femea'
  vermifugado: boolean
  vacinado: boolean
  tutors: Array<{
    id: string
    name: string
  }>
}
