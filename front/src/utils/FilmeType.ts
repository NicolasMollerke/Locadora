import type { ListaFilmeType } from "./ListaFilmeType"
import type { AluguelType } from "./AluguelType"
import type { ComentarioType } from "./ComentarioType"

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
    avaliacoes: number[]
    elenco: string[]
    listas: ListaFilmeType[]
    alugueis: AluguelType[]
    comentarios: ComentarioType[]
}