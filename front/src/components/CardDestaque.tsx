import { toast } from "sonner"
import { useClienteStore } from "../context/ClienteContext"
import type { FilmeType } from "../utils/FilmeType"

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export function CardDestaque({data}: {data: FilmeType}) {
  const { cliente } = useClienteStore()
  
  async function adicionaCarrinho() {
      if (!cliente?.id) {
        toast.error("Você precisa estar logado para adicionar itens ao carrinho!");
        return;
      }
      
      const response = await fetch(`${apiUrl}/carrinho/${cliente.id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          filmeId: Number(data.id),
        })
      })
  
      const dados = await response.json();
  
      if (response.ok) {
        toast.success("Item adicionado no seu carrinho")
      } else {
        toast.error(dados.erro || dados.error || "Erro... Não foi possível adicionar o item ao carrinho");
      }
    }
  
  return (
        <>
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-bottom bg-no-repeat scanlines transform scale-105"
              style={{ backgroundImage: `url(${data.banner})` }}
            ></div>
          </div>
          <div className="relative z-20 max-w-3xl flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-surface-container/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm font-caption text-caption text-secondary uppercase tracking-widest flex items-center gap-1">
                R$ {Number(data.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">{data.genero} • {data.ano} • {data.duracao}min</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary drop-shadow-2xl">{data.titulo}</h1>
            <p className="font-body-lg text-body-lg text-on-surface/90 max-w-2xl text-balance">
              {data.sinopse}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {cliente.id ? (
									<button onClick={adicionaCarrinho} className="bg-primary-container hover:bg-primary text-on-primary-container px-8 py-4 rounded-lg font-headline-md text-headline-md flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
										<span className="material-symbols-outlined">play_arrow</span>
										Alugar Fita
									</button>
								) : (
									<button className="bg-primary-container hover:bg-primary text-on-primary-container px-8 py-4 rounded-lg font-headline-md text-headline-md flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
										<span className="material-symbols-outlined">play_arrow</span>
										Faça login para adicionar o filme ao seu carrinho
									</button>
								)}
            </div>
          </div>
          </>
    )
}

