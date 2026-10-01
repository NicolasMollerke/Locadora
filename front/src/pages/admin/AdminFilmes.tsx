import { CardFilmeAdmin } from "../../components/CardFilmeAdmin";
import { useEffect } from "react";
import { useFilmesStore } from "../../context/FilmeContext";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "https://locadora-32js.onrender.com";

export default function AdminFilmes() {
  const filmes = useFilmesStore((state) => state.filmes);
  const setFilmes = useFilmesStore((state) => state.setFilmes);

  useEffect(() => {
    async function buscaDados() {
      try {
        const response = await fetch(`${apiUrl}/filmes`);
        const dados = await response.json();

        setFilmes(dados);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    buscaDados();
  }, []);

  const listaFilmes = filmes.map((filme) => (
    <CardFilmeAdmin data={filme} key={filme.id} />
  ));

  return (
    <main className="w-full min-w-0 bg-background min-h-screen px-margin-tablet lg:px-margin-desktop py-gutter">
      <div className="flex flex-col w-full space-y-8">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-6 lg:p-8 shadow-md">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
          <div className="absolute right-1/3 -bottom-24 w-64 h-64 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Gestão do Acervo de Filmes
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to={`/admin/cadastroFilme`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md transition-all hover:brightness-110 shadow-md shadow-primary-container/20"
                id="btnOpenNewModal"
              >
                <span className="material-symbols-outlined text-[20px]">add_box</span>
                <span className="">+ Cadastrar Novo Filme / Fita</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full min-w-0 bg-surface-container-low rounded-xl shadow-md overflow-hidden">
          <table className="w-full table-fixed text-left text-on-surface">
            <thead className="bg-surface-container-lowest text-on-surface-variant uppercase text-caption font-caption tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-24 text-center" scope="col">
                  Capa
                </th>
                <th className="py-3.5 px-6" scope="col">
                  Filme &amp; Ano
                </th>
                <th className="py-3.5 px-6 text-center" scope="col">
                  Gênero
                </th>
                <th className="py-3.5 px-4 text-right" scope="col">
                  Preço
                </th>
              </tr>
            </thead>

            <tbody className="divide-y-0 text-body-md font-body-md">
              {listaFilmes}
            </tbody>
          </table>
          </div>
      </div>
    </main>
  );
}