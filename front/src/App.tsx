import { CardFilme } from "./components/CardFilme";
import Cabecalho from "./components/Cabecalho";
import { useEffect } from "react";
import { useClienteStore } from "./context/ClienteContext"
import { useFilmesStore } from "./context/FilmeContext"; 


const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const filmes = useFilmesStore((state) => state.filmes)
  const setFilmes = useFilmesStore((state) => state.setFilmes)
  const { logaCliente } = useClienteStore()  

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/filmes`)
      const dados = await response.json()
//      console.log(dados)
      setFilmes(dados)
    }
    buscaDados()

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/clientes/${id}`)
      const dados = await response.json()
      logaCliente(dados)
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey")
      buscaCliente(idCliente as string)
    }    
  }, [])

  const listaFilmes = filmes.map( filme => (
    <CardFilme data={filme} key={filme.id} />
  ))

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen">
      <Cabecalho/>
      <main className="w-full pt-20">
        <section className="relative w-full h-[819px] min-h-[600px] flex items-end pb-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scanlines transform scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUiJ3g7MxV8mRkk626u0PhgwvtGL97S0IqIuo_CNPH3erY5Eaef7b5fJ2wt6qBsaAy7fWGbn811f0W_w5RxDy-A1YkhsQaWIY5kY4f9M_Lg2cl205nW4nQsDWW5j8PTZzbgzphLwB2TEgZpFHynrIsa2VYWvrYhrrx788IR3XjjzPCx8ULKk_TKXgzcT97Vna2R5ep09AzJlWaMT9Q0bdXcR_M8QWhwYQ5aVQN7BycfXXhFhh9c84-')" }}></div>
          </div>
          <div className="relative z-20 max-w-3xl flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-surface-container/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm font-caption text-caption text-secondary uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">4k</span> Remasterizado
              </span>
              <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">Sci-Fi • 1982 • 1h 57m</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary drop-shadow-2xl">LÂMINA CORREDORA</h1>
            <p className="font-body-lg text-body-lg text-on-surface/90 max-w-2xl text-balance">
              Em uma metrópole distópica e encharcada de neon, um ex-policial é forçado a voltar à ativa para caçar e 'aposentar' quatro replicantes perigosos que se infiltraram na Terra. Um marco visual absoluto.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 font-label-md text-label-md px-8 py-4 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                <span className="material-symbols-outlined fill-icon">play_arrow</span>
                Alugar Fita
              </button>
              <button className="bg-surface-container/50 backdrop-blur-xl border border-white/20 text-on-surface hover:bg-surface-container font-label-md text-label-md px-8 py-4 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <span className="material-symbols-outlined">add</span>
                Minha Lista
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
            Catálogo de Filmes
            <span className="material-symbols-outlined text-primary text-xl">local_movies</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {listaFilmes}
          </div>
        </section>
      </main>
      <footer className="w-full py-12 bg-surface-container-lowest border-t border-white/10 flex flex-col items-center gap-4 px-margin-mobile md:px-margin-desktop mt-12">
        <div className="font-headline-md text-headline-md text-primary tracking-tighter">CINE RETRO</div>
        <div className="flex flex-wrap justify-center gap-6 font-caption text-caption">
          <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Termos de Uso</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacidade</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Sobre Nós</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Contato</a>
        </div>
        <p className="font-caption text-caption text-on-surface-variant/60 mt-4">© 1994 CINE RETRO - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}