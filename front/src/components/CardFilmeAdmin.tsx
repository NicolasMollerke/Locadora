import type { FilmeType } from "../utils/FilmeType";

export function CardFilmeAdmin({ data }: { data: FilmeType }) {
  return (
    <tr className="hover:bg-surface-container transition-colors group">
      <td className="py-4 px-4 text-center">
        <div className="w-12 h-16 rounded overflow-hidden shadow-sm bg-surface-container-high mx-auto relative group-hover:scale-105 transition-transform">
          <img
            className="w-full h-full object-cover"
            data-alt="Dark neon retro sci-fi movie poster for Blade Runner style film with glowing holographic rain in dystopian 1982 Los Angeles synthwave aesthetic"
            src={data.poster}
          />
        </div>
      </td>

      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors">
            {data.titulo}
          </span>
          <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5 mt-0.5">
            <span className="">1982</span>
            <span className="">•</span>
            <span className="">{data.diretor}</span>
          </span>
        </div>
      </td>

      <td className="py-4 px-6 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-caption text-caption">
          {data.genero}
        </span>
      </td>

      <td className="py-4 px-4 text-right">
        <span className="inline-flex items-center px-2.5 py-1 rounded bg-surface-container text-primary font-label-md text-label-md font-bold">
            R$ {Number(data.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </td>
    </tr>
  );
}
