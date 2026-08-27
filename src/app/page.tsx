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
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
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
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Tu Estilo, Tu Sello Único
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-2xl font-light">
            No solo vendemos productos, creamos piezas que cuentan tu historia. Personaliza tus tazas, franelas y accesorios con la esencia de Uzziel.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-headline text-lg px-8 py-6">
              <Link href="/categories">Diseñar mi Estilo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-headline text-lg px-8 py-6">
              <Link href="/categories">Ver Catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <PersonalizedSuggestions />
          
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-center">
              Nuestras Creaciones
            </h2>
            <div className="w-24 h-1 bg-primary mt-4 rounded-full"></div>
            <p className="text-muted-foreground mt-4 text-center max-w-xl">
              Echa un vistazo a los artículos más populares listos para ser personalizados a tu gusto.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {products.slice(0, 9).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="font-headline border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10">
              <Link href="/categories">Explorar Todas las Categorías</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
