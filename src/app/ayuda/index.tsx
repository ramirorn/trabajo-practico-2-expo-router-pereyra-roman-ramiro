import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { ARTICULOS_AYUDA } from '@/data/ayuda';
import { colores, espaciado, radios } from '@/tema/colores';

export default function AyudaIndice() {
  return (
    <Pantalla scroll>
      {ARTICULOS_AYUDA.map((articulo) => (
        // El slug es un arreglo: ['pagos', 'efectivo'] -> /ayuda/pagos/efectivo
        <Link
          key={articulo.ruta.join('/')}
          href={{ pathname: '/ayuda/[...slug]', params: { slug: articulo.ruta } }}
          style={styles.enlace}
        >
          {articulo.titulo}
        </Link>
      ))}
      <Link href="/ayuda/no/existe" style={styles.enlace}>
        Probar un artículo que no existe
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  enlace: {
    color: colores.primario,
    fontSize: 16,
    fontWeight: '600',
    padding: espaciado.md,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
});
