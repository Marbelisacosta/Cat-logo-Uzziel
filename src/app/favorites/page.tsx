import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Mis Favoritos</h1>
        <p className="mt-2 text-lg text-muted-foreground">Aquí encontrarás los artículos que más te han gustado.</p>
      </div>
      <Card className="min-h-[40vh] flex items-center justify-center border-2 border-dashed">
        <CardContent className="text-center p-8">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 font-headline text-2xl">Tu lista de favoritos está vacía</h2>
            <p className="mt-2 text-muted-foreground">Añade productos a tus favoritos para verlos aquí.</p>
        </CardContent>
      </Card>
    </div>
  );
}
