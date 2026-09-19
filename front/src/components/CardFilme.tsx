import { Link } from "react-router-dom"
import type { FilmeType } from "../utils/FilmeType"

export function CardFilme({data}: {data: FilmeType}) {
    return (
        <div className="snap-start shrink-0 w-40 md:w-56 group cursor-pointer">
            <Link to={`/detalhes/${data.id}`}>
                <div className="aspect-[2/3] w-full rounded-lg overflow-hidden relative shadow-lg shadow-black/50 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out border border-white/5 group-hover:border-white/20">
                    {/* Etiqueta de Preço */}
                    <div className="absolute top-2 right-2 z-20 bg-primary-container/90 backdrop-blur-md px-2 py-0.5 rounded shadow-md border border-white/20 text-[10px] font-bold text-on-primary-container tracking-wider uppercase">
                        R$ {Number(data.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img className="w-full h-full object-cover" data-alt={data.titulo} src={data.poster}/>
                </div>
            </Link>
            <div className="mt-3">
                <h3 className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary transition-colors">{data.titulo}</h3>
                <p className="font-caption text-caption text-on-surface-variant truncate">{data.genero} • {data.ano}</p>
            </div>
        </div>
    )
}