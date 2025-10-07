export type Pet = {
  id: string;
  nome: string;
};

export type Tutor = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  pets?: Pet[];
};