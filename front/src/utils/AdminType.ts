import type { AluguelType } from "./AluguelType";
import type { FilmeType } from "./FilmeType"

export type AdminType = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  nivel: number;
  createdAt: Date;
  updatedAt: Date;
  filmes: FilmeType[];
  alugueis: AluguelType[];
  token: string
};