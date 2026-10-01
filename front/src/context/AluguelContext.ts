import { create } from 'zustand'
import type { AluguelType } from '../utils/AluguelType'

type AluguelStore = {
    alugueis: AluguelType[]
    setAlugueis: (lista: AluguelType[]) => void
    atualizarStatusAluguel: (id: number, novoStatus: string) => void
}

export const useAluguelStore = create<AluguelStore>((set) => ({
    alugueis: [],
    setAlugueis: (lista) => set({ alugueis: lista }),

    atualizarStatusAluguel: (id, novoStatus) => set((state) => ({
        alugueis: state.alugueis.map((aluguel) => 
            aluguel.id === id ? { ...aluguel, status: novoStatus } : aluguel
        )
    }))
}))