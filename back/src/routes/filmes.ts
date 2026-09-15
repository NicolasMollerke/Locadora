import { prisma } from "../../lib/prisma"
import { buscarDadosComGemini } from '../../services/iaServices'

import { Router } from 'express'
import { z } from 'zod'

const router = Router()

const filmeSchema = z.object({
  titulo: z.string().min(2, { message: "Título deve possuir, no mínimo, 2 caracteres" }).max(30, { message: "Título deve ter no máximo 30 caracteres" }),
  diretor: z.string().min(2, { message: "Diretor deve possuir, no mínimo, 2 caracteres" }).max(30, { message: "Diretor deve ter no máximo 30 caracteres" }),
  ano: z.number().int().min(1888, { message: "Ano inválido" }),
  preco: z.number().positive({ message: "O preço deve ser maior que zero" }),
  poster: z.string().url({ message: "URL do pôster inválida" }),
  banner: z.string().url({ message: "URL do banner inválida" }),
  destaque: z.boolean().default(false),
})

router.get("/", async (req, res) => {
  try {
    const filmes = await prisma.filme.findMany()
    res.status(200).json(filmes)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const filme = await prisma.filme.findFirst({
      where: { id: Number(id)},
    })
    res.status(200).json(filme)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = filmeSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { titulo, diretor, ano, preco, poster, banner, destaque } = valida.data

  try {
    const filme = await prisma.filme.create({
      data: {
        titulo,
        diretor,
        ano,
        preco,
        poster,
        banner,
        destaque
      }
    })

    let dadosIA = null
    try {
      dadosIA = await buscarDadosComGemini(titulo, diretor, ano);
      console.log(dadosIA)

    } catch (erroIA: any) {
      console.log('Falha ao consultar o Gemini:', erroIA.message);
    }

    const filmeFinal = dadosIA
      ? await prisma.filme.update({
          where: { id: filme.id },
          data: {
            genero: dadosIA.genero,
            sinopse: dadosIA.sinopse,
            duracao: dadosIA.duracao,
            elenco: dadosIA.elenco,
            avaliacoes: dadosIA.avaliacoes,
          },
        })
      : filme;

    res.status(201).json(filmeFinal)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const filme = await prisma.filme.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(filme)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = filmeSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { titulo, diretor, ano, preco, poster } = valida.data

  try {
    const filme = await prisma.filme.update({
      where: { id: Number(id) },
      data: {
        titulo, diretor, ano, preco, poster
      }
    })
    res.status(200).json(filme)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  const termoNumero = Number(termo)

  if (isNaN(termoNumero)) {
    try {
      const filmes = await prisma.filme.findMany({
        where: {
          OR: [
            { titulo: { contains: termo, mode: 'insensitive' } },
            { genero: { contains: termo, mode: 'insensitive' } }
          ]
        }
      })
      res.status(200).json(filmes)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  } else {
    if (termoNumero <= 3000) {
      try {
        const filmes = await prisma.filme.findMany({
          where: { ano: termoNumero }
        })
        res.status(200).json(filmes)
      } catch (error) {
        res.status(500).json({ erro: error })
      }  
    } else {
      try {
        const filmes = await prisma.filme.findMany({
          where: { preco: { lte: termoNumero } }
        })
        res.status(200).json(filmes)
      } catch (error) {
        res.status(500).json({ erro: error })
      }
    }
  }
})

export default router
