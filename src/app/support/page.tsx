import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy } from "lucide-react";

const faqs = [
    {
        question: '¿Cómo puedo hacer un seguimiento de mi pedido?',
        answer: 'Una vez que tu pedido ha sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar este número en el sitio web del transportista para ver el estado de tu entrega.'
    },
    {
        question: '¿Cuál es su política de devoluciones?',
        answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido. Los artículos deben estar sin usar, en su estado original y con todas las etiquetas. Visita nuestra página de devoluciones para iniciar el proceso.'
    },
    {
        question: '¿Ofrecen envío internacional?',
        answer: 'Sí, realizamos envíos a la mayoría de los países. Los costos de envío y los tiempos de entrega varían según el destino. Podrás ver los detalles durante el proceso de pago.'
    },
    {
        question: '¿Cómo puedo contactar con el servicio de atención al cliente?',
        answer: 'Puedes contactarnos a través de nuestro formulario de contacto en el sitio web, o enviarnos un correo electrónico a soporte@uzziel.com. Nuestro equipo está disponible de lunes a viernes, de 9 a.m. a 6 p.m.'
    }
]

export default function SupportPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-4">
            <LifeBuoy className="w-10 h-10 text-primary" />
            Soporte Técnico
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
             <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-headline text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base">
                    {faq.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
