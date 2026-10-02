import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { colores, espaciado, radios } from '@/tema/colores';

interface Props extends PressableProps {
  nombre: string;
  descripcion: string;
  precio: number;
}

export function TarjetaPlato({ nombre, descripcion, precio, ...resto }: Props) {
  // DEFENSA: la tarjeta se usa dentro de <Link href=... asChild>. Link le pasa al hijo
  // el onPress (y el ref) que hacen la navegación; por eso reenviamos {...resto} al Pressable.
  return (
    <Pressable
      accessibilityRole="button"
      {...resto}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionado]}
    >
      <View style={styles.textos}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={1}>
          {descripcion}
        </Text>
      </View>
      <Text style={styles.precio}>$ {precio.toLocaleString('es-AR')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciado.md,
    padding: espaciado.md,
  },
  presionado: {
    opacity: 0.6,
  },
  textos: {
    flex: 1,
    gap: espaciado.xs,
  },
  nombre: {
    color: colores.texto,
    fontSize: 17,
    fontWeight: '600',
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: 14,
  },
  precio: {
    color: colores.primario,
    fontSize: 17,
    fontWeight: '700',
  },
});
