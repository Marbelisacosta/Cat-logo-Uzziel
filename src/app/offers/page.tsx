import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { Tag, Info, Sparkles } from "lucide-react";

export default function OffersPage() {
    const offerProducts = products.filter(p => p.category === 'Ofertas');

  return (
    <div className="container mx-auto py-8 md:py-12 px-2 md:px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Tag className="w-6 h-6 md:w-10 md:h-10 text-accent" />
            Ofertas Especiales
        </h1>
        <p className="mt-2 text-sm md:text-lg text-muted-foreground">Aprovecha nuestros descuentos por tiempo limitado.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-primary/20">
            <Info className="w-4 h-4" />
            Ventas al mayor a partir de 6 piezas
          </div>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-accent/20">
            <Sparkles className="w-4 h-4" />
            ¡El diseño de tu artículo es GRATIS!
          </div>
        </div>
      </div>

      {offerProducts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 md:gap-8">
            {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="font-headline text-2xl">No hay ofertas disponibles</h2>
            <p className="text-muted-foreground mt-2">Vuelve pronto para ver nuevos descuentos.</p>
        </div>
      )}
    </div>
  );
}
