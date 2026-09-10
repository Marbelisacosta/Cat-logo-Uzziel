import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LifeBuoy, MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: '¿Cómo puedo hacer un seguimiento de mi pedido?',
        answer: 'Una vez que realices tu pedido vía WhatsApp, nuestro equipo te mantendrá informado sobre el estado de producción y envío directamente por ese canal.'
    },
    {
        question: '¿Cuál es su política de personalización?',
        answer: '¡El diseño es totalmente GRATIS! Trabajamos contigo hasta que el diseño sea de tu agrado antes de proceder a la impresión o estampado.'
    },
    {
        question: '¿Ofrecen ventas al mayor?',
        answer: 'Sí, ofrecemos precios especiales al mayor a partir de 6 piezas del mismo tipo. Puedes consultar los precios en la descripción de cada producto.'
    },
    {
        question: '¿Hacen envíos a nivel nacional?',
        answer: 'Sí, realizamos envíos a toda Venezuela. El costo del envío se cotiza según la ubicación y la empresa de encomiendas de tu preferencia.'
    }
]

export default function SupportPage() {
  const WHATSAPP_NUMBER = "584143683914";
  const STORE_MAPS_LINK = "https://maps.app.goo.gl/FgGExvwqLBafBano9";

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <LifeBuoy className="w-10 h-10 text-primary" />
            Atención al Cliente
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Estamos aquí para ayudarte con tus diseños y pedidos.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-full text-primary">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">WhatsApp Directo</h3>
                <p className="text-sm text-muted-foreground">La forma más rápida de contactarnos.</p>
              </div>
            </div>
            <p className="text-2xl font-bold mb-4">+58 414-3683914</p>
            <Button asChild className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank">
                Escribir ahora
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/20 rounded-full text-accent">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Nuestra Sede</h3>
                <p className="text-sm text-muted-foreground">Visítanos en Maracaibo.</p>
              </div>
            </div>
            <p className="text-sm mb-4">Sector Indio Mara, Maracaibo, Estado Zulia.</p>
            <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
              <Link href={STORE_MAPS_LINK} target="_blank">
                Ver en Google Maps
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="font-headline text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
               <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                  </AccordionContent>
              </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center pt-8 border-t">
        <div className="flex flex-col items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <p className="font-medium">Correo Electrónico</p>
          <p className="text-sm text-muted-foreground">contacto@uzziel.com</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <p className="font-medium">Horario de Atención</p>
          <p className="text-sm text-muted-foreground">Lun - Vie: 8:00 AM - 6:00 PM</p>
          <p className="text-sm text-muted-foreground">Sáb: 9:00 AM - 2:00 PM</p>
        </div>
      </div>
    </div>
  );
}
