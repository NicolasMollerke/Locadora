import { useForm } from "react-hook-form"

import { useNavigate } from "react-router-dom";

import { toast } from "sonner"
import { useClienteStore } from "../../context/ClienteContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminLogin() {
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
            <body className="bg-surface-container-lowest text-on-surface font-body-md text-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container">
                <main className="w-full min-h-screen flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
                    <div className="flex flex-col w-full items-center justify-center py-8 md:py-16 relative">
                        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[460px] h-[260px] bg-secondary-container/5 blur-[120px] rounded-full pointer-events-none"></div>
                        <div className="w-full max-w-[480px] flex flex-col items-center relative z-10">
                            <header className="flex flex-col items-center text-center mb-8 w-full">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/70 backdrop-blur-md mb-4 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="font-caption text-caption tracking-wider text-on-surface-variant uppercase">SISTEMA OPERACIONAL // NÓ: BALCÃO CENTRAL</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary-container text-headline-lg">videocam</span>
                                        <span className="font-display-lg-mobile md:font-headline-lg text-display-lg-mobile md:text-headline-lg tracking-wider text-on-surface font-extrabold uppercase">CINE RETRO</span>
                                    </div>
                                    <span className="bg-primary-container text-on-primary-container font-caption text-caption uppercase px-2.5 py-0.5 rounded tracking-widest font-bold shadow-md">ACESSO RESTRITO</span>
                                </div>
                                <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                                    Terminal de Gestão Operacional & Acervo Magnético
                                </p>
                            </header>
                            <section className="w-full bg-surface-container/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col gap-6">
                            <div className="flex items-start justify-between gap-4 pb-2">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary-container text-headline-md">shield_lock</span>
                                        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Entrar no Sistema</h1>
                                    </div>
                                    <p className="font-caption text-caption text-on-surface-variant">
                                        Área restrita a gerentes e atendentes de balcão autorizados.
                                    </p>
                                </div>
                                <div className="hidden sm:flex p-2.5 rounded-lg bg-surface-container-high text-primary-container">
                                    <span className="material-symbols-outlined">vpn_key</span>
                                </div>
                            </div>
                            <form className="flex flex-col gap-5" id="adminLoginForm" onSubmit={handleSubmit(verificaLogin)}>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                                        <span>E-mail ou Matrícula</span>
                                        <span className="font-caption text-caption text-on-surface-variant/80">Obrigatório</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-body-lg pointer-events-none">badge</span>
                                        <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-4 py-3 rounded-lg placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-highest shadow-inner transition-colors duration-200" id="identifier" name="identifier" placeholder="exemplo@cineretro.com.br ou #0894" required type="text"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="font-label-md text-label-md text-on-surface">Senha Mestra</label>
                                        <a className="font-caption text-caption text-secondary hover:underline transition-all" href="javascript:void(0)">Esqueceu a senha?</a>
                                    </div>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-body-lg pointer-events-none">lock</span>
                                        <input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-11 pr-11 py-3 rounded-lg placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-highest shadow-inner transition-colors duration-200" id="masterPassword" name="password" placeholder="••••••••••••" required type="password"/>
                                        <button aria-label="Alternar visibilidade de senha" className="absolute right-3.5 text-on-surface-variant hover:text-on-surface flex items-center justify-center p-1 rounded transition-colors" id="togglePasswordBtn" type="button">
                                            <span className="material-symbols-outlined text-body-md" id="toggleIcon">visibility</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                        <input checked className="w-4 h-4 rounded bg-surface-container-low accent-primary-container cursor-pointer" type="checkbox"/>
                                        <span className="font-caption text-caption text-on-surface-variant">Manter conectado neste terminal (Turno de 8h)</span>
                                    </label>
                                </div>
                                <button className="w-full mt-2 bg-primary-container hover:bg-inverse-primary text-on-primary-container font-headline-md text-body-md py-3.5 px-6 rounded-lg shadow-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group active:scale-[0.99]" type="submit">
                                    <span>Acessar Painel de Controle</span>
                                    <span className="material-symbols-outlined text-body-md transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                                </button>
                            </form>
                            <div className="pt-4 flex flex-col gap-4 bg-surface-container-lowest/50 -mx-6 -mb-6 p-6 rounded-b-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-caption text-caption text-on-surface-variant">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        <span>Leitor de Código de Barras: <strong className="text-on-surface">PRONTO</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                        <span>Impressora de Comprovantes: <strong className="text-on-surface">ONLINE</strong></span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center pt-2">
                                    <a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="javascript:void(0)">
                                        <span className="material-symbols-outlined text-body-md">arrow_back</span>
                                        <span>Voltar para a Loja Pública / Catálogo</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                        <footer className="mt-8 text-center flex flex-col items-center gap-1.5 font-caption text-caption text-on-surface-variant/70">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-caption text-emerald-400">lock</span>
                                <span>Conexão Criptografada SSL de Alta Segurança</span>
                            </div>
                            <p>© 1994-2025 CINE RETRO ENTERTAINMENT • Terminais Balcão v2.4</p>
                        </footer>
                    </div>
                </div>
            </main>
        </body>
    )
}