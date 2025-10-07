// src/pages/Tutors/types.ts

export type Pet = {
  id: string;
  nome: string; // Mude de 'name' para 'nome'
};

// O tipo Tutor continua o mesmo
export type Tutor = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  pets?: Pet[];
};