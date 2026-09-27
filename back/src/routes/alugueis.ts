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

export default router