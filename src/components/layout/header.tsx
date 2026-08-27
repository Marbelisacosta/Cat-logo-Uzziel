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
import { cn } from '@/lib/utils';

const LOGO_URL = "https://i.postimg.cc/P5wkQfNw/toda-la-gloria-sea-para-Dios-(26).png";

const NavLinks = () => (
  <>
    {categories.map((category) => (
      <Button key={category.name} asChild variant="ghost" className="text-white hover:text-primary hover:bg-white/10">
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
      <Button asChild variant="ghost" className="text-white hover:bg-white/10">
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
        <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-white/20 hover:bg-white/10">
          <Avatar className="h-full w-full">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">{userInitial}</AvatarFallback>
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/90 shadow-lg">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-40 overflow-hidden">
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

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white border-white/10">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative h-16 w-full overflow-hidden">
                    <Image 
                      src={LOGO_URL} 
                      alt="Uzziel Logo" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </Link>
                {categories.map((category) => (
                  <Link href={category.href} key={category.name} className="text-white/80 hover:text-primary transition-colors">
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
                    <div className="relative h-12 w-40 overflow-hidden">
                      <Image 
                        src={LOGO_URL} 
                        alt="Uzziel Logo" 
                        fill 
                        className="object-contain"
                      />
                    </div>
                </Link>
            </div>
            <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-6 text-sm">
                <NavLinks />
            </nav>
        </div>


        <div className="flex items-center justify-end space-x-2 flex-1">
          <Button asChild variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full border-none" variant="destructive">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Link href="/favorites">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Favoritos</span>
            </Link>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
