// import { Link } from "react-router-dom"
// import { useClienteStore } from "../context/ClienteContext"
// import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { InputPesquisa } from "./InputPesquisa"

export default function Cabecalho() {
    // const { cliente, deslogaCliente } = useClienteStore()
    // const navigate = useNavigate()

    // function clienteSair() {
    //     if (confirm("Confirma saída do sistema?")) {
    //         deslogaCliente()
    //         if (localStorage.getItem("clienteKey")) {
    //             localStorage.removeItem("clienteKey")
    //         }
    //         navigate("/login")
    //     }
    // }

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
          <Link to={`/login`}>
          <button className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 ml-2 hidden sm:block">Entrar</button>
          </Link>
        </div>
      </nav>
    )
}