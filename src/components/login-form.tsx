'use client';

import { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { KeyRound, LogIn } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Cliente');
  const [key, setKey] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password, role, key });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <LogIn />
            Inicio de Sesión
        </CardTitle>
        <CardDescription>Selecciona tu rol e ingresa tus credenciales.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label>Rol</Label>
            <RadioGroup
              value={role}
              onValueChange={(value: UserRole) => setRole(value)}
              className="mt-2 grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="Cliente" id="cliente" className="peer sr-only" />
                <Label htmlFor="cliente" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  Cliente
                </Label>
              </div>
              <div>
                <RadioGroupItem value="Empleado" id="empleado" className="peer sr-only" />
                <Label htmlFor="empleado" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  Empleado
                </Label>
              </div>
              <div>
                <RadioGroupItem value="Administrador" id="admin" className="peer sr-only" />
                <Label htmlFor="admin" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  Admin
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {(role === 'Empleado' || role === 'Administrador') && (
            <div className="space-y-2">
              <Label htmlFor="key" className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Clave de Acceso
              </Label>
              <Input
                id="key"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
                placeholder={role === 'Empleado' ? 'Clave de empleado' : 'Clave de administrador'}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Ingresar
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Button variant="link" asChild className="p-0">
              <Link href="/signup">Regístrate</Link>
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
