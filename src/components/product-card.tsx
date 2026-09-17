
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { formatVEF } from '@/lib/exchange-rate';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.imagePlaceholderId);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const isFavorite = favorites.some(p => p.id === product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(product.id);
      toast({ title: 'Eliminado de favoritos' });
    } else {
      addFavorite(product);
      toast({ title: 'Añadido a favoritos' });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.price === 0) {
      toast({
        title: 'Precio a consultar',
        description: 'Este producto requiere una cotización personalizada. Contáctanos por WhatsApp.',
      });
      return;
    }
    addToCart(product);
    toast({
      title: 'Añadido al carrito',
      description: `${product.name} ha sido agregado a tu cesta.`,
    });
  };

  const hasPrice = product.price > 0;

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5 border-none shadow-none md:border md:shadow-sm">
      <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <CardContent className="p-0 relative">
          <div className="aspect-[3/4] md:aspect-[2/3] relative rounded-lg overflow-hidden">
            {image ? (
                <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-[10px]">No Image</span>
                </div>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-1 md:p-4 flex flex-col items-start flex-1 min-w-0">
        <Link href={`/products/${product.id}`} className='w-full'>
          <h3 className="font-headline text-[10px] md:text-lg leading-tight truncate md:whitespace-normal">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center w-full mt-1">
            <div className="flex flex-col">
                {hasPrice ? (
                  <>
                    <p className="font-bold text-primary text-[10px] md:text-base leading-none">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-[7px] md:text-xs text-muted-foreground leading-none mt-0.5">
                      {formatVEF(product.price)}
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-accent text-[8px] md:text-sm leading-none italic">
                    Consultar Precio
                  </p>
                )}
                {hasPrice && product.wholesalePrice !== undefined && (
                    <div className="mt-1">
                      <p className="text-[8px] md:text-sm text-accent font-medium leading-none">
                          ${product.wholesalePrice.toFixed(2)} <span className="uppercase text-[6px] md:text-[10px]">Mayor</span>
                      </p>
                      <p className="text-[6px] md:text-[10px] text-accent/70 leading-none">
                        {formatVEF(product.wholesalePrice)}
                      </p>
                    </div>
                )}
            </div>
            <div className="flex gap-0.5 md:gap-1">
                <Button variant="ghost" size="icon" onClick={handleAddToCart} className="h-6 w-6 md:h-8 md:w-8">
                    <ShoppingCart className="h-3 w-3 md:h-5 md:w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleFavoriteClick} className="h-6 w-6 md:h-8 md:w-8">
                    <Heart className={cn("h-3 w-3 md:h-5 md:w-5 text-muted-foreground transition-colors", isFavorite ? 'text-red-500 fill-red-500' : 'hover:text-red-500')} />
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
