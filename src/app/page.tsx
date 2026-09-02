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
      <section className="relative w-full h-[50vh] md:h-[80vh] text-white">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4 max-w-4xl mx-auto">
          <h1 className="font-headline text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Tu Estilo, Tu Sello Único
          </h1>
          <p className="mt-4 md:mt-6 max-w-2xl text-sm md:text-2xl font-light">
            No solo vendemos productos, creamos piezas que cuentan tu historia. Personaliza tus tazas, franelas y accesorios con la esencia de Uzziel.
          </p>
          <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-headline text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto">
              <Link href="/categories">Ver Catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-20">
        <div className="container mx-auto px-2 md:px-4">
          <PersonalizedSuggestions />
          
          <div className="flex flex-col items-center mb-8 md:mb-12">
            <h2 className="font-headline text-2xl md:text-5xl font-bold text-center">
              Nuestras Creaciones
            </h2>
            <div className="w-16 md:w-24 h-1 bg-primary mt-2 md:mt-4 rounded-full"></div>
            <p className="text-muted-foreground mt-3 md:mt-4 text-center max-w-xl text-xs md:text-base px-4">
              Echa un vistazo a los artículos más populares listos para ser personalizados a tu gusto.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
