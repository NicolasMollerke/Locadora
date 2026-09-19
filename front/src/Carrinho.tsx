import { useClienteStore } from "./context/ClienteContext"
import { CardFilmeCarrinho } from "./components/CardFilmeCarrinho";


export default function Carrinho() {
    const { cliente } = useClienteStore()

  const filmes = cliente?.carrinho?.filmes || []

  const listaFilmes = filmes.map((filme) => (
    <CardFilmeCarrinho data={filme} key={filme.id} />
  )) 


  return (
    <main className="w-full pt-20 bg-background">
      <div className="flex flex-col w-full">
        <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin-desktop pt-8 pb-6 bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-caption text-caption mb-3">
                <a className="hover:text-primary transition-colors" data-path="home" href="#">Home</a>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-on-surface font-semibold">Cesta de Fitas</span>
              </nav>
              <div className="flex items-baseline gap-3">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight uppercase font-extrabold">
                  Cesta de <span className="text-primary-container">Locação</span>
                </h1>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-caption text-caption uppercase tracking-wider">
                  3 fitas reservadas
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                Reserva garantida por <strong className="text-on-surface font-semibold">14:59 min</strong>
              </span>
            </div>
          </div>
        </section>

        <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8 md:py-12 bg-background">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Column: Cart VHS Items (~65% -> 8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Cart Table Header (Desktop visual cue) */}
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 text-on-surface-variant font-caption text-caption uppercase tracking-wider">
                <span className="col-span-6">Título &amp; Fita VHS</span>
                <span className="col-span-3 text-center">Dias de Empréstimo</span>
                <span className="col-span-3 text-right">Valor</span>
              </div>
              {listaFilmes}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-container-low shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary-container">
                  <span className="material-symbols-outlined text-[24px]">replay_10</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wide flex items-center gap-2">
                    Lembrete da Locadora: Seja Gentil, Rebobine!
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Fita entregue não rebobinada acarreta taxa simbólica de <strong className="text-on-surface">R$ 2,00 por rolo</strong> adicionada à sua ficha de sócio. Evite multas no balcão e cuide do cabeçote do seu videocassete!
                  </p>
                </div>
              </div>

              {/* Coupon Card / Member Voucher Form */}
              <div className="p-6 rounded-xl bg-surface-container shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md font-bold text-on-surface block">Ficha de Sócio ou Cupom Retro</span>
                    <span className="font-caption text-caption text-on-surface-variant">Insira o código impresso no verso da sua carteirinha</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <input className="h-11 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-high w-full sm:w-48 transition-all" placeholder="EX: SOCIO-OURO-94" type="text" value="OURO1994" />
                  <button className="h-11 px-5 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md uppercase transition-colors whitespace-nowrap" type="button">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <a className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors py-2" data-path="filmes" href="#">
                  <span className="material-symbols-outlined text-[18px]">west</span>
                  <span>Continuar Explorando as Prateleiras</span>
                </a>
                <button className="text-outline hover:text-primary-container font-caption text-caption transition-colors flex items-center gap-1" type="button">
                  <span className="material-symbols-outlined text-[16px]">clear_all</span>
                  <span>Esvaziar Cesta de Fitas</span>
                </button>
              </div>
            </div>

            {/* Secondary Column: Order Summary (~35% -> 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
              {/* Summary Receipt Card */}
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container shadow-xl flex flex-col gap-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight uppercase font-bold">
                    Resumo da Ficha
                  </h3>
                  <span className="font-caption text-caption text-secondary uppercase tracking-widest font-mono">#PED-1994-082</span>
                </div>

                {/* Price Ledger Breakdown */}
                <div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
                  <div className="flex items-center justify-between">
                    <span>Subtotal (3 fitas VHS)</span>
                    <span className="text-on-surface font-semibold">R$ 43,40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span>Entrega Motoboy Retrô</span>
                      <span className="material-symbols-outlined text-outline text-[16px]" title="Entrega em maleta térmica com proteção contra umidade">info</span>
                    </div>
                    <span className="text-on-surface font-semibold">R$ 8,00</span>
                  </div>
                  <div className="flex items-center justify-between text-secondary">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Desconto Sócio Ouro</span>
                    </div>
                    <span className="font-semibold">- R$ 5,00</span>
                  </div>
                  <div className="flex items-center justify-between text-caption text-on-surface-variant">
                    <span>Taxa de Rebobinamento</span>
                    <span className="text-on-surface uppercase font-mono">Inclusa grátis</span>
                  </div>
                </div>

                {/* Divider using background shift */}
                <div className="w-full h-px bg-surface-container-highest"></div>

                {/* Total & Deadline Display */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">Total a Pagar</span>
                    <div className="flex flex-col items-end">
                      <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-extrabold leading-none tracking-tight">R$ 46,40</span>
                      <span className="font-caption text-caption text-on-surface-variant mt-1">Ou 2x de R$ 23,20 sem juros</span>
                    </div>
                  </div>

                  {/* Return Deadline Cardlet */}
                  <div className="mt-4 p-3.5 rounded-xl bg-surface-container-low flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">Prazo de Devolução</span>
                      <span className="font-label-md text-label-md text-on-surface font-bold">Segunda-feira, até às 19:00</span>
                    </div>
                  </div>
                </div>

                {/* Main Call to Action: Rent / Checkout */}
                <button className="w-full h-14 rounded-xl bg-primary-container hover:bg-inverse-primary active:scale-[0.99] text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary-container/20 transition-all" type="button">
                  <span className="material-symbols-outlined text-[22px]">shopping_cart_checkout</span>
                  <span>Confirmar Locação e Entrega</span>
                </button>

                {/* Guarantees & Nostalgic Trust Seals */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption">
                    <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                    <span>Garantia de fita limpa: teste em 24h ou troca imediata</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption">
                    <span className="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
                    <span>Entregador retira no seu endereço após o período</span>
                  </div>
                </div>

                {/* Payment Methods Footer Inside Summary */}
                <div className="pt-4 border-t border-surface-container-highest flex flex-col gap-2">
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider text-center">
                    Formas de Pagamento Aceitas
                  </span>
                  <div className="flex items-center justify-center gap-3 text-on-surface-variant">
                    <span className="px-2.5 py-1 rounded bg-surface-container-lowest font-caption text-caption font-semibold uppercase">Pix Instantâneo</span>
                    <span className="px-2.5 py-1 rounded bg-surface-container-lowest font-caption text-caption font-semibold uppercase">Cartão de Crédito</span>
                    <span className="px-2.5 py-1 rounded bg-surface-container-lowest font-caption text-caption font-semibold uppercase">Carnê Sócio</span>
                  </div>
                </div>
              </div>

              {/* Secondary Informational Card: Club Tier */}
              <div className="p-5 rounded-xl bg-surface-container-low shadow-sm flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">stars</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Você está acumulando 30 Pontos Retro</span>
                  <p className="font-caption text-caption text-on-surface-variant mt-0.5">Com mais 20 pontos você ganha uma locação grátis de fita lançamento no próximo final de semana.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}