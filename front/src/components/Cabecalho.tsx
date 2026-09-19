// import { Link } from "react-router-dom"
import { useClienteStore } from "../context/ClienteContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { InputPesquisa } from "./InputPesquisa"

export default function Cabecalho() {
    const { cliente, deslogaCliente } = useClienteStore()
    const navigate = useNavigate()

    function clienteSair() {
        if (confirm("Confirma saída do sistema?")) {
            deslogaCliente()
            if (localStorage.getItem("clienteKey")) {
                localStorage.removeItem("clienteKey")
            }
            navigate("/login")
        }
    }

    const quant = cliente?.carrinho?.filmes?.length || 0

    return (
        <nav className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-white/10 shadow-2xl flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center gap-8">
          <a className="font-display-lg text-primary tracking-tighter text-3xl md:text-4xl" href="#">CINE RETRO</a>
          <ul className="hidden md:flex items-center gap-6 font-body-md text-body-md">
            <li><a className="text-primary font-bold border-b-2 border-primary pb-1 transition-all duration-200 active:scale-95" href="#">Home</a></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-all duration-300 active:scale-95 hover:scale-105" href="#">Filmes</a></li>
            <li><a className="text-on-surface-variant hover:text-primary transition-all duration-300 active:scale-95 hover:scale-105" href="#">Lançamentos</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <InputPesquisa/>
          {cliente.id ? (
					<div className="flex items-center gap-3">
            <button 
              aria-label="Carrinho de Fitas" 
              className="relative text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-300 p-1 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {quant}
              </span>
            </button>
            <div className="flex items-center gap-3 ml-1">
              <span className="font-label-md text-caption text-on-surface font-semibold leading-tight">
                {cliente.nome}
              </span>
              <button onClick={clienteSair}className="flex items-center gap-1.5 px-3 py-1 rounded-full text-caption text-on-surface-variant hover:text-primary hover:border-primary/40 border border-white/10 transition-colors duration-200 active:scale-95">
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sair</span>
              </button>
            </div>
          </div>
					) : (
						<Link to={`/login`} className="bg-primary-container hover:bg-primary text-on-primary-container px-8 py-4 rounded-lg font-headline-md text-headline-md flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
							<button className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 ml-2 hidden sm:block">Entrar</button>
						</Link>
					)}
        </div>
      </nav>
    )
}