'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, LogIn, LogOut, Menu, Settings, ShoppingCart, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { categories } from '@/lib/products';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const LOGO_URL = "https://i.postimg.cc/Z5pwD8Vd/LOGO-VECTOR-FINAL-UZZIEL-SIN-FONDO-DORADO-(1).png";

const NavLinks = () => (
  <>
    {categories.map((category) => (
      <Button key={category.name} asChild variant="ghost">
        <Link href={category.href} className="text-sm font-medium">
          {category.name}
        </Link>
      </Button>
    ))}
  </>
);

const UserMenu = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Button asChild variant="ghost">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Link>
        </DropdownMenuItem>
        {user.role === 'Administrador' && (
            <DropdownMenuItem asChild>
                <Link href="/admin">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Admin
                </Link>
            </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default function Header() {
  const isMobile = useIsMobile();
  const { cartCount } = useCart();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image 
                src={LOGO_URL} 
                alt="Uzziel Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-bold font-headline text-xl">Uzziel</span>
          </Link>
        </div>

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image 
                      src={LOGO_URL} 
                      alt="Uzziel Logo" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <span>Uzziel</span>
                </Link>
                {categories.map((category) => (
                  <Link href={category.href} key={category.name} className="hover:text-foreground">
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}
        
        <div className="flex w-full items-center justify-between md:justify-center">
            <div className="md:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image 
                        src={LOGO_URL} 
                        alt="Uzziel Logo" 
                        fill 
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold font-headline text-lg">Uzziel</span>
                </Link>
            </div>
            <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
                <NavLinks />
            </nav>
        </div>


        <div className="flex items-center justify-end space-x-2 flex-1">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full" variant="destructive">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favoritos</span>
            </Link>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
