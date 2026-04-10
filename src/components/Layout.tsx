import React from "react";
import Header from "./Header";
import Logo from "./Logo";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
      <Header />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <footer className="border-t border-border py-16 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.03),transparent_40%)]" />
        <div className="container relative z-10 flex flex-col items-center gap-8 text-center">
          <Logo className="scale-110" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-4xl pt-8 border-t border-border/50">
            <div className="flex flex-col gap-4 text-left">
              <h4 className="font-bold uppercase tracking-tighter text-sm text-foreground">Plataformas</h4>
              <nav className="flex flex-col gap-2 text-muted-foreground text-sm">
                <a href="#" className="hover:text-primary transition-colors">Amazon</a>
                <a href="#" className="hover:text-primary transition-colors">Shopee</a>
                <a href="#" className="hover:text-primary transition-colors">Mercado Livre</a>
              </nav>
            </div>
            
            <div className="flex flex-col gap-4 text-left">
              <h4 className="font-bold uppercase tracking-tighter text-sm text-foreground">Categorias</h4>
              <nav className="flex flex-col gap-2 text-muted-foreground text-sm">
                <a href="#" className="hover:text-primary transition-colors">Tecnologia</a>
                <a href="#" className="hover:text-primary transition-colors">Cozinha</a>
                <a href="#" className="hover:text-primary transition-colors">Casa</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4 text-left">
              <h4 className="font-bold uppercase tracking-tighter text-sm text-foreground">Legal</h4>
              <nav className="flex flex-col gap-2 text-muted-foreground text-sm">
                <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
                <a href="#" className="hover:text-primary transition-colors">Termos</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4 text-left">
              <h4 className="font-bold uppercase tracking-tighter text-sm text-foreground">Admin</h4>
              <nav className="flex flex-col gap-2 text-muted-foreground text-sm">
                <a href="/admin" className="hover:text-primary transition-colors">Painel Admin</a>
              </nav>
            </div>
          </div>

          <div className="pt-8 flex flex-col items-center gap-4 border-t border-border/50 w-full max-w-4xl">
            <p className="max-w-md text-sm text-muted-foreground opacity-80 leading-relaxed">
              Achados Wiiki — A sua vitrine inteligente de produtos selecionados a dedo para facilitar o seu dia a dia.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
              © {new Date().getFullYear()} Wiiki_Produtos_
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
