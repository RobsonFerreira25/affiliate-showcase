import { ExternalLink } from "lucide-react";
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  affiliateLink: string;
  brand: string;
  platform: string;
  rating: number;
  reviews: number;
  badge?: string;
}

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
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground shadow-lg">
          {product.badge}
        </span>
      )}

      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Meta Info: Platform & Rating */}
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">
            {product.platform}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-xs text-shadow-glow">★</span>
            <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-widest text-primary/80">
            {product.brand}
          </span>
          <h3 className="font-display text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[12px] leading-snug text-muted-foreground/80 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 space-y-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-[10px] font-medium text-muted-foreground/60 line-through decoration-destructive/50">
                  De {product.originalPrice}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-primary">R$</span>
                <span className="font-display text-xl font-black tracking-tight text-foreground">
                  {product.price.replace("R$", "").trim()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-[9px] font-medium text-muted-foreground uppercase tracking-tighter">
                {product.reviews} avaliações
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-lg bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all group-hover:bg-primary/90 group-hover:shadow-[0_5px_15px_rgba(var(--primary),0.3)]">
            Ver oferta <ExternalLink className="ml-2 h-3 w-3" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
