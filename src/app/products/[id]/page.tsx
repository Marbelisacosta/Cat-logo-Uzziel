
'use client';

import React from 'react';
import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StockManager from '@/components/stock-manager';
import { Heart, ShoppingCart, Tag } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { useFavorites } from '@/hooks/use-favorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();

  if (!product) {
    notFound();
  }
  
  const isFavorite = favorites.some(p => p.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(product.id);
      toast({ title: 'Eliminado de favoritos' });
    } else {
      addFavorite(product);
      toast({ title: 'Añadido a favoritos' });
    }
  };

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
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg space-y-2 border border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Precio Detal:</span>
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>
            {product.wholesalePrice !== undefined && (
              <div className="flex items-center gap-2 border-t pt-2 mt-2">
                <Tag className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Precio al Mayor:</span>
                <p className="text-2xl font-bold text-accent">${product.wholesalePrice.toFixed(2)}</p>
              </div>
            )}
          </div>

          <p className="mt-6 text-foreground/80 text-lg">{product.description}</p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
             <Button size="lg" className="w-full sm:w-auto flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                <ShoppingCart className="mr-2" />
                Añadir al Carrito
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleFavoriteClick}>
                <Heart className={cn("mr-2", isFavorite && 'text-red-500 fill-red-500')} />
                {isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
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
