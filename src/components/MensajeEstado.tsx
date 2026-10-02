import { StyleSheet, Text, View } from 'react-native';

import { colores, espaciado } from '@/tema/colores';

interface Props {
  mensaje: string;
  tipo?: 'info' | 'error';
}

// Para listas vacías o errores (ej. "No hay pedidos todavía").
export function MensajeEstado({ mensaje, tipo = 'info' }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={[styles.texto, tipo === 'error' && styles.textoError]}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaciado.lg,
  },
  texto: {
    color: colores.textoSecundario,
    fontSize: 16,
    textAlign: 'center',
  },
  textoError: {
    color: colores.error,
    fontWeight: '600',
  },
});
