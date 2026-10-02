import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { buscarArticulo } from '@/data/ayuda';
import { colores } from '@/tema/colores';

export default function ArticuloAyuda() {
  // DEFENSA: [...slug] es una ruta "catch-all": atrapa uno o más segmentos.
  // /ayuda/pagos/efectivo llega como slug = ['pagos', 'efectivo'].
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const articulo = buscarArticulo(slug);

  return (
    <Pantalla scroll>
      <Text style={styles.slug}>slug: {JSON.stringify(slug)}</Text>
      {articulo === undefined ? (
        <MensajeEstado mensaje="No encontramos ese artículo de ayuda." tipo="error" />
      ) : (
        <>
          <Stack.Screen options={{ title: articulo.titulo }} />
          <Text style={styles.titulo}>{articulo.titulo}</Text>
          <Text style={styles.contenido}>{articulo.contenido}</Text>
        </>
      )}
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  slug: {
    color: colores.textoSecundario,
  },
  titulo: {
    color: colores.texto,
    fontSize: 22,
    fontWeight: '700',
  },
  contenido: {
    color: colores.texto,
    fontSize: 16,
    lineHeight: 24,
  },
});
