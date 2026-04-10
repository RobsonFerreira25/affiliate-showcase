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
      className="group relative flex flex-col overflow-hidden rounded-none border-2 border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {product.badge && (
        <span className="absolute left-0 top-3 z-10 rounded-none bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
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
          <span className="rounded-none bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter text-muted-foreground border border-border/50">
            {product.platform}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-primary text-xs">★</span>
            <span className="text-[11px] font-bold text-foreground">{product.rating}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
            {product.brand}
          </span>
          <h3 className="font-display text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary line-clamp-2 uppercase italic tracking-tighter">
            {product.name}
          </h3>
          <p className="text-[12px] leading-snug text-muted-foreground/80 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Action only */}
        <div className="mt-4 pt-4 border-t-2 border-border/10 flex flex-col gap-3">
          <div className="flex items-center justify-center rounded-none bg-primary py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all group-hover:bg-primary/90 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none">
            Ver oferta <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </div>
          <div className="text-center">
            <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              {product.reviews} avaliações verificadas
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
