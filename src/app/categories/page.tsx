import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { Info, Sparkles } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-2 md:px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl md:text-5xl font-bold">Todo Nuestro Catálogo</h1>
        <p className="mt-2 text-sm md:text-lg text-muted-foreground">Explora todas las colecciones que Uzziel tiene para ti.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-primary/20">
            <Info className="w-4 h-4" />
            Ventas al mayor a partir de 6 piezas
          </div>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-accent/20">
            <Sparkles className="w-4 h-4" />
            ¡Diseños totalmente GRATIS en todos tus artículos!
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
