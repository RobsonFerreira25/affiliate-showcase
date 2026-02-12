import { ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <a
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
          {product.badge}
        </span>
      )}

      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="font-display text-base font-semibold leading-tight text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {product.originalPrice}
              </span>
            )}
            <span className="font-display text-lg font-bold text-primary">
              {product.price}
            </span>
          </div>
          <span className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Ver oferta <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
