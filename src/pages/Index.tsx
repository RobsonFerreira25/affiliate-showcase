import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, ShoppingBag } from "lucide-react";
import { BannerCarousel } from "@/components/BannerCarousel";

const PLATFORMS = ["Todos", "Amazon", "Mercado Livre", "Shopee"];

const Index = () => {
  const [category, setCategory] = useState("Todos");
  const [platform, setPlatform] = useState("Todos");

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        originalPrice: p.original_price,
        image: p.image_url,
        category: p.category,
        affiliateLink: p.affiliate_link,
        brand: p.brand,
        platform: p.platform || "Amazon",
        rating: p.rating,
        reviews: p.reviews,
        badge: p.rating >= 4.9 ? "Destaque" : null
      }));
    },
  });

  const filtered = products.filter((p: any) => {
    const categoryMatch = category === "Todos" || p.category === category;
    const platformMatch = platform === "Todos" || p.platform === platform;
    return categoryMatch && platformMatch;
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-[2000px] px-4 sm:px-6 lg:px-10 py-6 md:py-10">
        <section className="mb-8 md:mb-12">
          <BannerCarousel onSelectPlatform={setPlatform} />
        </section>

        <div className="mb-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Plataformas</h2>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${platform === p
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                    : "border-border bg-card hover:border-primary/40"
                    }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Categorias</h2>
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="py-20 text-center text-destructive">
            Erro ao carregar achados. Tente novamente mais tarde.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {filtered.map((product: any, i: number) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-xl font-medium text-muted-foreground">
                  Nenhum achado encontrado para os filtros selecionados.
                </p>
                <button
                  onClick={() => { setCategory("Todos"); setPlatform("Todos"); }}
                  className="mt-4 text-primary hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <div className="container">
          <p className="font-display text-lg font-bold text-foreground mb-2">QPA — Quem Procura Acha</p>
          © {new Date().getFullYear()} — Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
