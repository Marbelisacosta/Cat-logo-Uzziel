
'use client';

import React from 'react';
import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StockManager from '@/components/stock-manager';
import { Heart, ShoppingCart, Tag, Info } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { useFavorites } from '@/hooks/use-favorites';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatVEF } from '@/lib/exchange-rate';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    notFound();
  }
  
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(product.id);
      toast({ title: 'Eliminado de favoritos' });
    } else {
      addFavorite(product);
      toast({ title: 'Añadido a favoritos' });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Añadido al carrito',
      description: `${product.name} ha sido agregado a tu cesta.`,
    });
  };

  const image = PlaceHolderImages.find((p) => p.id === product.imagePlaceholderId);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-[2/3] md:aspect-auto md:h-[600px] relative overflow-hidden rounded-lg shadow-lg bg-muted">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Tag className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit">{product.category}</Badge>
          <h1 className="font-headline text-3xl md:text-5xl font-bold mt-4">{product.name}</h1>
          
          <div className="mt-8 p-6 bg-muted/30 rounded-xl space-y-4 border border-border/50">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Precio Detal</span>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <p className="text-lg text-muted-foreground font-medium">{formatVEF(product.price)}</p>
              </div>
            </div>
            {product.wholesalePrice !== undefined && (
              <div className="flex flex-col border-t border-border/30 pt-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Precio al Mayor</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold text-accent">${product.wholesalePrice.toFixed(2)}</p>
                  <p className="text-base text-accent/80 font-medium">{formatVEF(product.wholesalePrice)}</p>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground bg-accent/5 p-2 rounded border border-accent/10">
                  <Info className="w-3.5 h-3.5 text-accent" />
                  <span>Todos los artículos al mayor son a partir de 6 piezas</span>
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 text-foreground/80 text-xl leading-relaxed">{product.description}</p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
             <Button size="lg" className="w-full sm:w-auto flex-1 bg-accent text-accent-foreground hover:bg-accent/90 py-8 text-lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-3 h-6 w-6" />
                Añadir al Carrito
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto py-8 text-lg" onClick={handleFavoriteClick}>
                <Heart className={cn("mr-3 h-6 w-6", favorite && 'text-red-500 fill-red-500')} />
                {favorite ? 'En Favoritos' : 'Favoritos'}
            </Button>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <div className={cn("h-2 w-2 rounded-full", product.stock > 0 ? "bg-green-500" : "bg-red-500")} />
            {product.stock > 0 ? 'Disponible' : 'Agotado temporalmente'}
          </div>

          <StockManager productId={product.id} initialStock={product.stock} />
        </div>
      </div>

       <div className="mt-20">
        <h2 className="font-headline text-3xl font-bold mb-10 text-center md:text-left">También te podría gustar</h2>
        <div className="grid grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
