export interface Pet {
  id: number;
  nome: string;
}

export interface Tutor {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  pet_id: string | null;

}