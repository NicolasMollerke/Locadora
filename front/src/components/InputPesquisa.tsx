import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFilmesStore } from "../context/FilmeContext"; 

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    termo: string
}


export function InputPesquisa() {
    const { register, handleSubmit } = useForm<Inputs>()
    
    const setFilmes = useFilmesStore((state) => state.setFilmes)

    async function enviaPesquisa(data: Inputs) {
        if (data.termo.length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres")
            return
        }

        const response = await fetch(`${apiUrl}/filmes/pesquisa/${data.termo}`)
        const dados = await response.json()
        
        setFilmes(dados)
    }

    return (
        <div className="flex mx-auto max-w-5xl my-auto">
            <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
                <div className="relative flex items-center bg-surface-container-highest/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/5 focus-within:border-secondary transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
                    <input type="search" id="default-search" className="bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/50 w-full pr-24"
                        placeholder="Informe título, gênero, ano ou preço máximo" required 
                        {...register('termo')} />
                    <button type="submit" className="bg-primary-container text-on-primary-container font-label-md text-label-md px-5 py-2 rounded-full hover:scale-105 transition-transform duration-300 absolute right-2">
                        Pesquisar
                    </button>
                </div>
            </form>
        </div>
    )
}