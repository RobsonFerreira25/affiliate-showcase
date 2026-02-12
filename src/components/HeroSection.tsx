import { Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/30 py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(199_89%_48%/0.08),transparent_60%)]" />
      <div className="container relative z-10 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            As melhores ofertas em eletrônicos
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Tech<span className="text-primary">Ofertas</span>
          </h1>
          <p className="max-w-lg text-base text-muted-foreground md:text-lg">
            Os melhores produtos eletrônicos com preços imbatíveis. Clique e aproveite as ofertas selecionadas para você.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
