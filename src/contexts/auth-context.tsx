'use client';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'Cliente' | 'Empleado' | 'Administrador';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  heightCm?: number;
  gender?: 'male' | 'female' | 'other';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => void;
  signup: (data: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EMPLOYEE_KEY = 'empleadovip2024';
const ADMIN_KEY = 'superadmin2024';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('click-shop-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('click-shop-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (data: any) => {
    let userData: User | null = null;
    if (data.role === 'Cliente') {
      userData = { name: 'Usuario Cliente', email: data.email, role: 'Cliente' };
    } else if (data.role === 'Empleado') {
      if (data.key !== EMPLOYEE_KEY) {
        toast({
          title: 'Error de Autenticación',
          description: 'La clave de empleado es incorrecta.',
          variant: 'destructive',
        });
        return;
      }
      userData = { name: 'Empleado VIP', email: data.email, role: 'Empleado' };
    } else if (data.role === 'Administrador') {
      if (data.key !== ADMIN_KEY) {
        toast({
          title: 'Error de Autenticación',
          description: 'La clave de administrador es incorrecta.',
          variant: 'destructive',
        });
        return;
      }
      userData = { name: 'Super Admin', email: data.email, role: 'Administrador' };
    }
    
    if (userData) {
      setUser(userData);
      localStorage.setItem('click-shop-user', JSON.stringify(userData));
      toast({
        title: `Bienvenido, ${userData.name}!`,
        description: `Has iniciado sesión como ${userData.role}.`,
      });
      if (userData.role === 'Administrador') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };
  
  const signup = (data: any) => {
    const newUser: User = {
      name: data.name,
      email: data.email,
      role: 'Cliente',
      heightCm: data.heightCm,
      gender: data.gender,
    };
    setUser(newUser);
    localStorage.setItem('click-shop-user', JSON.stringify(newUser));
    toast({
        title: `Bienvenido, ${newUser.name}!`,
        description: 'Tu cuenta ha sido creada con éxito.',
    });
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('click-shop-user');
    toast({
        title: 'Sesión Cerrada',
        description: 'Has cerrado sesión exitosamente.',
    });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
