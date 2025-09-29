import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Mi Perfil</h1>
        <p className="mt-2 text-lg text-muted-foreground">Gestiona tu información personal y tus pedidos.</p>
      </div>
      <Card className="min-h-[40vh] flex items-center justify-center border-2 border-dashed">
        <CardContent className="text-center p-8">
            <User className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 font-headline text-2xl">Función en desarrollo</h2>
            <p className="mt-2 text-muted-foreground">Inicia sesión para ver y gestionar la información de tu perfil aquí.</p>
        </CardContent>
      </Card>
    </div>
  );
}
