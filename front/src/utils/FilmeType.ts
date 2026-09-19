import type { AluguelType } from "./AluguelType"
import type { ComentarioType } from "./ComentarioType"
import type { CarrinhoType } from "./CarrinhoType"

export type FilmeType = {
    id: number
    titulo: string
    genero: string
    sinopse: string
    diretor: string
    ano: number
    duracao: number
    preco: number
    poster: string
    banner: string
    destaque: boolean
    avaliacoes: number[]
    elenco: string[]
    carrinhos: CarrinhoType[]
    alugueis: AluguelType[]
    comentarios: ComentarioType[]
}