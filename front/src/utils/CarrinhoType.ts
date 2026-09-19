import type { ClienteType } from "./ClienteType"
import type { FilmeType } from "./FilmeType"

export type CarrinhoType = {
    cliente: ClienteType
    filmes: FilmeType[]
}