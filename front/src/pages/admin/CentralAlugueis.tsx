import { useEffect, useState } from "react";
import { CardAluguelAdmin } from "../../components/CardAluguelAdim";
import type { AluguelType } from "../../utils/AluguelType";
import { useAluguelStore } from "../../context/AluguelContext";

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export default function CentralAlugueis() {
    const [alugueis, setAlugueis] = useState<AluguelType[]>([])
        
    useEffect(() => {
      async function buscaDados() {
        try {
          const response = await fetch(`${apiUrl}/alugueis`);
          const dados = await response.json();
  
          setAlugueis(dados);
        } catch (error) {
          console.error("Erro ao buscar alugueis:", error);
        }
      }
  
      buscaDados();
    }, []);

        const listaAlugueis = alugueis.map( alugel => (
            <CardAluguelAdmin data={alugel} key={alugel.id} />
        ))

  return (
    <div className="bg-surface-container-low rounded-xl shadow-xl overflow-hidden" id="tabela">
        <div className="p-4 bg-surface-container flex items-center justify-between border-b border-surface-container-high">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">view_list</span>
            <h2 className="font-headline-md text-headline-md text-on-surface text-base lg:text-lg">Fila Operacional de Fitas Locadas</h2>
        </div>
        <div className="flex items-center gap-2 font-caption text-caption text-on-surface-variant">
            <span className="">Auto-atualização:</span>
            <span className="text-secondary font-mono font-semibold">30s</span>
            <button className="p-1 rounded bg-surface-container-highest hover:bg-surface-bright text-on-surface transition-colors" title="Recarregar">
                <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
        </div>
    </div>
            <div className="p-4 flex flex-col gap-3 w-full">
                {listaAlugueis}
            </div>
    </div>

  );
}
