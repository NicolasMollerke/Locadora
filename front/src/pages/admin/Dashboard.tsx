import { useEffect, useState } from "react"
import {
  VictoryPie,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryAxis
} from "victory"

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com"

type GeralDadosType = {
  clientes: number
  filmes: number
  alugueis: number
  faturamentoTotal: number | string
}

type GraficoGeneroType = {
  genero: string
  num: number
}

type GraficoStatusType = {
  status: string
  num: number
}

type AlugueisMensalType = {
  mesAno: string
  totais: number
  concluidas: number
}

const COR_PRIMARIA = "#E50914"
const COR_SUCESSO = "#4ADE80"
const COR_ALERTA = "#FBBF24"
const COR_TEXTO = "#D4D4D8"
const COR_LINHA = "rgba(255,255,255,0.12)"

const PALETA_GENEROS = [
  "#E50914", "#F97316", "#FBBF24", "#4ADE80",
  "#22D3EE", "#818CF8", "#C084FC", "#F472B6"
]

const COR_STATUS: Record<string, string> = {
  PENDENTE: COR_ALERTA,
  ATIVO: COR_PRIMARIA,
  CONCLUIDO: COR_SUCESSO
}

const ROTULO_STATUS: Record<string, string> = {
  PENDENTE: "Pendentes",
  ATIVO: "Ativos",
  CONCLUIDO: "Concluídos"
}

async function buscaJson<T>(rota: string): Promise<T> {
  const response = await fetch(`${apiUrl}/dashboard/${rota}`)
  if (!response.ok) throw new Error(`Falha ao carregar ${rota}`)
  return response.json()
}

export default function Dashboard() {
  const [dados, setDados] = useState<GeralDadosType | null>(null)
  const [filmesGenero, setFilmesGenero] = useState<GraficoGeneroType[]>([])
  const [alugueisStatus, setAlugueisStatus] = useState<GraficoStatusType[]>([])
  const [alugueisMes, setAlugueisMes] = useState<AlugueisMensalType[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregaTudo() {
      const [gerais, generos, status, meses] = await Promise.allSettled([
        buscaJson<GeralDadosType>("gerais"),
        buscaJson<GraficoGeneroType[]>("filmesGenero"),
        buscaJson<GraficoStatusType[]>("alugueisStatus"),
        buscaJson<AlugueisMensalType[]>("alugueisMes")
      ])

      const falhas: string[] = []

      if (gerais.status === "fulfilled") setDados(gerais.value)
      else falhas.push("números gerais")

      if (generos.status === "fulfilled" && Array.isArray(generos.value)) setFilmesGenero(generos.value)
      else falhas.push("filmes por gênero")

      if (status.status === "fulfilled" && Array.isArray(status.value)) setAlugueisStatus(status.value)
      else falhas.push("locações por status")

      if (meses.status === "fulfilled" && Array.isArray(meses.value)) setAlugueisMes(meses.value)
      else falhas.push("locações por mês")

      ;[gerais, generos, status, meses].forEach((r) => {
        if (r.status === "rejected") console.error("Erro no dashboard:", r.reason)
      })

      if (falhas.length > 0) {
        setErro(`Não foi possível carregar: ${falhas.join(", ")}. Veja o console (F12) para detalhes.`)
      }
      setCarregando(false)
    }
    carregaTudo()
  }, [])

  const dadosGenero = filmesGenero.map((item) => ({ x: item.genero, y: item.num }))
  const dadosStatus = alugueisStatus.map((item) => ({
    x: ROTULO_STATUS[item.status] ?? item.status,
    y: item.num
  }))
  const dadosTotais = alugueisMes.map((item) => ({ x: item.mesAno, y: item.totais }))
  const dadosConcluidas = alugueisMes.map((item) => ({ x: item.mesAno, y: item.concluidas }))

  const faturamento = Number(dados?.faturamentoTotal ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  const estiloEixo = {
    axis: { stroke: COR_LINHA },
    grid: { stroke: COR_LINHA, strokeDasharray: "2,4" },
    tickLabels: { fontSize: 10, padding: 4, fill: COR_TEXTO },
    ticks: { stroke: "transparent" }
  }

  const cards = [
    { rotulo: "Sócios cadastrados", valor: dados?.clientes, icone: "badge" },
    { rotulo: "Fitas no catálogo", valor: dados?.filmes, icone: "local_movies" },
    { rotulo: "Locações realizadas", valor: dados?.alugueis, icone: "receipt_long" },
    { rotulo: "Faturamento total", valor: dados ? faturamento : undefined, icone: "payments" }
  ]

  return (
    <main className="w-full pt-20 bg-surface min-h-screen">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8 md:py-12 gap-8 md:gap-12">
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-container/20 text-primary-fixed-dim font-caption text-caption tracking-wider uppercase font-semibold">
              <span className="material-symbols-outlined text-[14px]">monitoring</span>
              Terminal do Gerente
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-on-surface tracking-tight">
            Visão Geral da Locadora
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Acompanhe sócios, catálogo, locações e faturamento em um só lugar.
          </p>
        </section>

        {erro && (
          <div className="p-4 rounded-xl bg-surface-container text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container">error</span>
            <span className="font-body-md text-body-md">{erro}</span>
          </div>
        )}

        {carregando && !erro && (
          <div className="flex items-center gap-2.5 text-on-surface-variant font-caption text-caption">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
            Carregando dados do painel...
          </div>
        )}
        <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.rotulo}
              className="p-6 rounded-2xl bg-surface-container shadow-xl flex items-center gap-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-60"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-[26px]">{card.icone}</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                  {card.rotulo}
                </span>
                <span className="font-headline-md text-headline-md text-on-surface font-extrabold whitespace-nowrap">
                  {card.valor ?? "—"}
                </span>
              </div>
            </div>
          ))}
        </section>
        <section className="p-6 md:p-8 rounded-2xl bg-surface-container shadow-xl flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              Locações por mês
            </h2>
            <div className="flex items-center gap-5 font-caption text-caption text-on-surface-variant">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COR_PRIMARIA }}></span>
                Total de pedidos
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COR_SUCESSO }}></span>
                Concluídos
              </span>
            </div>
          </div>

          {dadosTotais.length === 0 && !carregando ? (
            <p className="font-body-md text-body-md text-on-surface-variant py-8 text-center">
              Ainda não há locações registradas nos últimos meses.
            </p>
          ) : (
            <div className="w-full max-w-4xl mx-auto">
              <VictoryChart
                domainPadding={{ x: 30, y: 10 }}
                width={600}
                height={260}
                padding={{ top: 20, bottom: 40, left: 45, right: 25 }}
              >
                <VictoryAxis style={estiloEixo} />
                <VictoryAxis dependentAxis tickFormat={(t) => (Number.isInteger(t) ? t : "")} style={estiloEixo} />
                <VictoryGroup offset={16} style={{ data: { width: 14 } }}>
                  <VictoryBar
                    data={dadosTotais}
                    labels={({ datum }) => datum.y}
                    style={{ data: { fill: COR_PRIMARIA }, labels: { fontSize: 10, padding: 3, fill: COR_TEXTO } }}
                  />
                  <VictoryBar
                    data={dadosConcluidas}
                    labels={({ datum }) => datum.y}
                    style={{ data: { fill: COR_SUCESSO }, labels: { fontSize: 10, padding: 3, fill: COR_TEXTO } }}
                  />
                </VictoryGroup>
              </VictoryChart>
            </div>
          )}
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <GraficoRosca
            titulo="Filmes por gênero"
            centro={["Catálogo", "por Gênero"]}
            dados={dadosGenero}
            cores={PALETA_GENEROS}
            vazio={!carregando && dadosGenero.length === 0}
          />
          <GraficoRosca
            titulo="Locações por status"
            centro={["Locações", "por Status"]}
            dados={dadosStatus}
            cores={alugueisStatus.map((s) => COR_STATUS[s.status] ?? COR_TEXTO)}
            vazio={!carregando && dadosStatus.length === 0}
          />
        </section>
      </div>
    </main>
  )
}

type GraficoRoscaProps = {
  titulo: string
  centro: string[]
  dados: { x: string; y: number }[]
  cores: string[]
  vazio: boolean
}

function GraficoRosca({ titulo, centro, dados, cores, vazio }: GraficoRoscaProps) {
  const total = dados.reduce((acc, item) => acc + item.y, 0)

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-surface-container shadow-xl flex flex-col gap-4">
      <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">{titulo}</h2>

      {vazio ? (
        <p className="font-body-md text-body-md text-on-surface-variant py-8 text-center">
          Sem dados para exibir.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <svg viewBox="0 0 400 400" className="w-full max-w-[260px] shrink-0">
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              padding={20}
              data={dados}
              innerRadius={100}
              padAngle={2}
              colorScale={cores}
              labels={({ datum }) => datum.y}
              labelRadius={140}
              style={{
                labels: { fontSize: 14, fill: "#fff", fontWeight: "bold", fontFamily: "inherit" }
              }}
            />
            <VictoryLabel
              textAnchor="middle"
              x={200}
              y={200}
              text={centro}
              style={{ fontSize: 16, fill: COR_TEXTO, fontWeight: "bold", fontFamily: "inherit" }}
            />
          </svg>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 w-full">
            {dados.map((item, i) => (
              <li
                key={item.x}
                className="flex items-center justify-between gap-3 font-body-md text-caption text-on-surface"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: cores[i % cores.length] }}
                  ></span>
                  {item.x}
                </span>
                <span className="text-on-surface-variant whitespace-nowrap">
                  {item.y} ({total ? Math.round((item.y / total) * 100) : 0}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
