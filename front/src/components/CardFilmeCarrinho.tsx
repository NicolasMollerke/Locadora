import { toast } from "sonner";
import { useClienteStore } from "../context/ClienteContext";
import type { FilmeType } from "../utils/FilmeType"

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export function CardFilmeCarrinho({data}: {data: FilmeType}) {
    const { cliente, logaCliente } = useClienteStore()

    async function removerDoCarrinho() {
      if (!cliente?.id) {
        toast.error("Você precisa estar logado para adicionar itens ao carrinho!");
        return;
      }
      
      const response = await fetch(`${apiUrl}/carrinho/${cliente.id}/${data.id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE",
      })
  
      const dados = await response.json();
  
      if (response.ok) {
        toast.success("Item Removido no seu carrinho")
        logaCliente({
          ...cliente,
          carrinho: dados
    		})
      } else {
        toast.error(dados.erro || dados.error || "Erro... Não foi possível remover o item ao carrinho");
      }
    }


    return (
        // <div className="p-4 sm:p-5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all duration-200 shadow-md group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-surface-container-lowest flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img className="w-full h-full object-cover" data-alt="Dark gritty 1980s cyberpunk sci-fi movie poster VHS cover with glowing neon wireframes, chrome robotic cyborg head, and textured worn cardboard edges, deep red and dark slate tones" src={data.poster}/>
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur text-[10px] font-bold text-secondary tracking-wider uppercase">
                            SP Modo
                        </div>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-caption text-caption">{data.ano}</span>
                            <span className="font-caption text-caption text-secondary">{data.genero}</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-on-surface truncate tracking-tight">{data.titulo}</h2>
                        <p className="font-caption text-caption text-on-surface-variant mt-0.5">VHS Remasterizado • Hi-Fi Stereo Dolby</p>
                        <div className="flex items-center gap-3 mt-3 text-on-surface-variant font-caption text-caption">
                            <span className="flex items-center gap-1 text-outline">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                Fita Testada Sem Mofo
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto sm:ml-auto">
                    <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                        <button aria-label="Diminuir dias" className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors" type="button">
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="px-3 font-label-md text-label-md text-on-surface whitespace-nowrap">3 Dias</span>
                        <button aria-label="Aumentar dias" className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors" type="button">
                            <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                        <div className="flex flex-col">
                            <span className="font-headline-md text-headline-md text-on-surface font-bold">R$ {Number(data.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>                        </div>
                        <button onClick={removerDoCarrinho} aria-label="Remover Cyber Chronicles da cesta" className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-surface-container-lowest transition-all" title="Devolver à estante" type="button">
                            <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                        </button>
                    </div>
                </div>
            </div>
    )
}