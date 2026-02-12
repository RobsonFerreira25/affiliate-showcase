import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { products } from "@/data/products";

const Index = () => {
  const [category, setCategory] = useState("Todos");

  const filtered = category === "Todos"
    ? products
    : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="container py-10">
        <div className="mb-8">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container">
          © {new Date().getFullYear()} TechOfertas — Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
