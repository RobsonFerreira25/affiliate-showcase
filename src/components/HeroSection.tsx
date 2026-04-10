import { Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b-2 border-primary/10 bg-black py-20 md:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Lifestyle Shopping" 
          className="h-full w-full object-cover opacity-60 scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/100 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      <div className="container relative z-10 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
          <div className="flex items-center gap-2 rounded-none border-2 border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--background)/0.8)] backdrop-blur-md px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary))] shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.2)]">
            <Zap className="h-4 w-4 fill-[hsl(var(--primary))]" />
            Achados Wiiki: Os Melhores Produtos
          </div>
          
          <div className="bg-[hsl(var(--background)/0.4)] backdrop-blur-xl border-2 border-[hsl(var(--foreground)/0.1)] p-8 md:p-12 shadow-2xl rounded-none relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[hsl(var(--primary))]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[hsl(var(--primary))]" />
            
            <h1 className="font-display text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl uppercase italic leading-[0.9]">
              Wiiki<span className="text-primary">_</span>Produtos<span className="text-primary">_</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base font-medium text-foreground md:text-xl leading-relaxed">
              Sua vitrine inteligente de achados selecionados. Produtos que resolvem o seu dia a dia com a economia que você merece.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
