
'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BellRing } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NOTIFICATION_KEY = 'uzziel-notification-prompt';

export default function NotificationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem(NOTIFICATION_KEY);
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (active: boolean) => {
    localStorage.setItem(NOTIFICATION_KEY, 'true');
    setIsOpen(false);
    
    if (active) {
      // Simulación de activación exitosa
      toast({
        title: "¡Notificaciones Activadas!",
        description: "Ahora recibirás nuestras mejores ofertas y novedades directamente.",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <BellRing className="text-primary" />
            ¿Activar notificaciones?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Mantente al día con nuestras últimas novedades, ofertas exclusivas y mucho más en Uzziel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleAction(false)}>Quizás más tarde</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAction(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Activar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
