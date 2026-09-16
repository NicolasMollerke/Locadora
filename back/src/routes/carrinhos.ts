import { prisma } from "../../lib/prisma"
import { Router } from 'express'
import { z } from 'zod'


const router = Router()


const carrinhoSchema = z.object({
  clienteid: z.number(),
  filmeid: z.number()
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


router.post("/", async (req, res) => {


  const valida = carrinhoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }


  const { clienteid, filmeid } = valida.data


  try {
    const novoCarrinho = await prisma.carrinho.create({
      data: {
        clienteId: clienteid,
        filmes: {
          connect: { id: filmeid }
        }
      },
      include: {
        filmes: true
      }
    });


    return res.status(201).json(novoCarrinho);


  } catch (error) {
    console.error(error);
    return res.status(400).json({ erro: "Não foi possível processar a requisição." });
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


router.put("/:id", async (req, res) => {
  const { id } = req.params


  const valida = carrinhoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }


  const { clienteid, filmeid } = valida.data


  try {
    const filme = await prisma.filme.update({
      where: { id: Number(id) },
      data: {
        clienteid, filmeid
      }
    })
    res.status(200).json(filme)
  } catch (error) {
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
