import type { FilmeType } from "../utils/FilmeType"

export function CardDestaque({data}: {data: FilmeType}) {
    return (
        <>
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-bottom bg-no-repeat scanlines transform scale-105"
              style={{ backgroundImage: `url(${data.banner})` }}
            ></div>
          </div>
          <div className="relative z-20 max-w-3xl flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-surface-container/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm font-caption text-caption text-secondary uppercase tracking-widest flex items-center gap-1">
                R${data.preco}
              </span>
              <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">{data.genero} • {data.ano} • {data.duracao}min</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary drop-shadow-2xl">{data.titulo}</h1>
            <p className="font-body-lg text-body-lg text-on-surface/90 max-w-2xl text-balance">
              {data.sinopse}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 font-label-md text-label-md px-8 py-4 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.4)]">
                <span className="material-symbols-outlined fill-icon">play_arrow</span>
                Alugar Fita
              </button>
            </div>
          </div>
          </>
    )
}

