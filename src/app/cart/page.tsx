'use client';

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-headline font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8 text-lg">Parece que aún no has añadido nada a tu colección personalizada.</p>
          <Button asChild size="lg" className="w-full bg-primary text-primary-foreground">
            <Link href="/categories">Ir al Catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <h1 className="text-4xl font-headline font-bold mb-8">Mi Carrito</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const image = PlaceHolderImages.find(p => p.id === item.imagePlaceholderId);
            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    {image && (
                      <Image 
                        src={image.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline text-lg font-semibold truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Vaciar Carrito
            </Button>
            <Button asChild variant="ghost">
              <Link href="/categories">Seguir Comprando</Link>
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg">
                Finalizar Pedido
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
