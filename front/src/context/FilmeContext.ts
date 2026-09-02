import { create } from 'zustand'
import type { FilmeType } from '../utils/FilmeType'

type FilmesStore = {
    filmes: FilmeType[]
    setFilmes: (novosFilmes: FilmeType[]) => void
    limparFilmes: () => void
}

// Cria a store efetivamente
export const useFilmesStore = create<FilmesStore>((set) => ({
    filmes: [], // Inicia como um array vazio
    setFilmes: (novosFilmes) => set({ filmes: novosFilmes }), 
    limparFilmes: () => set({ filmes: [] }) 
}))