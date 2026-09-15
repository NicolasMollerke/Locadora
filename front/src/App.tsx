import { CardFilme } from "./components/CardFilme";
import Cabecalho from "./components/Cabecalho";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext"
import { useFilmesStore } from "./context/FilmeContext"; 
import { CardDestaque } from "./components/CardDestaque";


const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export default function App() {
  const filmes = useFilmesStore((state) => state.filmes)
  const setFilmes = useFilmesStore((state) => state.setFilmes)
  const { logaCliente } = useClienteStore()  
  const [filmeSorteado, setFilmeSorteado] = useState<any | null>(null);
  
  useEffect(() => {
  async function buscaDados() {
    try {
      const response = await fetch(`${apiUrl}/filmes`);
      const dados = await response.json();
      
      setFilmes(dados);

      const destaques = dados.filter((filme: any) => filme.destaque === true);
      if (destaques.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * destaques.length);
        setFilmeSorteado(destaques[indiceAleatorio]);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }
  
  buscaDados();

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

  const listaFilmesDestaque = filmes
    .filter(filme => filme.destaque === true) 
    .filter(filme => filmeSorteado ? filme.id !== filmeSorteado.id : true) 
    .map(filme => (
      <CardFilme data={filme} key={filme.id} />
  ));


  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen">
      <Cabecalho/>
      <main className="w-full pt-20">
        <section className="relative w-full h-[500px] min-h-[500px] flex items-end pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden">
          {filmeSorteado && (
            <CardDestaque data={filmeSorteado} key={filmeSorteado.id} />
          )} 
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