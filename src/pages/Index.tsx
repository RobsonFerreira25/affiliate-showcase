import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  original_price?: string;
  image_url: string;
  category: string;
  affiliate_link: string;
  brand: string;
  platform?: string;
  rating: number;
  reviews: number;
}

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

      return data.map((p: Product) => ({
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
    const platformMatch = platform === "Todos" || (p as any).platform === platform;
    return categoryMatch && platformMatch;
  });
  return (
    <>
      <HeroSection />
      
      <main id="products" className="mx-auto w-full max-w-[2000px] px-4 sm:px-6 lg:px-10 py-10 md:py-16">
        <div id="categories" className="mb-12 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Plataformas</h2>
            <div className="flex flex-wrap gap-3">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex items-center gap-2 rounded-none border-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.15)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${platform === p
                    ? "border-primary bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)]"
                    : "border-border bg-card hover:border-primary/40"
                    }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Categorias</h2>
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="py-20 text-center text-destructive border-2 border-destructive/20 bg-destructive/5 p-8">
            Erro ao carregar achados. Tente novamente mais tarde.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mb-12">
              {filtered.map((product: any, i: number) => (
                <ProductCard key={(product as any).id} product={product as any} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-24 text-center border-2 border-dashed border-border p-12 bg-card/50">
                <p className="text-xl font-bold text-muted-foreground uppercase tracking-tight">
                  Nenhum achado encontrado para os filtros selecionados.
                </p>
                <button
                  onClick={() => { setCategory("Todos"); setPlatform("Todos"); }}
                  className="mt-6 text-primary hover:underline font-bold uppercase text-sm tracking-widest"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Index;
