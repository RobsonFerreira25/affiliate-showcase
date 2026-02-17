import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Zap, CreditCard } from "lucide-react";

const BANNERS = [
    {
        title: "QPA — Quem Procura Acha",
        subtitle: "Sua central de achados imbatíveis. Onde o preço baixo encontra a oportunidade real.",
        cta: "Explorar Ofertas",
        bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=600&fit=crop",
        color: "from-blue-600/60 to-black/90",
        platform: "Destaque"
    },
    {
        title: "Especial Amazon Prime",
        subtitle: "Tecnologia, Casa e muito mais com os melhores preços do Brasil.",
        cta: "Ver na Amazon",
        bgImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&h=600&fit=crop",
        color: "from-orange-500/60 to-black/90",
        platform: "Amazon"
    },
    {
        title: "Mercado Livre Full",
        subtitle: "Entrega amanhã nos produtos selecionados. Compra 100% garantida.",
        cta: "Explorar ML",
        bgImage: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=1600&h=600&fit=crop",
        color: "from-yellow-500/60 to-black/90",
        platform: "Mercado Livre"
    },
    {
        title: "Pechinchas da Shopee",
        subtitle: "Economize de verdade com cupons de frete grátis e ofertas relâmpago.",
        cta: "Ver na Shopee",
        bgImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&h=600&fit=crop",
        color: "from-red-600/60 to-black/90",
        platform: "Shopee"
    },
];

export function BannerCarousel({ onSelectPlatform }: { onSelectPlatform: (platform: string) => void }) {
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 6000);

        return () => clearInterval(interval);
    }, [api]);

    return (
        <div className="w-full">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {BANNERS.map((banner, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 shadow-3xl bg-black">
                                {/* Background Image with dynamic parallax-like effect */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out hover:scale-110 opacity-70"
                                    style={{ backgroundImage: `url(${banner.bgImage})` }}
                                />
                                {/* Rich Gradient Overlays */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${banner.color}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="relative z-10 flex h-full flex-col justify-center p-8 md:p-16 lg:p-24">
                                    <div className="space-y-6 max-w-3xl">
                                        {/* Status Badge */}
                                        <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-2.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white backdrop-blur-2xl border border-white/20 shadow-xl">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                            </span>
                                            {banner.platform} EXCLUSIVO
                                        </div>

                                        {/* Headline */}
                                        <h2 className="font-display text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-8xl drop-shadow-2xl">
                                            {banner.title.split(' ').map((word, i) => (
                                                <span key={i} className={word === 'QPA' ? 'text-primary' : ''}>
                                                    {word}{' '}
                                                </span>
                                            ))}
                                        </h2>

                                        {/* Subheadline */}
                                        <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed max-w-xl drop-shadow-lg">
                                            {banner.subtitle}
                                        </p>

                                        {/* Interaction Area */}
                                        <div className="flex flex-wrap gap-5 pt-8">
                                            <Button
                                                size="lg"
                                                className="h-16 rounded-[1.25rem] px-10 font-black text-lg shadow-[0_10px_40px_rgba(var(--primary),0.4)] transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90"
                                                onClick={() => onSelectPlatform(banner.platform === "Destaque" ? "Todos" : banner.platform)}
                                            >
                                                {banner.cta}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="h-16 rounded-[1.25rem] px-10 font-bold border-white/30 bg-white/5 text-white backdrop-blur-xl hover:bg-white/20 transition-all border-2"
                                            >
                                                Ver Todos
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Graphic Elements (Glassmorphism) */}
                                <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
                                    <div className="h-32 w-32 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 rotate-12 flex items-center justify-center">
                                        <Zap className="h-16 w-16 text-white" />
                                    </div>
                                    <div className="h-24 w-24 rounded-2xl bg-primary/10 backdrop-blur-2xl border border-white/5 -rotate-12 self-end flex items-center justify-center">
                                        <ShoppingBag className="h-10 w-10 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Modern Navigation */}
                <div className="absolute bottom-10 right-10 md:bottom-16 md:right-24 flex gap-4 z-30">
                    <CarouselPrevious className="static h-14 w-14 translate-y-0 bg-black/40 border-white/10 text-white hover:bg-primary hover:border-primary backdrop-blur-2xl rounded-2xl transition-all hover:scale-110 active:scale-90" />
                    <CarouselNext className="static h-14 w-14 translate-y-0 bg-black/40 border-white/10 text-white hover:bg-primary hover:border-primary backdrop-blur-2xl rounded-2xl transition-all hover:scale-110 active:scale-90" />
                </div>
            </Carousel>
        </div>
    );
}
