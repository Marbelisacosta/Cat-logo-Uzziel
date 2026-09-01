
'use client';

import React, { useState } from 'react';
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash2, MapPin, Store, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatVEF, EXCHANGE_RATE } from '@/lib/exchange-rate';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [deliveryMethod, setDeliveryMethod] = useState<'envio' | 'retiro'>('retiro');
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [notes, setNotes] = useState('');

  const STORE_MAPS_LINK = "https://maps.app.goo.gl/N6CYgmywPW7CX75V8?g_st=aw";
  const WHATSAPP_NUMBER = "584143683914"; // Formato internacional para Venezuela 04143683914

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Tu navegador no soporta geolocalización.",
        variant: "destructive",
      });
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGettingLocation(false);
        toast({
          title: "Ubicación obtenida",
          description: "Tu ubicación ha sido guardada para la cotización del envío.",
        });
      },
      (error) => {
        console.error(error);
        setIsGettingLocation(false);
        toast({
          title: "Error",
          description: "No se pudo obtener la ubicación. Por favor, actívala en tu navegador.",
          variant: "destructive",
        });
      }
    );
  };

  const handleFinalizeOrder = () => {
    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} (${formatVEF(item.price * item.quantity)})`).join('\n');
    
    let message = `*Hola Uzziel! Quiero realizar el siguiente pedido:*\n\n`;
    message += `*Productos:*\n${itemsList}\n\n`;
    message += `*Subtotal:* $${cartTotal.toFixed(2)} / ${formatVEF(cartTotal)}\n`;
    message += `*Tasa BCV:* ${EXCHANGE_RATE.toLocaleString('es-VE')} Bs.\n\n`;
    message += `*Método de entrega:* ${deliveryMethod === 'envio' ? '🚚 Envío a domicilio (Por cotizar costo)' : '🏠 Retiro en sede'}\n`;
    
    if (deliveryMethod === 'envio' && location) {
      message += `*Ubicación para envío:* https://www.google.com/maps?q=${location.lat},${location.lng}\n`;
    } else if (deliveryMethod === 'retiro') {
      message += `*Sede de retiro:* Maracaibo (Uzziel Sublimación)\n`;
    }

    if (notes) {
      message += `\n*Notas adicionales:* ${notes}\n`;
    }

    message += `\n*Nota:* Entiendo que el costo del envío no está incluido y será cotizado en este chat. El pago en Bolívares se calculará a la tasa BCV del día del pago.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

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
      <h1 className="text-4xl font-headline font-bold mb-8 text-center md:text-left">Mi Carrito</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Items Section */}
          <div className="space-y-4">
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
                      <div className="mt-1">
                        <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{formatVEF(item.price)}</p>
                      </div>
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
          </div>

          {/* Delivery Options */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Método de entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup 
                value={deliveryMethod} 
                onValueChange={(val: 'envio' | 'retiro') => setDeliveryMethod(val)}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="retiro" id="retiro" className="peer sr-only" />
                  <Label 
                    htmlFor="retiro" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer h-full"
                  >
                    <Store className="mb-2 h-6 w-6" />
                    <span className="font-bold text-center">Retiro en Sede</span>
                    <span className="text-[10px] text-muted-foreground mt-1 text-center">Maracaibo (Sin costo adicional)</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="envio" id="envio" className="peer sr-only" />
                  <Label 
                    htmlFor="envio" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer h-full"
                  >
                    <MapPin className="mb-2 h-6 w-6" />
                    <span className="font-bold text-center">Envío a Domicilio</span>
                    <span className="text-[10px] text-muted-foreground mt-1 text-center">Costo adicional según ubicación</span>
                  </Label>
                </div>
              </RadioGroup>

              {deliveryMethod === 'retiro' && (
                <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                  <Store className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Ubicación de la Sede:</p>
                    <p className="text-sm text-muted-foreground mb-2">Estamos ubicados en Maracaibo. Puedes ver el mapa aquí:</p>
                    <Link 
                      href={STORE_MAPS_LINK} 
                      target="_blank" 
                      className="text-primary hover:underline text-sm font-bold flex items-center gap-1"
                    >
                      Abrir en Google Maps <Send className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {deliveryMethod === 'envio' && (
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-3 text-center">
                      Para cotizar el costo del envío, por favor envía tu ubicación:
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary/10"
                      onClick={handleGetLocation}
                      disabled={isGettingLocation}
                    >
                      {isGettingLocation ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Obteniendo ubicación...
                        </>
                      ) : (
                        <>
                          <MapPin className="mr-2 h-4 w-4" />
                          {location ? 'Ubicación Obtenida ✓' : 'Enviar Mi Ubicación Actual'}
                        </>
                      )}
                    </Button>
                    {location && (
                      <p className="text-[10px] text-center text-muted-foreground mt-2">
                        Coordenadas: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notas o solicitudes especiales</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Ej: El estampado debe ser en color dorado, es para un regalo..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={clearCart}>
              Vaciar Carrito
            </Button>
            <Button asChild variant="ghost">
              <Link href="/categories">Seguir Comprando</Link>
            </Button>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Productos ($)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total (Bs. BCV)</span>
                <span className="font-bold">{formatVEF(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-primary font-medium">
                  {deliveryMethod === 'retiro' ? 'N/A (Retiro)' : 'Por cotizar'}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col items-end">
                <div className="flex justify-between w-full text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-1">
                  ≈ {formatVEF(cartTotal)}
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                * La tasa BCV utilizada es de {EXCHANGE_RATE.toLocaleString('es-VE')} Bs. El costo del envío se sumará una vez cotizado.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleFinalizeOrder}
                className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] py-6 text-lg flex items-center justify-center gap-2"
              >
                <Image 
                  src="https://www.svgrepo.com/show/303158/whatsapp-logo.svg" 
                  alt="WA" 
                  width={24} 
                  height={24} 
                  className="invert brightness-0"
                />
                Pedir por WhatsApp
              </Button>
            </CardFooter>
            <p className="text-[10px] text-center text-muted-foreground pb-4 px-4">
              Al hacer clic, serás redirigido a WhatsApp para concretar el pago y la entrega con nuestro equipo.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
