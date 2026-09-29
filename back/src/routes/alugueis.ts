import { prisma } from "../../lib/prisma"
import { Router } from "express"
import { z } from 'zod'

const router = Router()

export const aluguelSchema = z.object({
  clienteId: z.number({
  }).int().positive("ID do cliente inválido"),
  valor: z.coerce.number({
  }).nonnegative("O valor não pode ser negativo"),

  adminId: z.string().max(36, "Máximo de 36 caracteres").nullable().optional(),

  filmesIds: z.array(z.number().int().positive()).min(1, "Selecione pelo menos um filme para alugar")
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

  const { clienteId, valor, filmesIds } = valida.data

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
        }
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

export default router