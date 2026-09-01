
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, LogOut, Settings, ShoppingCart, User as UserIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { categories } from '@/lib/products';
import { EXCHANGE_RATE } from '@/lib/exchange-rate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '@/components/ui/badge';

const LOGO_URL = "https://i.postimg.cc/P5wkQfNw/toda-la-gloria-sea-para-Dios-(26).png";

const NavLinks = () => (
  <>
    {categories.map((category) => (
      <Button key={category.name} asChild variant="ghost" className="text-white hover:text-primary hover:bg-white/10 px-2 md:px-3 h-8 md:h-10">
        <Link href={category.href} className="text-[10px] md:text-sm font-medium whitespace-nowrap">
          {category.name}
        </Link>
      </Button>
    ))}
  </>
);

const UserMenu = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-7 w-7 md:h-9 md:w-9 rounded-full border border-white/20 hover:bg-white/10">
          <Avatar className="h-full w-full">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">{userInitial}</AvatarFallback>
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
  const { cartCount } = useCart();
  
  return (
    <div className="flex flex-col w-full sticky top-0 z-50 shadow-lg">
      <div className="w-full bg-primary text-primary-foreground py-1 px-4 flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold tracking-wider">
        <RefreshCw className="w-3 h-3 animate-spin-slow" />
        TASA BCV EURO: {EXCHANGE_RATE.toLocaleString('es-VE')} Bs.
      </div>
      <header className="w-full border-b border-white/10 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/90 overflow-hidden">
        <div className="container flex h-14 md:h-16 items-center px-2 md:px-4">
          <div className="flex-shrink-0 mr-2 md:mr-4">
            <Link href="/" className="flex items-center">
              <div className="relative h-6 w-16 md:h-8 md:w-28 overflow-hidden">
                <Image 
                  src={LOGO_URL} 
                  alt="Uzziel Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto no-scrollbar">
              <nav className="flex items-center justify-center gap-0 md:gap-1">
                  <NavLinks />
              </nav>
          </div>

          <div className="flex items-center justify-end space-x-0.5 md:space-x-1 flex-shrink-0 ml-2 md:ml-4">
            <Button asChild variant="ghost" size="icon" className="relative text-white hover:bg-white/10 h-8 w-8">
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 flex items-center justify-center p-0 text-[7px] rounded-full border-none" variant="destructive">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Carrito</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8">
              <Link href="/favorites">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Favoritos</span>
              </Link>
            </Button>
            <UserMenu />
          </div>
        </div>
      </header>
    </div>
  );
}
