import { Pressable, StyleSheet, Text } from 'react-native';

import { colores, espaciado, radios } from '@/tema/colores';

interface Props {
  titulo: string;
  onPress?: () => void;
  deshabilitado?: boolean;
  variante?: 'primario' | 'secundario';
}

export function BotonPrimario({ titulo, onPress, deshabilitado = false, variante = 'primario' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      accessibilityState={{ disabled: deshabilitado }}
      style={({ pressed }) => [
        styles.boton,
        styles[variante],
        deshabilitado && styles.deshabilitado,
        pressed && styles.presionado,
      ]}
    >
      <Text
        style={[
          styles.texto,
          variante === 'secundario' && styles.textoSecundario,
          deshabilitado && styles.textoDeshabilitado,
        ]}
      >
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 48,
    paddingVertical: espaciado.sm,
    paddingHorizontal: espaciado.md,
    borderRadius: radios.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primario: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  secundario: {
    backgroundColor: colores.superficie,
    borderColor: colores.primario,
  },
  deshabilitado: {
    backgroundColor: colores.deshabilitado,
    borderColor: colores.deshabilitado,
  },
  presionado: {
    opacity: 0.7,
  },
  texto: {
    color: colores.textoSobrePrimario,
    fontSize: 16,
    fontWeight: '600',
  },
  textoSecundario: {
    color: colores.primario,
  },
  textoDeshabilitado: {
    color: colores.textoSecundario,
  },
});
