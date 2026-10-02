// Todos los colores de la app salen de acá.
// Contrastes de texto pensados para cumplir WCAG AA (mínimo 4.5:1).
export const colores = {
  fondo: '#FFF8F0', // crema
  superficie: '#FFFFFF', // tarjetas
  borde: '#EADBCB',
  primario: '#C2410C', // terracota: texto blanco encima = 5.2:1
  primarioSuave: '#FDE7D9',
  texto: '#2B2420', // gris casi negro
  textoSecundario: '#6B5E57',
  textoSobrePrimario: '#FFFFFF',
  exito: '#2E7D32',
  error: '#C62828',
  deshabilitado: '#DDD5CE',
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
