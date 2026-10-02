export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
  imagen: string; // URL de la foto del plato
}

export const CATEGORIAS: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

// Nombre para mostrar en pantalla de cada categoría.
export const NOMBRES_CATEGORIA: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

// Imágenes de Wikimedia Commons (licencias libres), cargadas por URL.
export const PLATOS: Plato[] = [
  // Desayuno
  { id: 1, nombre: 'Chipá (6 unidades)', precio: 1500, descripcion: 'Chipá casero recién horneado, con queso.', categoria: 'desayuno',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chipa_Paraguay.jpg/330px-Chipa_Paraguay.jpg' },
  { id: 2, nombre: 'Mate cocido con leche', precio: 900, descripcion: 'Taza grande de mate cocido con leche.', categoria: 'desayuno',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mate_cocido_with_rosquita.jpg/330px-Mate_cocido_with_rosquita.jpg' },
  { id: 3, nombre: 'Tostado de jamón y queso', precio: 2500, descripcion: 'Pan de miga tostado con jamón y queso.', categoria: 'desayuno',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Un_Cafe_y_un_sandwich_mixto.jpg/330px-Un_Cafe_y_un_sandwich_mixto.jpg' },
  { id: 4, nombre: 'Medialunas (3 unidades)', precio: 1200, descripcion: 'Medialunas de manteca.', categoria: 'desayuno',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2018_01_Croissant_IMG_0685.JPG/330px-2018_01_Croissant_IMG_0685.JPG' },
  // Almuerzo
  { id: 5, nombre: 'Milanesa con puré', precio: 5500, descripcion: 'Milanesa de carne con puré de papas.', categoria: 'almuerzo',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Milanesa_con_pur%C3%A9_de_papas.jpg/330px-Milanesa_con_pur%C3%A9_de_papas.jpg' },
  { id: 6, nombre: 'Empanadas de carne (3 unidades)', precio: 3600, descripcion: 'Empanadas al horno de carne cortada a cuchillo.', categoria: 'almuerzo',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Empanadas_argentinas_de_carne_premium_hechas_al_horno.jpg/330px-Empanadas_argentinas_de_carne_premium_hechas_al_horno.jpg' },
  { id: 7, nombre: 'Sopa paraguaya', precio: 2800, descripcion: 'Porción de sopa paraguaya con queso y cebolla.', categoria: 'almuerzo',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Sopa_Paraguaya_2.jpg/330px-Sopa_Paraguaya_2.jpg' },
  { id: 8, nombre: 'Guiso de arroz', precio: 4000, descripcion: 'Guiso casero de arroz con carne y verduras.', categoria: 'almuerzo',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Guiso_argentino_de_arroz_con_carne_vacuna_servido_en_plato.jpg/330px-Guiso_argentino_de_arroz_con_carne_vacuna_servido_en_plato.jpg' },
  // Bebidas
  { id: 9, nombre: 'Gaseosa 500 ml', precio: 1500, descripcion: 'Gaseosa de línea, bien fría.', categoria: 'bebidas',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Tumbler_of_cola_with_ice.jpg/330px-Tumbler_of_cola_with_ice.jpg' },
  { id: 10, nombre: 'Agua mineral 500 ml', precio: 1000, descripcion: 'Agua mineral sin gas.', categoria: 'bebidas',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Stilles_Mineralwasser.jpg' },
  { id: 11, nombre: 'Jugo de naranja', precio: 1800, descripcion: 'Jugo de naranja exprimido.', categoria: 'bebidas',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Orangejuice.jpg/330px-Orangejuice.jpg' },
  { id: 12, nombre: 'Tereré preparado', precio: 1300, descripcion: 'Jarra de tereré con yuyos y jugo.', categoria: 'bebidas',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Terer%C3%A9.jpg/330px-Terer%C3%A9.jpg' },
  // Kiosco
  { id: 13, nombre: 'Alfajor triple', precio: 1100, descripcion: 'Alfajor de chocolate relleno de dulce de leche.', categoria: 'kiosco',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Alfajor_chocolate_y_dulce_de_leche.jpg/330px-Alfajor_chocolate_y_dulce_de_leche.jpg' },
  { id: 14, nombre: 'Barra de cereal', precio: 700, descripcion: 'Barra de cereal con frutas.', categoria: 'kiosco',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Granola_bar_food_products.jpg/330px-Granola_bar_food_products.jpg' },
  { id: 15, nombre: 'Papas fritas chicas', precio: 1400, descripcion: 'Paquete chico de papas fritas.', categoria: 'kiosco',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Potato-Chips.jpg/330px-Potato-Chips.jpg' },
  { id: 16, nombre: 'Turrón de maní', precio: 500, descripcion: 'Turrón de maní clásico.', categoria: 'kiosco',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Turr%C3%B3n_de_man%C3%AD_Arcor.jpg/330px-Turr%C3%B3n_de_man%C3%AD_Arcor.jpg' },
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
