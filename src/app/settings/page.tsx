import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Configuración</h1>
        <p className="mt-2 text-lg text-muted-foreground">Personaliza tu experiencia en Uzziel.</p>
      </div>
      <Card className="min-h-[40vh] flex items-center justify-center border-2 border-dashed">
        <CardContent className="text-center p-8">
            <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 font-headline text-2xl">Opciones</h2>
            <p className="mt-2 text-muted-foreground">Aquí podrás cambiar el idioma, el tema y las preferencias de notificación muy pronto.</p>
        </CardContent>
      </Card>
    </div>
  );
}
