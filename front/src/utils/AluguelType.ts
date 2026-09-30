import type { AdminType } from "./AdminType"
import type { ClienteType } from "./ClienteType"
import type { FilmeType } from "./FilmeType"

export type AluguelType = {
    filter(arg0: (aluguel: any) => boolean): unknown
    id: number
    clienteId: number
    cliente: ClienteType
    filmes: FilmeType[]
    valor: number
    dataInicial: Date
    dataDevolucao: Date
    admin: AdminType
    adminId: String
    status: String
}