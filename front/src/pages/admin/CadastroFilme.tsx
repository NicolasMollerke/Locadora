import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAdminStore } from "../../context/AdminContext"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
    titulo: z.string()
        .min(1, "O título é obrigatório")
        .max(30, "O título deve ter no máximo 30 caracteres"),
        
    diretor: z.string()
        .min(1, "O diretor é obrigatório")
        .max(30, "O diretor deve ter no máximo 30 caracteres")
        .refine(value => value.trim().includes(' '), {
            message: "Informe o nome completo do diretor (nome e sobrenome)",
        }),
        
    ano: z.coerce.number()
        .int("O ano deve ser um número inteiro")
        .min(1895, "O ano não pode ser inferior a 1895 (início do cinema)")
        .max(new Date().getFullYear() + 5, "Ano de lançamento muito distante"),
        
    banner: z.string()
        .min(1, "A imagem do banner é obrigatória")
        .url("Formato de URL do banner inválido"),
        
    preco: z.coerce.number()
        .nonnegative("O preço não pode ser negativo")
        .multipleOf(0.01, "O preço deve ter no máximo duas casas decimais"),
        
    poster: z.string()
        .min(1, "A imagem do poster é obrigatória")
        .url("Formato de URL do poster inválido"),
        destaque: z.boolean().optional().default(false)
});

type FormData = z.infer<typeof schema>

const apiUrl = import.meta.env.VITE_API_URL

export default function CadastroFilme() {
    const { admin } = useAdminStore()
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    });
    // const navigate = useNavigate()

    async function cadastraFilme(data: FormData) {

        const response = await
            fetch(`${apiUrl}/filmes`, {
                headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${admin.token}`
                 },
                method: "POST",
                body: JSON.stringify({
                    titulo: data.titulo,
                    diretor: data.diretor,
                    ano: Number(data.ano),
                    poster: data.poster,
                    banner: data.banner,
                    preco: Number(data.preco),
                    destaque: Boolean(data.destaque)
                })
            })


        if (response.status == 201) {
            toast.success("Ok! Cadastro realizado com sucesso...")
            setTimeout(() => {
            }, 3000) 
        } else {
            const responseData = await response.json()
            const mensagemErro = responseData.erro || responseData.error || "Erro desconhecido ao cadastrar o filme."; 

            toast.error(mensagemErro)
        }
    }

    return (
        <main className="w-full pt-20 bg-background min-h-screen px-margin-tablet lg:px-margin-desktop py-gutter">
            <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-3 mt-1">
                            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Registrar Novo Filme</h1>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                            Cadastre filmes no acervo da locadora com metadados técnicos, inventário e artes de exibição.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                        <Link to={"/admin"}>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all" type="button">
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            <span className="">Voltar a Página Inicial</span>
                        </button>
                        </Link>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container hover:brightness-110 text-on-primary-container font-label-md text-label-md shadow-lg shadow-primary-container/20 transition-all" id="topSaveBtn" type="submit" form="vhsRegisterForm">
                            <span className="material-symbols-outlined text-[18px] animate-pulse">radio_button_checked</span>
                            <span className="">Salvar Filme [REC]</span>
                        </button>
                    </div>
                </div>
                <form className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full" id="vhsRegisterForm" onSubmit={handleSubmit(cadastraFilme)}>
                    <div className="xl:col-span-7 flex flex-col gap-6">
                        <div className="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">movie_filter</span>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md text-on-surface">Metadados Principais</h2>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                                    <span className="">Título do Filme <span className="text-primary">*</span></span>
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">theaters</span>
                                    <input className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-all" id="movieTitle" placeholder="Ex: Blade Runner: O Caçador de Androides" required type="text"
                                     {...register("titulo")}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface">Ano de Lançamento</label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">calendar_today</span>
                                        <input className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-all font-mono" id="releaseYear" placeholder="1982" type="text"
                                         {...register("ano")}/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md text-on-surface">Diretor / Realizador</label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">video_camera_front</span>
                                        <input className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-all" id="directorName" placeholder="Ridley Scott" type="text"
                                         {...register("diretor")}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 pt-2">
                                <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all cursor-pointer border border-outline/20 group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input className="sr-only peer" id="featuredYes" type="checkbox"  {...register("destaque")}/>
                                        <div className="w-5 h-5 rounded bg-surface-container-lowest border border-outline-variant peer-checked:bg-primary-container peer-checked:border-primary-container flex items-center justify-center transition-all shadow-sm">
                                            <span className="material-symbols-outlined text-[16px] text-white opacity-0 peer-checked:opacity-100 transition-opacity font-bold">check</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">Destacar filme na Vitrine Principal (Página Inicial)</span>
                                            <span className="font-caption text-caption px-2 py-0.5 rounded bg-primary-container/20 text-primary font-bold tracking-wider">HOT / DESTAQUE</span>
                                        </div>
                                        <span className="font-caption text-caption text-on-surface-variant mt-1 leading-relaxed">Exibe o filme com banner em destaque no topo da página inicial e carrossel de lançamentos recomendados.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-5 flex flex-col gap-6">
                        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-5 shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md text-on-surface">Artes Visuais</h2>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                                    <span className="">Pôster Vertical (Capa VHS 2:3)</span>
                                    <span className="font-caption text-caption text-on-surface-variant">Recomendado 600x900</span>
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">link</span>
                                    <input className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-all text-xs font-mono" id="posterUrlInput" placeholder="https://assets.cineretro.com/vhs-bladerunner-cover.jpg" type="text" {...register("poster")}/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                                    <span className="">Banner Backdrop (Hero 16:9)</span>
                                    <span className="font-caption text-caption text-on-surface-variant">Recomendado 1920x1080</span>
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">panorama</span>
                                    <input className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md focus:outline-none focus:bg-surface-container-high transition-all text-xs font-mono" id="bannerUrlInput" placeholder="https://assets.cineretro.com/vhs-bladerunner-backdrop.jpg" type="text" {...register("banner")}/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-5 shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">sell</span>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md text-on-surface">Preço da Locação</h2>
                                </div>                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-primary text-[20px]">payments</span>
                                    <input className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/50 font-mono font-semibold text-body-md focus:outline-none focus:bg-surface-container-high transition-all ring-1 ring-primary/40 focus:ring-2 focus:ring-primary" id="priceInput" placeholder="R$ 9.90" required type="text"  {...register("preco")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}