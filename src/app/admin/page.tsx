import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Package, Users, Banknote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const adminCards = [
    { 
        title: "Gestionar Inventario",
        description: "Actualizar stock, añadir nuevos productos y gestionar categorías.",
        icon: Package,
        href: "/admin/inventory",
        imageId: "admin-inventory"
    },
    { 
        title: "Facturación y Caja",
        description: "Ver historial de ventas, gestionar facturas y tasas de cambio.",
        icon: Banknote,
        href: "/admin/billing",
        imageId: "admin-billing"
    },
    { 
        title: "Gestión de Usuarios",
        description: "Administrar roles y permisos de clientes, empleados y otros admins.",
        icon: Users,
        href: "/admin/users",
        imageId: "admin-users"
    },
]

export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl font-bold">Panel de Administrador</h1>
            <p className="text-muted-foreground">Bienvenido al centro de control de Uzziel.</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {adminCards.map(card => {
                    const image = PlaceHolderImages.find(p => p.id === card.imageId);
                    return (
                    <Link href={card.href} key={card.title} className="group">
                        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            {image && (
                                <div className="relative aspect-video">
                                <Image 
                                    src={image.imageUrl} 
                                    alt={card.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={image.imageHint}
                                />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-headline">
                                    <card.icon className="w-5 h-5 text-primary" />
                                    {card.title}
                                </CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )})}
            </div>
        </div>
    )
}
