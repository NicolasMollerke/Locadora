import type { ClienteType } from "./ClienteType"
import type { FilmeType } from "./FilmeType"

export type ComentarioType = {
    id: number
    clienteId: number
    cliente: ClienteType
    filmeId: number
    filme: FilmeType
}