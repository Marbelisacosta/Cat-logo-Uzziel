'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Mis Favoritos</h1>
        <p className="mt-2 text-lg text-muted-foreground">Aquí encontrarás los artículos que más te han gustado.</p>
      </div>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-3 gap-8">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="min-h-[40vh] flex items-center justify-center border-2 border-dashed">
          <CardContent className="text-center p-8">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 font-headline text-2xl">Tu lista de favoritos está vacía</h2>
              <p className="mt-2 text-muted-foreground">Añade productos a tus favoritos para verlos aquí.</p>
              <Button asChild className="mt-6">
                <Link href="/categories">Explorar productos</Link>
              </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
