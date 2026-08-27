'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Home, Package, ShoppingCart, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const LOGO_URL = "https://drive.google.com/uc?export=download&id=1Hy_cRN_4eV67LWTEa2goVdbbQe_FN8z4";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && (!user || user.role !== 'Administrador')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'Administrador') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/inventory', label: 'Inventario', icon: Package },
    { href: '/admin/billing', label: 'Facturación', icon: ShoppingCart },
    { href: '/admin/users', label: 'Usuarios', icon: Users },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 border-r bg-card hidden md:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold font-headline">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image 
                  src={LOGO_URL} 
                  alt="Uzziel Logo" 
                  fill 
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span>Admin Panel</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-2">
            <ul className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/90">{children}</main>
    </div>
  );
}
