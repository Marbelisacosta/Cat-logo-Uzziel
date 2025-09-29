import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function AdminInventoryPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
                <Package className="w-8 h-8"/>
                Gestión de Inventario
            </h1>
            <p className="text-muted-foreground">Añade, edita y gestiona todos los productos de la tienda.</p>

            <Card className="mt-8 min-h-[60vh] flex items-center justify-center border-2 border-dashed">
                <CardContent className="text-center p-8">
                    <Package className="mx-auto h-16 w-16 text-muted-foreground" />
                    <h2 className="mt-4 font-headline text-2xl">Panel de Inventario</h2>
                    <p className="mt-2 text-muted-foreground">Esta sección está en desarrollo.</p>
                </CardContent>
            </Card>
        </div>
    )
}
