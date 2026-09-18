import type { FilmeType } from "./utils/FilmeType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export default function Detalhes() {
	const params = useParams()

	const [filme, setFilme] = useState<FilmeType>()
	const { cliente } = useClienteStore()

	useEffect(() => {
		async function buscaDados() {
			const response = await fetch(`${apiUrl}/filmes/${params.filmeId}`)
			const dados = await response.json()
			// console.log(dados)
			setFilme(dados)
		}
		buscaDados()
	}, [])

	async function adicionaCarrinho() {
		const response = await fetch(`${apiUrl}/carrinho`, {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				clienteId: cliente.id,
				filmeId: Number(params.filmeId),
			})
		})

		if (response.status == 201) {
			toast.success("Item adicionado no seu carrinho")
		} else {
			toast.error("Erro... Não foi possível adicionar o item ao carrinho")
		}
	}

	return (
		<>
			<body className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden">
				<main className="pt-24 md:pt-32 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
					<section className="flex flex-col md:flex-row gap-12 mb-24 relative">
						<div className="w-full md:w-1/3 lg:w-1/4 shrink-0 relative group perspective-1000">
							<div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-white/20 shadow-2xl transition-transform duration-500 transform group-hover:scale-[1.02] bg-surface-container-high">
								<img className="w-full h-full object-cover" data-alt="" src={filme?.poster} />
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
							</div>
						</div>
						<div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
							<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-4 uppercase tracking-wider">{filme?.titulo}</h1>
							<div className="flex flex-wrap gap-4 items-center mb-8 font-label-md text-label-md text-on-surface-variant">
								<span className="flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full border border-white/10"><span className="material-symbols-outlined text-sm">calendar_month</span>{filme?.ano}</span>
								<span className="flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full border border-white/10"><span className="material-symbols-outlined text-sm">schedule</span> {filme?.duracao} MIN</span>
								<span className="flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full border border-white/10"><span className="material-symbols-outlined text-sm">movie</span> {filme?.genero}</span>
							</div>

							<div className="mb-8 p-6 bg-black/60 border rounded-lg relative overflow-hidden group border-white/10">
								<div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
								<p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{filme?.sinopse}</p>
							</div>
							<div className="flex flex-wrap gap-4 mb-10">
								{cliente.id ? (
									<button onClick={adicionaCarrinho} className="bg-primary-container hover:bg-primary text-on-primary-container px-8 py-4 rounded-lg font-headline-md text-headline-md flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
										<span className="material-symbols-outlined">play_arrow</span>
										Alugar Fita
									</button>
								) : (
									<button className="bg-primary-container hover:bg-primary text-on-primary-container px-8 py-4 rounded-lg font-headline-md text-headline-md flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
										<span className="material-symbols-outlined">play_arrow</span>
										Faça login para adicionar o filme ao seu carrinho
									</button>
								)}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
								<div>
									<h3 className="font-headline-md text-headline-md text-primary mb-3">Diretor</h3>
									<p className="font-body-lg text-body-lg text-on-surface">{filme?.diretor}</p>
								</div>
								<div>
									<h3 className="font-headline-md text-headline-md text-primary mb-3">Elenco</h3>
									<p className="font-body-lg text-body-lg text-on-surface leading-loose">
										{filme?.elenco?.join(', ')}
									</p>
								</div>
							</div>
						</div>
					</section>
					<section className="mt-16 mb-24">
						<h2 className="font-headline-lg text-headline-lg text-on-surface mb-8 flex items-center gap-3">
							<span className="material-symbols-outlined text-primary text-3xl">star</span> Avaliações da Crítica
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-surface-container-high p-6 rounded-lg border border-white/10 flex flex-col items-center text-center gap-3">
								<div className="text-primary-container font-display-lg text-4xl">{filme?.avaliacoes[0]}%</div>
								<div className="font-label-md text-label-md text-on-surface uppercase tracking-widest">Rotten Tomatoes</div>
							</div>
							<div className="bg-surface-container-high p-6 rounded-lg border border-white/10 flex flex-col items-center text-center gap-3">
								<div className="text-primary font-display-lg text-4xl">{filme?.avaliacoes[1]}</div>
								<div className="font-label-md text-label-md text-on-surface uppercase tracking-widest">Letterboxd</div>
							</div>
							<div className="bg-surface-container-high p-6 rounded-lg border border-white/10 flex flex-col items-center text-center gap-3">
								<div className="font-display-lg text-4xl font-mono text-on-surface">{filme?.avaliacoes[2]}</div>
								<div className="font-label-md text-label-md text-on-surface uppercase tracking-widest">IMDB</div>
							</div>
						</div>
					</section>
					<section className="mb-24">
						<h2 className="font-headline-lg text-headline-lg text-on-surface mb-8 flex items-center gap-3">
							<span className="material-symbols-outlined text-primary text-3xl">forum</span> Comentários do BBS
						</h2>
						<div className="flex flex-col gap-4">
							<div className="border border-white/5 p-4 rounded text-sm bg-surface-container-low font-body-md">
								<div className="flex justify-between mb-2 border-b border-white/10 pb-1">
									<span className="text-primary">USER: RetroHacker88</span>
									<span className="text-on-surface-variant">DATE: 12-OCT-1994</span>
								</div>
								<p className="text-on-surface">Aluguei essa fita ontem. A trilha sonora em sintetizador é incrível! Alguém sabe onde encontrar o LP?</p>
							</div>
							<div className="border border-white/5 p-4 rounded text-sm bg-surface-container-low font-body-md">
								<div className="flex justify-between mb-2 border-b border-white/10 pb-1">
									<span className="text-primary">USER: Neon_Dreamer</span>
									<span className="text-on-surface-variant">DATE: 10-OCT-1994</span>
								</div>
								<p className="text-on-surface">O final me deixou sem palavras. A OMNI-CORP é a vilã perfeita para essa distopia.</p>
							</div>
							<div className="border border-white/5 p-4 rounded text-sm bg-surface-container-low font-body-md">
								<div className="flex justify-between mb-2 border-b border-white/10 pb-1">
									<span className="text-primary">USER: VHS_Collector</span>
									<span className="text-on-surface-variant">DATE: 05-OCT-1994</span>
								</div>
								<p className="text-on-surface">A qualidade da imagem nessa remasterização está excelente, mesmo mantendo o grão original.</p>
							</div>
						</div>
					</section>
				</main>
				<footer className="bg-surface-container-lowest w-full py-12 border-t border-white/10 flex flex-col items-center gap-4 px-margin-desktop shadow-[flat] relative z-10">
					<div className="font-headline-md text-primary text-2xl tracking-tighter mb-4">CINE RETRO</div>
					<div className="flex flex-wrap justify-center gap-6 mb-4">
						<a className="text-on-surface-variant hover:text-primary transition-colors font-caption text-caption opacity-80 hover:opacity-100" href="#">Termos de Uso</a>
						<a className="text-on-surface-variant hover:text-primary transition-colors font-caption text-caption opacity-80 hover:opacity-100" href="#">Privacidade</a>
						<a className="text-on-surface-variant hover:text-primary transition-colors font-caption text-caption opacity-80 hover:opacity-100" href="#">Sobre Nós</a>
						<a className="text-on-surface-variant hover:text-primary transition-colors font-caption text-caption opacity-80 hover:opacity-100" href="#">Contato</a>
					</div>
					<div className="font-caption text-caption text-on-surface-variant opacity-60">
						© 1994 CINE RETRO - Todos os direitos reservados.
					</div>
				</footer>
			</body>
		</>
	)
}