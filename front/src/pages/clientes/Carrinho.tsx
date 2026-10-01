import { useClienteStore } from "../../context/ClienteContext"
import { CardFilmeCarrinho } from "../../components/CardFilmeCarrinho"
import { toast } from "sonner"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function Carrinho() {
  const { cliente, logaCliente } = useClienteStore()

  const filmes = cliente?.carrinho?.filmes || []

  const listaFilmes = filmes.map((filme) => (
    <CardFilmeCarrinho data={filme} key={filme.id} />
  ))

  const dataAtual = new Date()
  const dataDevolucao = new Date(dataAtual)

  dataDevolucao.setDate(dataDevolucao.getDate() + 7)

  const valorTotal = filmes.reduce((acc, filme) => {
    return acc + Number(filme.preco)
  }, 0)

  const valorParcelado = filmes.reduce((acc, filme) => {
    return (acc + Number(filme.preco)) / 2
  }, 0)

  const filmesIds = filmes.map((filme) => filme.id)

  const quantidade = cliente.carrinho.filmes.length

  async function realizarAluguel() {
    const response = await fetch(`${apiUrl}/alugueis`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        valor: valorTotal,
        filmesIds: filmesIds,
        status: "PENDENTE"
      })
    })

    if (response.status == 201) {
      toast.success("Solicitação de aluguel gerada com sucesso")
      esvaziarCarrinho()
    } else {
      const responseData = await response.json()

      const mensagemErro =
        responseData.erro ||
        responseData.error ||
        "Erro desconhecido ao cadastrar o filme."

      toast.error(mensagemErro)
    }
  }

  async function esvaziarCarrinho() {
    const response = await fetch(`${apiUrl}/carrinho/${cliente.id}/limpar`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE",
    })

    if (response.status == 200) {
      toast.success("Carrinho esvaziado com sucesso!")

      logaCliente({
        ...cliente,
        carrinho: {
          ...cliente.carrinho,
          filmes: [] 
        }
      });
    } else {
      const responseData = await response.json()
      const mensagemErro =
        responseData.erro ||
        responseData.error
      toast.error(mensagemErro)
    }
  }

  return (
    <main className="w-full pt-20 bg-background">
      <div className="flex flex-col w-full">
        <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin-desktop pt-8 pb-6 bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-on-surface-variant font-caption text-caption mb-3"
              >
                <a
                  className="hover:text-primary transition-colors"
                  data-path="home"
                  href="#"
                >
                  Home
                </a>
                <span className="material-symbols-outlined text-[14px]">
                  chevron_right
                </span>
                <span className="text-on-surface font-semibold">
                  Cesta de Fitas
                </span>
              </nav>
              <div className="flex items-baseline gap-3">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase font-extrabold">
                  Cesta de{" "}
                  <span className="text-primary-container">Locação</span>
                </h1>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-caption text-caption uppercase tracking-wider">
                  {quantidade} filmes na cesta
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8 md:py-12 bg-background">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 text-on-surface-variant font-caption text-caption uppercase tracking-wider">
                <span className="col-span-6">Título &amp; Fita VHS</span>
                <span className="col-span-3 text-center">
                  Dias de Empréstimo
                </span>
                <span className="col-span-3 text-right">Valor</span>
              </div>
              {listaFilmes}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <a
                  className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors py-2"
                  data-path="filmes"
                  href="#"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    west
                  </span>
                  <Link to={`/`}>
                    <span>Continuar Explorando as Prateleiras</span>
                  </Link>
                </a>
                <button
                  className="text-outline hover:text-primary-container font-caption text-caption transition-colors flex items-center gap-1"
                  type="button"
                  onClick={esvaziarCarrinho}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    clear_all
                  </span>
                  <span>Esvaziar Cesta de Filmes</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container shadow-xl flex flex-col gap-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight uppercase font-bold">
                    Resumo do Pedido
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">
                      Total a Pagar
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="font-display-md-mobile text-display-md-mobile text-on-surface font-extrabold leading-none tracking-tight">
                        R${" "}
                        {Number(valorTotal).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant mt-1">
                        Ou 2x de R${" "}
                        {Number(valorParcelado).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}{" "}
                        sem juros
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3.5 rounded-xl bg-surface-container-low flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        calendar_today
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                        Prazo de Devolução
                      </span>

                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        {dataDevolucao.toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={realizarAluguel}
                  className="w-full h-14 rounded-xl bg-primary-container hover:bg-inverse-primary active:scale-[0.99] text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary-container/20 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    shopping_cart_checkout
                  </span>
                  <span>Confirmar Locação </span>
                </button>
                <div className="pt-4 border-t border-surface-container-highest flex flex-col gap-2">
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider text-center">
                    Formas de Pagamento Aceitas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 