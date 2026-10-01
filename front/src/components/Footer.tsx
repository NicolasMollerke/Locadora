export default function Footer() {

    return (
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
    )
}