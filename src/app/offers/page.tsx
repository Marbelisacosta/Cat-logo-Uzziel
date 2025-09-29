import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { Tag } from "lucide-react";

export default function OffersPage() {
    const offerProducts = products.filter(p => p.category === 'Ofertas');

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <Tag className="w-10 h-10 text-accent" />
            Ofertas Especiales
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Aprovecha nuestros descuentos por tiempo limitado.</p>
      </div>

      {offerProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
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
