// Artículos de ayuda para la ruta catch-all /ayuda/[...slug].
// La "ruta" es el slug: /ayuda/pagos/efectivo -> ['pagos', 'efectivo'].
export interface ArticuloAyuda {
  ruta: string[];
  titulo: string;
  contenido: string;
}

export const ARTICULOS_AYUDA: ArticuloAyuda[] = [
  {
    ruta: ['horarios'],
    titulo: 'Horarios del comedor',
    contenido:
      'El comedor atiende de lunes a viernes. Desayuno de 7:30 a 10:00, almuerzo de 12:00 a 14:30 y el kiosco está abierto toda la jornada.',
  },
  {
    ruta: ['pagos'],
    titulo: 'Formas de pago',
    contenido:
      'Podés pagar en efectivo o con tarjeta de débito al retirar tu pedido. Elegí un tema para ver más detalles.',
  },
  {
    ruta: ['pagos', 'efectivo'],
    titulo: 'Pago en efectivo',
    contenido:
      'Pagás en la caja al retirar el pedido. Tratá de llevar el importe justo para agilizar la fila.',
  },
  {
    ruta: ['pagos', 'tarjeta'],
    titulo: 'Pago con tarjeta',
    contenido:
      'Aceptamos tarjetas de débito. Mostrá el número de tu pedido en la caja y pagá con el posnet.',
  },
  {
    ruta: ['pedidos', 'turnos'],
    titulo: 'Cómo funcionan los turnos',
    contenido:
      'Cada pedido confirmado recibe un número y entra en una cola. La cocina atiende en orden de llegada: el primero que pide es el primero que retira.',
  },
];

// Busca el artículo cuya ruta coincide con el slug, comparando ambos unidos con '/'.
export function buscarArticulo(slug: string[]): ArticuloAyuda | undefined {
  const buscado = slug.join('/');
  return ARTICULOS_AYUDA.find((articulo) => articulo.ruta.join('/') === buscado);
}
