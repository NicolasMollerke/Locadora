import { Router } from "express"
import { prisma } from "../../lib/prisma"

const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const filmes = await prisma.filme.count()
    const alugueis = await prisma.aluguel.count()

    const faturamentoResult = await prisma.aluguel.aggregate({
      _sum: { valor: true }
    })

    const faturamentoTotal = faturamentoResult._sum.valor || 0

    res.status(200).json({ clientes, filmes, alugueis, faturamentoTotal })
  } catch (error) {
    res.status(400).json(error)
  }
})

type FilmeGroupByGenero = {
  genero: string | null
  _count: {
    genero: number
  }
}

router.get("/filmesGenero", async (req, res) => {
  try {
    const filmes = await prisma.filme.groupBy({
      by: ['genero'],
      _count: {
        genero: true,
      },
    })

    const filmesFormatado = filmes
      .filter((item: FilmeGroupByGenero) => item.genero !== null && item._count.genero > 0)
      .map((item: FilmeGroupByGenero) => ({
        genero: item.genero,
        num: item._count.genero
      }))

    res.status(200).json(filmesFormatado)
  } catch (error) {
    res.status(400).json(error)
  }
})

type AluguelGroupByStatus = {
  status: string
  _count: {
    status: number
  }
}

router.get("/alugueisStatus", async (req, res) => {
  try {
    const alugueis = await prisma.aluguel.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    })

    const alugueisFormatado = alugueis.map((aluguel: AluguelGroupByStatus) => ({
      status: aluguel.status,
      num: aluguel._count.status
    }))

    res.status(200).json(alugueisFormatado)
  } catch (error) {
    res.status(400).json(error)
  }
})

interface EstatisticaMensal {
  mesAno: string;
  totais: number;
  concluidas: number;
}

interface LinhaRaw {
  mes: Date;
  totais: number | bigint;
  concluidas: number | bigint;
}

router.get("/alugueisMes", async (req, res) => {
  try {
    const resultado = await prisma.$queryRaw<LinhaRaw[]>`
      SELECT
        meses.mes AS mes,
        COUNT(a.id) AS totais,
        COUNT(a.id) FILTER (WHERE a.status = 'CONCLUIDO') AS concluidas
      FROM generate_series(
        date_trunc('month', now()) - interval '7 months',
        date_trunc('month', now()),
        interval '1 month'
      ) AS meses(mes)
      LEFT JOIN aluguel a
        ON date_trunc('month', a."dataInicial") = meses.mes
      GROUP BY meses.mes
      ORDER BY meses.mes ASC;
    `;

    const dados: EstatisticaMensal[] = resultado.map((linha) => ({
      // CORRIGIDO: antes estava com "\(" e "\)", o que gerava texto literal
      mesAno: `${String(linha.mes.getUTCMonth() + 1).padStart(2, '0')}/${linha.mes.getUTCFullYear()}`,
      totais: Number(linha.totais),
      concluidas: Number(linha.concluidas),
    }));

    return res.status(200).json(dados);
  } catch (error) {
    console.error('Erro ao buscar aluguéis por mês:', error);
    return res.status(500).json({ error: 'Erro ao gerar relatório de aluguéis.' });
  }
})

export default router
