export interface Pet {
  id: string;
  nome: string;
}

export interface Tutor {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  pets: Pet[];
}