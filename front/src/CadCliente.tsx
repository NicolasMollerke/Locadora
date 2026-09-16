import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ... não precisa mais com o Zod
// type Inputs = {
//     nome: string
//     email: string
//     cidade: string
//     senha: string
//     senha2: string
// }

// Schema Zod com validações
const schema = z.object({
    nome: z.string()
        .min(6, "Nome deve ter pelo menos 6 caracteres")
        .max(60, "Nome deve ter no máximo 60 caracteres")
        .refine(value => value.includes(' '), {
            message: "Informe o nome completo (nome e sobrenome)",
        }),
    email: z.email("Formato de email inválido")
        .toLowerCase(),
    // exemplos de validação de outros tipos de campo
    //   idade: z.coerce.number()
    //     .min(18, "Idade mínima: 18 anos")
    //     .max(100, "Idade máxima: 100 anos"),
    //   curso: z.enum(["ADS", "Redes", "Mkt"], {
    //     errorMap: () => ({ message: "Selecione um curso" })
    senha: z.string()
        .min(8, "Senha deve ter pelo menos 8 caracteres")
        .regex(/[a-z]/, "Senha deve conter, no mínimo, uma letra minúscula")
        .regex(/[A-Z]/, "Senha deve conter, no mínimo, uma letra maiúscula")
        .regex(/[0-9]/, "Senha deve conter, no mínimo, um número").regex(/[A-Z]/, "Senha deve conter uma letra maiúscula")
        .regex(/[!@#$%^&*]/, "Senha deve conter, no mínimo, um caractere especial"),
    senha2: z.string()
}).refine((data) => data.senha == data.senha2, {  // Validação cross-field
    message: "Senhas não coincidem",
    path: ["senha2"]  // Erro aparece no campo senha2
})

type FormData = z.infer<typeof schema>

const apiUrl = import.meta.env.VITE_API_URL

export default function CadCliente() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)  // Validação Zod
    });

    const navigate = useNavigate()

    async function cadastraCliente(data: FormData) {

        const response = await
            fetch(`${apiUrl}/clientes`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha
                })
            })


        if (response.status == 201) {
            toast.success("Ok! Cadastro realizado com sucesso...")
            // carrega a página principal, após login do cliente
            setTimeout(() => {
                navigate("/login")
            }, 3000)  // Aguarda 3 segundos (3000 ms)
        } else {
            
            const responseData = await response.json()
            console.log(responseData)
            // Erro específico de e-mail duplicado
            if (responseData.erro == "E-mail já cadastrado") {
                setError("email", { type: "server", message: responseData.erro })
                toast.error(responseData.erro)
                return
            }
            // Outros erros genéricos
            toast.error(responseData.erro)
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
                    </div>
                    <div className="bg-surface-container-low rounded-xl shadow-2xl p-8 md:p-10 flex flex-col relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80"></div>
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center shadow-inner mb-4 relative">
                                <span className="material-symbols-outlined text-primary-container text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                                <span className="material-symbols-outlined text-secondary absolute -bottom-1 -right-1 text-[16px]">stars</span>
                            </div>
                            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Fazer Cadastro</h1>
                            <p className="font-body-md text-caption text-on-surface-variant max-w-xs mt-2 leading-relaxed">Preencha seus dados para começar a alugar clássicos e raridades em VHS.</p>
                        </div>
                        <form className="flex flex-col gap-5" id="retroLoginForm" onSubmit={handleSubmit(cadastraCliente)}>
                            <div className="flex flex-col gap-2 text-left">
                                <label className="font-label-md text-caption uppercase text-on-surface tracking-wider flex items-center justify-between" htmlFor="fullNameInput">
                                    <span>Nome Completo</span>
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 text-[20px] pointer-events-none">person</span>
                                    <input className="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-caption focus:outline-none focus:bg-surface-container-high transition-all" id="fullNameInput" placeholder="Ex: Carlos Drummond de Andrade" required type="text" {...register("nome")} />
                                    {errors.nome && <p role="alert" className="error">{errors.nome.message}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-left">
                                <label className="font-label-md text-caption uppercase text-on-surface tracking-wider flex items-center justify-between" htmlFor="emailInput">
                                    <span>E-mail</span>
                                    <span className="font-caption text-caption text-on-surface-variant/70 normal-case tracking-normal">Para envio dos comprovantes</span>
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 text-[20px] pointer-events-none">mail</span>
                                    <input className="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-caption focus:outline-none focus:bg-surface-container-high transition-all" id="emailInput" placeholder="exemplo@cineretro.com.br" required type="email" {...register("email")} />
                                    {errors.email && <p role="alert" className="error">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-left">
                                <label className="font-label-md text-caption uppercase text-on-surface tracking-wider" htmlFor="passwordField">Senha</label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 text-[20px] pointer-events-none">lock</span>
                                    <input className="w-full h-12 pl-11 pr-11 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-caption focus:outline-none focus:bg-surface-container-high transition-all tracking-widest" id="passwordField" placeholder="••••••••" required type="password" {...register("senha")} />
                                    {errors.senha && <p role="alert" className="error">{errors.senha.message}</p>}

                                    <button aria-label="Alternar exibição da senha" className="absolute right-3 w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors" id="togglePasswordBtn" type="button">
                                        <span className="material-symbols-outlined text-[19px]" id="passwordEyeIcon">visibility</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-left">
                                <label className="font-label-md text-caption uppercase text-on-surface tracking-wider" htmlFor="confirmPasswordField">Confirmar Senha</label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 text-[20px] pointer-events-none">lock_reset</span>
                                    <input className="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/40 font-body-md text-caption focus:outline-none focus:bg-surface-container-high transition-all tracking-widest" id="confirmPasswordField" placeholder="Repita sua senha secreta" required type="password" {...register("senha2")} />
                                    {errors.senha2 && <p role="alert" className="error">{errors.senha2.message}</p>}
                                </div>
                            </div>
                            <div className="flex items-start gap-2 pt-1 pb-1">
                                <label className="flex items-start gap-2 cursor-pointer select-none group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input checked className="peer sr-only" id="acceptTerms" required type="checkbox" />
                                        <div className="w-4 h-4 rounded bg-surface-container peer-checked:bg-primary-container transition-all flex items-center justify-center shadow-inner">
                                            <span className="material-symbols-outlined text-on-primary-container text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                                        </div>
                                    </div>
                                    <span className="font-body-md text-caption text-on-surface-variant group-hover:text-on-surface transition-colors leading-tight">Concordo com os Termos do Associado e com a Política de Devolução (e Rebobinamento) de Fitas</span>
                                </label>
                            </div>
                            <button className="w-full h-12 mt-2 rounded-lg bg-primary-container text-on-primary-container font-headline-md text-body-md uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-inverse-primary active:scale-[0.99] transition-all shadow-lg" id="submitButton" type="submit">
                                <span className="material-symbols-outlined text-[20px]">badge</span>
                                <span id="buttonText">CRIAR CARTEIRINHA</span>
                            </button>
                        </form>
                        <div className="flex flex-col items-center gap-4 mt-8 pt-6 bg-surface-container/30 -mx-8 -mb-8 px-8 pb-8 rounded-b-xl">
                            <div className="flex items-center gap-2 text-center">
                                <span className="font-body-md text-caption text-on-surface-variant">Já possui cadastro?</span>
                                <a className="font-label-md text-caption text-primary-container hover:text-primary font-bold transition-colors inline-flex items-center gap-1" href="#">
                                    Acessar Ficha de Sócio
                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </a>
                            </div>
                            <div className="flex items-center justify-center gap-3 pt-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                                <span className="font-caption text-caption text-on-surface-variant/60 uppercase tracking-wider">Locadora Cine Retro • Est. 1994</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-6 text-on-surface-variant/50 font-caption text-caption">
                        <span className="material-symbols-outlined text-[16px]">fast_rewind</span>
                        <span>Por favor, não esqueça de rebobinar sua fita antes de devolver</span>
                    </div>
                </div>
            </div>
        </main>
    );
}