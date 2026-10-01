import { CardAluguel } from "../../components/CardAluguel";
import { useEffect, useState } from "react";
import type { AluguelType } from "../../utils/AluguelType"
import { useClienteStore } from "../../context/ClienteContext";
import { useAluguelStore } from "../../context/AluguelContext";


const apiUrl = import.meta.env.VITE_API_URL

export default function HisotricoAlugueis() {
  const { alugueis, setAlugueis } = useAluguelStore()    
  const { cliente } = useClienteStore()


  

    useEffect(() => {
      async function buscaDados() {
        try {
          const response = await fetch(`${apiUrl}/alugueis/${cliente.id}`);
          const dados = await response.json();
  
          setAlugueis(dados);
        } catch (error) {
          console.error("Erro ao buscar alugueis:", error);
        }
      }
  
      buscaDados();
    }, []);

    const listaAlugueisAtivos = alugueis.filter(aluguel => aluguel.status === "ATIVO")
    .map( alugel => (
        <CardAluguel data={alugel} key={alugel.id} />
    ))

    const listaAlugueis = alugueis.filter(aluguel => aluguel.status === "PENDENTE" || aluguel.status === "CONCLUIDO")
    .map( alugel => (
        <CardAluguel data={alugel} key={alugel.id} />
    ))

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8 md:py-12 gap-8 md:gap-12">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-container/20 text-primary-fixed-dim font-caption text-caption tracking-wider uppercase font-semibold">
                  <span className="material-symbols-outlined text-[14px]">
                    android_recorder
                  </span>
                  Terminal do Associado
                </span>
                <span className="text-on-surface-variant font-caption text-caption">
                  • Registro Ativo #0812
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-on-surface tracking-tight">
                Histórico de Aluguéis
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Consulte o histórico de todas os filmes que você já alugou, recibos digitais e status de devolução.
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Locação Ativa em Andamento
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary-fixed-dim font-caption text-caption font-semibold">
                1 Pedido em Aberto (2 fitas)
              </span>
            </div>
          </div>
            <div className="flex flex-col gap-4">         
                {listaAlugueisAtivos}
            </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              Histórico de Pedidos de Locação
            </h2>
            <span className="font-caption text-caption text-on-surface-variant">
              Mostrando 3 pedidos concluídos (6 fitas totais)
            </span>
          </div>
          <div className="flex flex-col gap-4">         
                {listaAlugueis}
            </div>
        </section>
        </div>
    </main>
  );
}
