// Paleta institucional del Instituto Politécnico Formosa (tomada del logo).
// Todos los colores de la app salen de acá.
// Contrastes de texto pensados para cumplir WCAG AA (mínimo 4.5:1).
export const colores = {
  fondo: '#F6F1E4', // crema del escudo
  superficie: '#FFFFFF', // tarjetas
  borde: '#DDD6C3',
  primario: '#224444', // verde petróleo del escudo: texto blanco encima = 10.6:1
  primarioSuave: '#E2ECE4',
  acento: '#1E8C45', // verde brillante de las letras "IPF": solo para íconos y detalles, no para texto
  texto: '#2E2E2E', // gris oscuro del nombre del instituto
  textoSecundario: '#5A5F5C',
  textoSobrePrimario: '#FFFFFF',
  exito: '#1B7A3A',
  error: '#B3261E',
  deshabilitado: '#D9D6CC',
} as const;

// Escala de espacios basada en múltiplos de 4.
export const espaciado = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radios = {
  sm: 6,
  md: 12,
  lg: 20,
} as const;
