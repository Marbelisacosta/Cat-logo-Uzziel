import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Todo Nuestro Catálogo</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explora todas las colecciones que Uzziel tiene para ti.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
