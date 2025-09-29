'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.imagePlaceholderId);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
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

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0 relative">
          <div className="aspect-[2/3] relative">
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
                    <span className="text-muted-foreground text-sm">No Image</span>
                </div>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex flex-col items-start flex-1">
        <Link href={`/products/${product.id}`} className='flex-1'>
          <h3 className="font-headline text-lg leading-tight">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center w-full mt-2">
            <p className="font-semibold text-primary">${product.price.toFixed(2)}</p>
            <Button variant="ghost" size="icon" onClick={handleFavoriteClick}>
                <Heart className={cn("h-5 w-5 text-muted-foreground transition-colors", isFavorite ? 'text-red-500 fill-red-500' : 'hover:text-red-500')} />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
