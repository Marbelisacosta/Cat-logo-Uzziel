import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'Dama' | 'Vestidos' | 'Accesorios' | 'Ofertas' | 'Hombre';
  stock: number;
  description: string;
  imagePlaceholderId: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Vestido de Verano Floral',
    price: 79.99,
    category: 'Vestidos',
    stock: 15,
    description: 'Un vestido ligero y aireado, perfecto para los días soleados. Estampado floral vibrante con un corte favorecedor.',
    imagePlaceholderId: 'p1',
  },
  {
    id: '2',
    name: 'Camisa Casual de Lino',
    price: 59.99,
    category: 'Hombre',
    stock: 25,
    description: 'Camisa de lino transpirable para hombre, ideal para un look relajado pero elegante. Disponible en varios colores.',
    imagePlaceholderId: 'p2',
  },
  {
    id: '3',
    name: 'Bolso de Mano Elegante',
    price: 120.0,
    category: 'Accesorios',
    stock: 10,
    description: 'Un bolso de mano de cuero sintético de alta calidad, con espacio suficiente para tus esenciales. Un accesorio atemporal.',
    imagePlaceholderId: 'p3',
  },
  {
    id: '4',
    name: 'Vestido de Noche "Seducción"',
    price: 150.0,
    category: 'Vestidos',
    stock: 8,
    description: 'Deslumbra en cualquier evento con este elegante vestido de noche. Corte sirena que realza la figura.',
    imagePlaceholderId: 'p4',
  },
  {
    id: '5',
    name: 'Blusa de Seda "Aurora"',
    price: 89.5,
    category: 'Dama',
    stock: 20,
    description: 'Blusa de seda suave con un brillo sutil. Perfecta para la oficina o una salida casual.',
    imagePlaceholderId: 'p5',
  },
  {
    id: '6',
    name: 'Jeans "Urban Classic"',
    price: 95.0,
    category: 'Dama',
    stock: 30,
    description: 'Jeans de corte recto y tiro alto que nunca pasan de moda. Hechos con denim de alta calidad para máxima comodidad.',
    imagePlaceholderId: 'p6',
  },
  {
    id: '7',
    name: 'Pañuelo de Seda Estampado',
    price: 45.0,
    category: 'Accesorios',
    stock: 40,
    description: 'Añade un toque de color a tu atuendo con este pañuelo de seda con un estampado artístico exclusivo.',
    imagePlaceholderId: 'p7',
  },
  {
    id: '8',
    name: 'Pantalón Chino "Explorer"',
    price: 75.0,
    category: 'Hombre',
    stock: 22,
    description: 'Pantalones chinos versátiles para hombre. Perfectos para un look casual de fin de semana o de oficina.',
    imagePlaceholderId: 'p8',
  },
  {
    id: '9',
    name: 'Falda Plisada Floral',
    price: 65.99,
    category: 'Dama',
    stock: 18,
    description: 'Falda midi plisada con un delicado estampado floral. Combínala con una blusa o un jersey.',
    imagePlaceholderId: 'p9',
  },
  {
    id: '10',
    name: 'Gafas de Sol "Aviador"',
    price: 99.99,
    category: 'Accesorios',
    stock: 12,
    description: 'Un clásico atemporal. Gafas de sol estilo aviador con montura dorada y lentes polarizadas.',
    imagePlaceholderId: 'p10',
  },
  {
    id: '11',
    name: 'Jersey de Punto Grueso',
    price: 110.0,
    category: 'Ofertas',
    stock: 5,
    description: 'Mantente abrigado con estilo. Este jersey de punto grueso es increíblemente suave y cómodo. ¡Últimas unidades!',
    imagePlaceholderId: 'p11',
  },
  {
    id: '12',
    name: 'Cinturón de Cuero Clásico',
    price: 55.0,
    category: 'Accesorios',
    stock: 35,
    description: 'Cinturón de cuero genuino con hebilla de metal pulido. Un accesorio esencial en cualquier guardarropa.',
    imagePlaceholderId: 'p12',
  },
];

export const categories = [
    { name: 'Dama', href: '/categories/dama' },
    { name: 'Vestidos', href: '/categories/vestidos' },
    { name: 'Accesorios', href: '/categories/accesorios' },
    { name: 'Favoritos', href: '/favorites' },
    { name: 'Ofertas', href: '/offers' },
]
