import { prisma } from "../../lib/prisma"
import { Router } from 'express'
import { z } from 'zod'


const router = Router()


const carrinhoSchema = z.object({
  clienteId: z.number().optional(),
  filmeId: z.number()
})


router.get("/", async (req, res) => {
  try {
    const carrinhos = await prisma.carrinho.findMany({
      include: {
        cliente: true,
        filmes: true
      },
      orderBy: { id: 'desc'}
    })
    res.status(200).json(carrinhos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params


  try {
    const carrinho = await prisma.carrinho.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(carrinho)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})


router.put("/:clienteid", async (req, res) => {
  const { clienteid } = req.params


  const valida = carrinhoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }


  const { filmeId } = valida.data


  try {
    const carrinhoExistente = await prisma.carrinho.findUnique({
      where: { clienteId: Number(clienteid) },
      include: {
        filmes: {
          where: { id: Number(filmeId) }
        }
      }
    })

    if (carrinhoExistente && carrinhoExistente.filmes.length > 0) {
      res.status(400).json({ erro: "Este filme já está no seu carrinho!" })
      return
    }
    
    const carrinho = await prisma.carrinho.update({
      where: { clienteId: Number(clienteid) },
      data: {
        filmes: {
          connect: { id: Number(filmeId) }
        }
      },
      include: {
        filmes: true
      }
    })
    res.status(200).json(carrinho)
  } catch (error) {
    console.error("ERRO AO ADICIONAR FILME NO CARRINHO:");
    res.status(400).json({ error })
  }
})


router.get("/:clienteId", async (req, res) => {
  const { clienteId } = req.params
  try {
    const carrinho = await prisma.carrinho.findUnique({
      where: { clienteId: Number(clienteId) },
      include: {
        filmes: true
    }
      }
    )
    res.status(200).json(carrinho)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
