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
      <section className="relative w-full h-[60vh] md:h-[85vh] text-white">
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
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4 max-w-5xl mx-auto">
          <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-lg">
            Tu Estilo, Tu Sello Único
          </h1>
          <p className="mt-6 md:mt-8 max-w-3xl text-base md:text-2xl font-light drop-shadow-md">
            Transformamos tus ideas en piezas tangibles que cuentan tu historia. Especialistas en sublimación, estampado y diseño personalizado para ti y tu negocio.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-headline text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 w-full sm:w-auto shadow-xl">
              <Link href="/categories">Explorar Catálogo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 font-headline text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 w-full sm:w-auto shadow-xl">
              <Link href="/support">Contáctanos</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <PersonalizedSuggestions />
          
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <h2 className="font-headline text-3xl md:text-6xl font-bold text-center">
              Nuestras Creaciones
            </h2>
            <div className="w-20 md:w-32 h-1.5 bg-primary mt-4 md:mt-6 rounded-full"></div>
            <p className="text-muted-foreground mt-4 md:mt-6 text-center max-w-2xl text-sm md:text-lg px-4">
              Descubre nuestra selección de artículos populares, listos para ser personalizados con tu toque único y la calidad de Uzziel.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8">
            {products.slice(0, 9).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link href="/categories">Ver todo el catálogo</Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
