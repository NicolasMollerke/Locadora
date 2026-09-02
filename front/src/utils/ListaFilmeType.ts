import type { ClienteType } from "./ClienteType"
import type { FilmeType } from "./FilmeType"

export type ListaFilmeType = {
    id: number
    clienteId: number
    cliente: ClienteType
    filmes: FilmeType[]
}