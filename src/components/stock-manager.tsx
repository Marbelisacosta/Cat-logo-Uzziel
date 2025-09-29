'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { PackageCheck } from 'lucide-react';

interface StockManagerProps {
  productId: string;
  initialStock: number;
}

export default function StockManager({ productId, initialStock }: StockManagerProps) {
  const { user } = useAuth();
  const [stock, setStock] = useState(initialStock);
  const [newStock, setNewStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (user?.role !== 'Empleado' && user?.role !== 'Administrador') {
    return null;
  }

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedStock = parseInt(newStock, 10);
      if (!isNaN(updatedStock)) {
        setStock(updatedStock);
        toast({
          title: 'Stock Actualizado',
          description: `El stock del producto ${productId} ha sido actualizado a ${updatedStock}.`,
        });
        setNewStock('');
      } else {
        toast({
          title: 'Error',
          description: 'Por favor ingresa un número válido.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="mt-8 bg-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <PackageCheck />
          Gestionar Stock
        </CardTitle>
        <CardDescription>Actualizar el inventario para este producto.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Stock actual: <span className="font-bold text-lg">{stock}</span> unidades
        </p>
        <form onSubmit={handleUpdateStock} className="flex items-center gap-4">
          <Input
            type="number"
            placeholder="Nuevo stock"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            className="max-w-xs"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
