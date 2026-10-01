import { useEffect } from "react"
import { useAdminStore } from "../context/AdminContext"
import { useAluguelStore } from "../context/AluguelContext";
import { useFilmesStore } from "../context/FilmeContext";
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"


const apiUrl = import.meta.env.VITE_API_URL

export function MenuLateral() {    

    const { filmes, setFilmes } = useFilmesStore()  
    const { alugueis, setAlugueis } = useAluguelStore()  
    const { admin } = useAdminStore()
    
    useEffect(() => {
        async function getFilmes() {
            const response = await fetch(`${apiUrl}/filmes`)
            const dados = await response.json()
            setFilmes(dados)
        }
        getFilmes()

        async function getAlugueis() {
            const response = await fetch(`${apiUrl}/alugueis`)
            const dados = await response.json()
            setAlugueis(dados)
        }
        getFilmes()
        getAlugueis()
    }, [])

    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const quantidadeFilmes = filmes.length
    // const quantidadeAlugueis = filmes.filter((filme) => filme.adminId === admin.id).length
    
    return (
        <aside className="w-fixed left-0 top-0 h-full bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="h-20 px-6 flex items-center gap-3 bg-surface-container-lowest">
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-md">
                        <span className="material-symbols-outlined text-[24px]">videocam</span>
                    </div>
                    <div>
                        <span className="font-headline-md text-headline-md tracking-tight text-on-surface block leading-none">CINE RETRO</span>
                        <span className="font-caption text-caption tracking-widest text-primary font-bold uppercase block mt-1">VHS Admin Portal</span>
                    </div>
                </div>

                <div className="px-4 py-2">
                    <div className="px-3 py-1.5 rounded-lg bg-surface-container flex items-center justify-between text-on-surface-variant font-caption text-caption">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            VHS-OS v2.4
                        </span>
                        <span className="text-secondary font-semibold uppercase">ONLINE</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1" data-active-classNamees="text-on-primary-container font-bold rounded-lg shadow-sm">
                    <Link to={`/admin`} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors${
                        isActive("/admin")
                            ? "bg-primary-container text-on-primary-container font-bold shadow-sm"
                            : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                    }`}>
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        <span>Visão Geral</span>
                    </Link>
                    <Link to="/admin/filmes" className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                            isActive("/admin/filmes")
                                ? "bg-primary-container text-on-primary-container font-bold shadow-sm"
                                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px]">
                                movie
                            </span>
                            <span>Filmes / Fitas</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-highest text-on-surface">
                            {quantidadeFilmes}
                        </span>
                    </Link>
                    <Link to="/admin/alugueis" className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                            isActive("/admin/alugueis")
                                ? "bg-primary-container text-on-primary-container font-bold shadow-sm"
                                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                            <span>Aluguéis</span>
                        </div>
                    </Link>
                </nav>
            </div>

            <div className="bg-surface-container-low bottom-0">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface leading-tight">{admin.nome}</span>
                            <span className="font-caption text-caption text-on-surface-variant">Nível {admin.nivel}</span>
                        </div>
                    </div>
                    <Link to={'/admin/login'}>
                    <a className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-error hover:bg-surface-container-highest transition-colors" data-path="login" href="#" title="Encerrar Turno">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </a>
                    </Link>
                </div>
            </div>
        </aside>
    )
}