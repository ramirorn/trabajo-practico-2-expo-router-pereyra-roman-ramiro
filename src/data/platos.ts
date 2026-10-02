export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export const CATEGORIAS: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

// Nombre para mostrar en pantalla de cada categoría.
export const NOMBRES_CATEGORIA: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

export const PLATOS: Plato[] = [
  // Desayuno
  { id: 1, nombre: 'Chipá (6 unidades)', precio: 1500, descripcion: 'Chipá casero recién horneado, con queso.', categoria: 'desayuno' },
  { id: 2, nombre: 'Mate cocido con leche', precio: 900, descripcion: 'Taza grande de mate cocido con leche.', categoria: 'desayuno' },
  { id: 3, nombre: 'Tostado de jamón y queso', precio: 2500, descripcion: 'Pan de miga tostado con jamón y queso.', categoria: 'desayuno' },
  { id: 4, nombre: 'Medialunas (3 unidades)', precio: 1200, descripcion: 'Medialunas de manteca.', categoria: 'desayuno' },
  // Almuerzo
  { id: 5, nombre: 'Milanesa con puré', precio: 5500, descripcion: 'Milanesa de carne con puré de papas.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Empanadas de carne (3 unidades)', precio: 3600, descripcion: 'Empanadas al horno de carne cortada a cuchillo.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Sopa paraguaya', precio: 2800, descripcion: 'Porción de sopa paraguaya con queso y cebolla.', categoria: 'almuerzo' },
  { id: 8, nombre: 'Guiso de arroz', precio: 4000, descripcion: 'Guiso casero de arroz con carne y verduras.', categoria: 'almuerzo' },
  // Bebidas
  { id: 9, nombre: 'Gaseosa 500 ml', precio: 1500, descripcion: 'Gaseosa de línea, bien fría.', categoria: 'bebidas' },
  { id: 10, nombre: 'Agua mineral 500 ml', precio: 1000, descripcion: 'Agua mineral sin gas.', categoria: 'bebidas' },
  { id: 11, nombre: 'Jugo de naranja', precio: 1800, descripcion: 'Jugo de naranja exprimido.', categoria: 'bebidas' },
  { id: 12, nombre: 'Tereré preparado', precio: 1300, descripcion: 'Jarra de tereré con yuyos y jugo.', categoria: 'bebidas' },
  // Kiosco
  { id: 13, nombre: 'Alfajor triple', precio: 1100, descripcion: 'Alfajor de chocolate relleno de dulce de leche.', categoria: 'kiosco' },
  { id: 14, nombre: 'Barra de cereal', precio: 700, descripcion: 'Barra de cereal con frutas.', categoria: 'kiosco' },
  { id: 15, nombre: 'Papas fritas chicas', precio: 1400, descripcion: 'Paquete chico de papas fritas.', categoria: 'kiosco' },
  { id: 16, nombre: 'Turrón de maní', precio: 500, descripcion: 'Turrón de maní clásico.', categoria: 'kiosco' },
];

// DEFENSA: es un "type guard". Si devuelve true, TypeScript sabe que el texto es una Categoria.
// Sirve para validar el parámetro que llega por la URL en la ruta dinámica.
export function esCategoriaValida(texto: string): texto is Categoria {
  return (CATEGORIAS as string[]).includes(texto);
}

export function buscarPlatoPorId(id: number): Plato | undefined {
  return PLATOS.find((plato) => plato.id === id);
}

export function platosPorCategoria(categoria: Categoria): Plato[] {
  return PLATOS.filter((plato) => plato.categoria === categoria);
}
