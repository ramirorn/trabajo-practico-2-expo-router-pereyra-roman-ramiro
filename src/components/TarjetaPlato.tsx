import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { colores, espaciado, radios } from '@/tema/colores';

interface Props extends PressableProps {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export function TarjetaPlato({ nombre, descripcion, precio, imagen, ...resto }: Props) {
  // DEFENSA: la tarjeta se usa dentro de <Link href=... asChild>. Link le pasa al hijo
  // el onPress (y el ref) que hacen la navegación; por eso reenviamos {...resto} al Pressable.
  return (
    <Pressable
      accessibilityRole="button"
      {...resto}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionado]}
    >
      <Image
        source={imagen}
        style={styles.imagen}
        contentFit="cover"
        transition={200}
        accessibilityLabel={nombre}
      />
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
    // Franja verde institucional a la izquierda.
    borderLeftWidth: 4,
    borderLeftColor: colores.acento,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciado.md,
    padding: espaciado.md,
  },
  presionado: {
    opacity: 0.6,
  },
  imagen: {
    width: 56,
    height: 56,
    borderRadius: radios.sm,
    backgroundColor: colores.primarioSuave,
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
