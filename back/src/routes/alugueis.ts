import { prisma } from "../../lib/prisma"
import { Router } from "express"
import { z } from 'zod'
import { verificaToken } from "../middlewares/verificaToken";

const router = Router()
export enum StatusAluguel {
  ATIVO = "ATIVO",
  PENDENTE = "PENDENTE",
  CONCLUIDO = "CONCLUIDO",
}

export const aluguelSchema = z.object({
  clienteId: z.number({
  }).int().positive("ID do cliente inválido"),
  valor: z.coerce.number({
  }).nonnegative("O valor não pode ser negativo"),

  adminId: z.string().max(36, "Máximo de 36 caracteres").nullable().optional(),

  filmesIds: z.array(z.number().int().positive()).min(1, "Selecione pelo menos um filme para alugar"),
  status: z.nativeEnum(StatusAluguel),
});

router.get("/", async (req, res) => {
  try {
    const alugueis = await prisma.aluguel.findMany({
      include: {
        cliente: true,
        filmes: true
      },
      orderBy: { id: 'desc'}
    })
    res.status(200).json(alugueis)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const valida = aluguelSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { clienteId, valor, filmesIds, status } = valida.data

  const dataDevolucao = new Date()
  dataDevolucao.setDate(dataDevolucao.getDate() + 7)

  try {
    const aluguel = await prisma.aluguel.create({
      data: {
        clienteId: Number(clienteId),
        valor: valor,
        dataDevolucao: dataDevolucao,
        filmes: {
          connect: filmesIds.map((id: number) => ({ id: Number(id) }))
        },
        status: "PENDENTE"
      },
      include: {
        filmes: true,
        cliente: true
      }
    })

    res.status(201).json(aluguel)
  } catch (error) {
    res.status(400).json({ erro: "Erro ao registrar aluguel", detalhe: error })
  }
})

router.get("/:clienteId", async (req, res) => {
  const { clienteId } = req.params
  try {
    const alugueis = await prisma.aluguel.findMany({
      where: { clienteId: Number(clienteId) },
      include: {
        filmes: true
    }
      }
    )
    res.status(200).json(alugueis)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const updateSchema = aluguelSchema.pick({status: true})
  const valida = updateSchema.safeParse(req.body)

  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { status } = valida.data

  try {
    const aluguel = await prisma.aluguel.update({
      where: { id: Number(id) },
      data: {
        status
      }
    })
    res.status(200).json(aluguel)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put("/admin/:id", verificaToken, async (req, res) => {
  const { id } = req.params

  const updateSchema = aluguelSchema.pick({status: true})
  const valida = updateSchema.safeParse(req.body)

  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { status } = valida.data

  try {
    const aluguel = await prisma.aluguel.update({
      where: { id: Number(id) },
      data: {
        status
      }
    })
    res.status(200).json(aluguel)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router