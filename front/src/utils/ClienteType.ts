import type { ListaFilmeType } from "./ListaFilmeType"
import type { AluguelType } from "./AluguelType"
import type { ComentarioType } from "./ComentarioType"

export type ClienteType = {
    id: number
    nome: string
    email: string
    senha: string
    listaFilmes: ListaFilmeType | null
    alugueis: AluguelType[]
    comentario: ComentarioType[]
}