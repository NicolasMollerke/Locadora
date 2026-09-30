import { toast } from "sonner";
import type { AluguelType } from "../utils/AluguelType"

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export function CardAluguel({data}: {data: AluguelType}) {  
    const filmes = data.filmes.length - 1
    const dataInicialFormatada = new Date(data.dataInicial).toLocaleDateString('pt-BR');
    const dataFinalFormatada = new Date(data.dataDevolucao).toLocaleDateString('pt-BR');
    const filmesTotais = data.filmes.length
  
    async function realizarDevolucao() { 
        const response = await fetch(`${apiUrl}/alugueis/${data.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                status: "CONCLUIDO"
            })
        })

        const dados = await response.json();

        if (response.ok) {
            toast.success("Devolução realizada com sucesso!")
        } else {
            toast.error(dados.erro || dados.error || "Erro... Não foi possível realizar a devolução");
        }
    }
    
    return (
    <>
          <div className="rounded-xl bg-surface-container-low p-5 sm:p-6 flex flex-col gap-5 border border-primary-container/30 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1">
                <div className="relative shrink-0 flex items-center">
                  <div className="w-14 h-20 rounded overflow-hidden bg-surface-container-highest shadow-md relative z-10">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Vintage 1980s sci-fi movie poster for Blade Runner"
                      src={data.filmes[0].poster}
                    />
                  </div>
                    {filmes > 0 ? (
                    <div className="w-12 h-16 rounded overflow-hidden bg-surface-container-high border border-surface-container-highest shadow-sm -ml-4 flex flex-col items-center justify-center text-primary-fixed-dim">
                        <span className="material-symbols-outlined text-[18px]">
                        video_library
                        </span>
                        <span className="font-caption text-[11px] font-bold tracking-tight">
                        +{filmes}
                        </span>
                    </div>
                    ) : null }
                </div>

                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface tracking-wide flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">
                        receipt_long
                      </span>
                      #LOC-1994-1022
                    </span>

                    <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary-container text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        schedule
                      </span>
                      Em Andamento • Devolver Hoje
                    </span>
                  </div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold truncate">
                    {data.filmes[0].titulo}
                    {filmesTotais > 1 ? (
                        <div>
                        {data.filmes.map((filme) => (
                            <span className="text-on-surface-variant font-normal" key={filme.id}>
                            {filme.titulo}
                            </span>
                        ))}
                        </div>
                    ) : null }
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-caption font-caption text-on-surface-variant">
                    <span className="">
                      Retirada: <strong className="text-on-surface">{dataInicialFormatada}</strong>
                    </span>
                    <span className="">•</span>
                    <span className="">
                      Prazo: <strong className="text-primary-fixed-dim">{dataFinalFormatada}</strong>
                    </span>
                    <span className="">•</span>
                    <span className="">
                      Total: <strong className="text-on-surface text-[14px] font-bold">R$ {Number(data.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-surface-container-high">
                <button
                  className="px-3.5 py-2 rounded-lg bg-primary-container text-on-primary-container hover:brightness-110 font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5"
                  type="button"
                  onClick={realizarDevolucao}
                >
                  Realizar Devolução
                </button>
                <span
                  className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary font-label-md text-label-md transition-colors flex items-center gap-1">
                  {data.status}
                </span>
              </div>
            </div>
          </div>
          </>
    )
}

