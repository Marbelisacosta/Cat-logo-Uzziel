import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/product-card';
import PersonalizedSuggestions from '@/components/personalized-suggestions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] md:h-[70vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Estilo que te Define
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Descubre las últimas tendencias y encuentra tu look perfecto en Click Shop.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-headline">
            <Link href="/categories">Explorar Colección</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <PersonalizedSuggestions />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">
            Novedades
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="font-headline border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/categories">Ver Todo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
