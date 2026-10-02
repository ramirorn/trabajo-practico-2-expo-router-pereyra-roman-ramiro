import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { colores, espaciado, radios } from '@/tema/colores';

// Poner en false para ocultar la cajita de depuración en toda la app.
export const DEBUG = true;

// Muestra en qué ruta estamos: útil para entender cómo navega Expo Router.
export function DondeEstoy() {
  // Los hooks se llaman siempre, antes de cualquier return (reglas de los hooks).
  const ruta = usePathname();
  const segmentos = useSegments();
  const parametros = useLocalSearchParams();

  if (!DEBUG) {
    return null;
  }

  return (
    <View style={styles.caja}>
      <Text style={styles.texto}>ruta: {ruta}</Text>
      <Text style={styles.texto}>segmentos: {JSON.stringify(segmentos)}</Text>
      <Text style={styles.texto}>params: {JSON.stringify(parametros)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    padding: espaciado.sm,
    borderRadius: radios.sm,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  texto: {
    color: colores.textoSecundario,
    fontSize: 11,
    // iOS no conoce 'monospace'; su fuente monoespaciada es Menlo.
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
});
