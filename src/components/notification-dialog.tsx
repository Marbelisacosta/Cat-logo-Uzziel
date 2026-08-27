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

const NOTIFICATION_KEY = 'uzziel-notification-prompt';

export default function NotificationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem(NOTIFICATION_KEY);
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = () => {
    localStorage.setItem(NOTIFICATION_KEY, 'true');
    setIsOpen(false);
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
          <AlertDialogCancel onClick={handleAction}>Quizás más tarde</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Activar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
