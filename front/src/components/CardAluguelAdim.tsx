import { toast } from "sonner";
import type { AluguelType } from "../utils/AluguelType"
import { useAluguelStore } from "../context/AluguelContext";

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export function CardAluguelAdmin({data}: {data: AluguelType}) {  
    const { atualizarStatusAluguel } = useAluguelStore()    
    const dataInicialFormatada = new Date(data.dataInicial).toLocaleDateString('pt-BR');
    const dataFinalFormatada = new Date(data.dataDevolucao).toLocaleDateString('pt-BR');
    
    async function confirmarAluguel() { 
        const response = await fetch(`${apiUrl}/alugueis/${data.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                status: "ATIVO"
            })
        })

        const dados = await response.json();

        if (response.ok) {
            toast.success("Aluguel confirmado com sucesso!")
            atualizarStatusAluguel(data.id, "ATIVO");
        } else {
            const erroBackend = dados.erro || dados.error;
            
            const mensagemErro = typeof erroBackend === 'object' && erroBackend !== null 
                ? erroBackend.message || "Erro desconhecido retornado pelo servidor."
                : erroBackend;

            toast.error(mensagemErro || "Erro... Não foi possível confirmar o aluguel");
        }
    }

    return (
    <>
        <div className="bg-surface-container rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-surface-container-high hover:border-outline-variant transition-all hover:bg-surface-container-high/60 shadow-sm">
        <div className="flex items-center gap-3 min-w-[220px]">
            <span className="px-2.5 py-1 rounded bg-surface-container-highest text-secondary font-mono font-bold text-xs shrink-0">
            #{data.id}
            </span>

            <div>
            <span className="text-on-surface font-semibold block leading-tight text-[16px]">
                {data.cliente?.nome}
            </span>
            </div>
        </div>

        <div className="flex flex-col text-sm min-w-[200px]">
            <span className="text-on-surface-variant font-caption text-caption flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                calendar_today
            </span>
            Retirada:
            <strong className="text-on-surface font-medium ml-1">
                {dataInicialFormatada}
            </strong>
            </span>

            <span className="text-error font-medium flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[16px]">
                event_busy
            </span>
                {dataFinalFormatada}
            </span>
        </div>

        <div className="flex flex-col min-w-[140px]">
            <span className="font-mono text-on-surface font-bold text-[18px]">
            R$ 25,80
            </span>
        </div>

        <div className="flex flex-col items-start lg:items-end justify-center shrink-0">
            {data.status === "PENDENTE" ? (
                <>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-error-container text-on-error-container ring-2 ring-error animate-pulse shadow-md uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                        {data.status}
                    </span>
                    <button onClick={confirmarAluguel}>
                        <span className="font-caption text-caption text-error font-medium mt-1">
                            Confirmar Aluguel
                        </span>
                    </button>
                </>

            ) :  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-on-error-container ring-2 ring-error animate-pulse shadow-md uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                    {data.status}
                </span>}
        </div>
        </div>    
    </>
    )
}

