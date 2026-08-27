
import ProductCard from "@/components/product-card";
import { allProductCategories, products } from "@/lib/products";
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
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{capitalizedCategory}</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explora nuestra colección de {capitalizedCategory}.</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
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
