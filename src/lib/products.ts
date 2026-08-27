
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Tazas' | 'Franelas' | 'Llaveros' | 'Libretas' | 'Gorras' | 'Otros' | 'Ofertas';
  stock: number;
  description: string;
  imagePlaceholderId: string;
};

export const products: Product[] = [
  // TAZAS
  {
    id: 't1',
    name: 'Tazas Mágicas',
    price: 10.0,
    category: 'Tazas',
    stock: 50,
    description: 'Taza que cambia de color con el calor, revelando tu diseño personalizado.',
    imagePlaceholderId: 'taza-2',
  },
  {
    id: 't2',
    name: 'Tazas Glaseadas Blancas',
    price: 5.0,
    originalPrice: 7.0,
    category: 'Tazas',
    stock: 30,
    description: 'Taza con acabado glaseado elegante y minimalista.',
    imagePlaceholderId: 'taza-1',
  },
  {
    id: 't3',
    name: 'Tazas Glaseadas Base Color',
    price: 7.0,
    originalPrice: 8.5,
    category: 'Tazas',
    stock: 25,
    description: 'Taza glaseada con base de color vibrante.',
    imagePlaceholderId: 'taza-1',
  },
  {
    id: 't4',
    name: 'Tazas Blancas 6oz',
    price: 5.0,
    category: 'Tazas',
    stock: 100,
    description: 'Taza blanca clásica de tamaño pequeño.',
    imagePlaceholderId: 'taza-1',
  },
  {
    id: 't5',
    name: 'Tazas Blancas 11oz',
    price: 6.0,
    category: 'Tazas',
    stock: 150,
    description: 'Taza blanca estándar para café o té.',
    imagePlaceholderId: 'taza-1',
  },

  // FRANELAS
  {
    id: 'f1',
    name: 'Franela Unicolor Algodón',
    price: 10.0,
    category: 'Franelas',
    stock: 80,
    description: 'Franela de algodón 100% suave y fresca.',
    imagePlaceholderId: 'franela-1',
  },
  {
    id: 'f2',
    name: 'Franela Full Print Dryfit Manga Corta',
    price: 12.0,
    category: 'Franelas',
    stock: 40,
    description: 'Franela deportiva con estampado total en tela dryfit.',
    imagePlaceholderId: 'franela-2',
  },
  {
    id: 'f3',
    name: 'Franela Atlética Manga Color',
    price: 12.0,
    category: 'Franelas',
    stock: 60,
    description: 'Franela deportiva con mangas contrastantes.',
    imagePlaceholderId: 'franela-1',
  },

  // LLAVEROS
  {
    id: 'l1',
    name: 'Llavero Acero Rectangular',
    price: 3.5,
    originalPrice: 4.0,
    category: 'Llaveros',
    stock: 100,
    description: 'Llavero de acero inoxidable resistente y elegante.',
    imagePlaceholderId: 'llavero-1',
  },
  {
    id: 'l2',
    name: 'Llavero Acrílico',
    price: 1.5,
    originalPrice: 2.2,
    category: 'Llaveros',
    stock: 200,
    description: 'Llavero de acrílico personalizado, ligero y duradero.',
    imagePlaceholderId: 'llavero-1',
  },
  {
    id: 'l3',
    name: 'Llavero Doble Cara Corazón',
    price: 2.8,
    originalPrice: 3.5,
    category: 'Llaveros',
    stock: 50,
    description: 'Llavero romántico con forma de corazón y diseño por ambos lados.',
    imagePlaceholderId: 'llavero-1',
  },

  // LIBRETAS
  {
    id: 'lb1',
    name: 'Libreta Mini 10x14cm 110h',
    price: 19.0,
    category: 'Libretas',
    stock: 30,
    description: 'Libreta pequeña ideal para notas rápidas, con 110 hojas.',
    imagePlaceholderId: 'libreta-1',
  },
  {
    id: 'lb2',
    name: 'Libreta Media Carta 110h',
    price: 25.0,
    category: 'Libretas',
    stock: 20,
    description: 'Libreta de tamaño medio carta, perfecta para uso diario.',
    imagePlaceholderId: 'libreta-1',
  },
  {
    id: 'lb3',
    name: 'Libreta Carta 110h',
    price: 34.0,
    category: 'Libretas',
    stock: 15,
    description: 'Libreta de tamaño carta grande, para organización profesional.',
    imagePlaceholderId: 'libreta-1',
  },

  // OTROS
  {
    id: 'g1',
    name: 'Gorras Personalizadas',
    price: 8.0,
    category: 'Gorras',
    stock: 100,
    description: 'Gorra estilo trucker o clásica con tu diseño bordado o impreso.',
    imagePlaceholderId: 'gorra-1',
  },
  {
    id: 'm1',
    name: 'Mousepad Rectangular',
    price: 6.0,
    category: 'Otros',
    stock: 45,
    description: 'Mousepad de goma suave con base antideslizante.',
    imagePlaceholderId: 'mousepad-1',
  },
  {
    id: 'al1',
    name: 'Lámina de Aluminio A4',
    price: 14.0,
    category: 'Otros',
    stock: 20,
    description: 'Lámina metálica A4 ideal para placas o decoración.',
    imagePlaceholderId: 'mousepad-1',
  },
  {
    id: 's1',
    name: 'Stickers 3x3cm (1 Metro)',
    price: 15.0,
    category: 'Otros',
    stock: 10,
    description: 'Un metro cuadrado de stickers circulares o cuadrados de 3cm.',
    imagePlaceholderId: 'sticker-1',
  },
];

export const categories = [
    { name: 'Tazas', href: '/categories/tazas' },
    { name: 'Franelas', href: '/categories/franelas' },
    { name: 'Llaveros', href: '/categories/llaveros' },
    { name: 'Libretas', href: '/categories/libretas' },
    { name: 'Gorras', href: '/categories/gorras' },
    { name: 'Ofertas', href: '/offers' },
];

export const allProductCategories = ['Tazas', 'Franelas', 'Llaveros', 'Libretas', 'Gorras', 'Otros'] as const;
