import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.imagePlaceholderId);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
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
        <CardFooter className="p-4 flex flex-col items-start flex-1">
          <h3 className="font-headline text-lg leading-tight flex-1">{product.name}</h3>
          <p className="font-semibold text-primary mt-2">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
