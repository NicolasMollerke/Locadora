import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner"
import { useClienteStore } from "./context/ClienteContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()    
    const { logaCliente } = useClienteStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        // alert(`${data.email} ${data.senha} ${data.manter}`)
        const response = await 
          fetch(`${apiUrl}/clientes/login`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
          })
        
        // console.log(response)
        if (response.status == 200) {
            // toast.success("Ok!")            
            const dados = await response.json()

            // "coloca" os dados do cliente no contexto
            logaCliente(dados)
            
            // se o cliente indicou que quer se manter conectado
            // salvamos os dados (id) dele em localStorage
            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id)
            } else {
                // se indicou que não quer permanecer logado e tem
                // uma chave (anteriormente) salva, remove-a
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            // carrega a página principal, após login do cliente
            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

    return (
        <main className="w-full pt-20 bg-background">
          <div className="flex flex-col w-full min-h-[calc(100vh-5rem)] justify-center items-center px-margin-mobile md:px-margin-tablet py-margin-desktop relative overflow-hidden">
            <div className="absolute w-[600px] h-[600px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none -top-40 -left-32"></div>
            <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary-container/5 blur-[120px] pointer-events-none -bottom-24 -right-20"></div>
            <div className="relative w-full max-w-[480px] z-10">
              <div className="flex items-center justify-between px-6 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">SISTEMA VHS-OS • ONLINE</span>
                </div>
                <span className="font-caption text-caption px-2 py-0.5 rounded bg-surface-container-high text-secondary">MODO SÓCIO</span>
              </div>
              <div className="bg-surface-container-low rounded-xl shadow-2xl p-8 md:p-10 flex flex-col relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80"></div>
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center shadow-inner mb-4 relative">
                    <span className="material-symbols-outlined text-primary-container text-[30px]">badge</span>
                    <span className="material-symbols-outlined text-secondary absolute -bottom-1 -right-1 text-[16px]">videocam</span>
                  </div>
                  <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                    Acessar Ficha de Sócio
                  </h1>
                  <p className="font-body-md text-caption text-on-surface-variant max-w-xs mt-2 leading-relaxed">
                    Digite suas credenciais para continuar rebobinando suas memórias cinematográficas.
                  </p>
                </div>
                <form className="flex flex-col gap-5" id="retroLoginForm" onSubmit={handleSubmit(verificaLogin)}>
                  <div className="flex flex-col gap-2 text-left">
                    <label className="font-label-md text-caption uppercase text-on-surface tracking-wider flex items-center justify-between">
                      <span className="">E-mail ou Código de Sócio</span>
                      <span className="font-caption text-caption text-on-surface-variant/70 normal-case tracking-normal">Ex: 1994-BR</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 text-[20px] pointer-events-none">badge</span>
                      <input className="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-caption focus:outline-none focus:bg-surface-container-high transition-all" id="memberId"placeholder="exemplo@cineretro.com.br" required type="text"
                      {...register("email")}/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <label className="font-label-md text-caption uppercase text-on-surface tracking-wider">
                      Senha Secreta
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 text-[20px] pointer-events-none">lock</span>
                      <input className="w-full h-12 pl-11 pr-11 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-caption focus:outline-none focus:bg-surface-container-high transition-all tracking-widest" id="passwordField" placeholder="••••••••" required type="password"
                      {...register("senha")}/>
                      <button aria-label="Alternar exibição da senha" className="absolute right-3 w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors" id="togglePasswordBtn" type="button">
                        <span className="material-symbols-outlined text-[19px]" id="passwordEyeIcon">visibility</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 pb-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                      <div className="relative flex items-center justify-center">
                        <input className="peer sr-only" id="rememberDevice" type="checkbox" {...register("manter")}/>
                        <div className="w-4 h-4 rounded bg-surface-container peer-checked:bg-primary-container transition-all flex items-center justify-center shadow-inner">
                          <span className="material-symbols-outlined text-on-primary-container text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                        </div>
                      </div>
                      <span className="font-body-md text-caption text-on-surface-variant group-hover:text-on-surface transition-colors">
                        Lembrar neste videocassete
                      </span>
                    </label>
                    <a className="font-label-md text-caption text-secondary hover:text-tertiary-fixed transition-colors" href="#">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <button className="w-full h-12 mt-2 rounded-lg bg-primary-container text-on-primary-container font-headline-md text-body-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-inverse-primary active:scale-[0.99] transition-all shadow-lg" id="submitButton" type="submit">
                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    <span id="buttonText" className="">ENTRAR</span>
                  </button>
                </form>
                <div className="flex flex-col items-center gap-4 mt-8 pt-6 bg-surface-container/30 -mx-8 -mb-8 px-8 pb-8 rounded-b-xl">
                  <div className="flex flex-col items-center gap-3 w-full text-center">
                    <span className="font-body-md text-caption text-on-surface-variant">Ainda não é nosso associado?</span>
                    <Link to={`/cadCliente`}>
                        <a className="w-full h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-primary font-label-md text-label-md transition-all flex items-center justify-center gap-2 shadow-sm border border-outline-variant/30 group active:scale-[0.99]" data-path="criar-carteirinha" href="#">
                        <span className="material-symbols-outlined text-[18px] text-primary transition-colors">badge</span>
                        <span className="tracking-wider uppercase font-bold text-caption">Criar Nova Carteirinha </span>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
                        </a>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                    <span className="font-caption text-caption text-on-surface-variant/60 uppercase tracking-wider">
                      Locadora Cine Retro • Est. 1994
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 text-on-surface-variant/50 font-caption text-caption">
                <span className="material-symbols-outlined text-[16px]">fast_rewind</span>
                <span className="">Por favor, não esqueça de rebobinar sua fita antes de devolver</span>
              </div>
            </div>
          </div>
        </main>
    )
}