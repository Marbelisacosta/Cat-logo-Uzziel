import ProductCard from "@/components/product-card";
import { allProductCategories, products } from "@/lib/products";
import { Info } from "lucide-react";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = decodeURIComponent(params.slug);
  const capitalizedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  
  const isValidCategory = allProductCategories.some(cat => cat.toLowerCase() === categoryName.toLowerCase());

  if (!isValidCategory) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());

  return (
    <div className="container mx-auto py-8 md:py-12 px-2 md:px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl md:text-5xl font-bold">{capitalizedCategory}</h1>
        <p className="mt-2 text-sm md:text-lg text-muted-foreground">Explora nuestra colección de {capitalizedCategory}.</p>
        <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-primary/20">
          <Info className="w-4 h-4" />
          Todos los artículos al mayor son a partir de 6 piezas
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 md:gap-8">
            {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="font-headline text-2xl">No hay productos en esta categoría</h2>
            <p className="text-muted-foreground mt-2">Vuelve pronto para ver nuevos artículos.</p>
        </div>
      )}
    </div>
  );
}
