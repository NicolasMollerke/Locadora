import type { AluguelType } from "./AluguelType"
import type { ComentarioType } from "./ComentarioType"
import type { CarrinhoType } from "./CarrinhoType"

export type ClienteType = {
    id: number
    nome: string
    email: string
    senha: string
    alugueis: AluguelType[]
    comentarios: ComentarioType[]
    carrinho: CarrinhoType
}