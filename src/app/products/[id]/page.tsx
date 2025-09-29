import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StockManager from '@/components/stock-manager';
import { Heart, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/product-card';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === product.imagePlaceholderId);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-[2/3] md:aspect-auto md:h-full relative overflow-hidden rounded-lg shadow-lg">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit">{product.category}</Badge>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-foreground/80 text-lg">{product.description}</p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
             <Button size="lg" className="w-full sm:w-auto flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                <ShoppingCart className="mr-2" />
                Añadir al Carrito
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Heart className="mr-2" />
                Añadir a Favoritos
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
          </div>

          <StockManager productId={product.id} initialStock={product.stock} />
        </div>
      </div>

       <div className="mt-16 md:mt-24">
        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8">También te podría gustar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
