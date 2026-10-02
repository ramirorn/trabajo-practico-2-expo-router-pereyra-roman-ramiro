import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { colores, espaciado, radios } from '@/tema/colores';

interface Props extends PressableProps {
  titulo: string;
  descripcion: string;
  icono: React.ComponentProps<typeof Ionicons>['name'];
}

export function TarjetaAcceso({ titulo, descripcion, icono, ...resto }: Props) {
  // DEFENSA: igual que TarjetaPlato, se usa con <Link asChild>. Reenviamos {...resto}
  // para que el onPress de Link llegue al Pressable, y el style es un objeto (no arreglo)
  // porque Expo Router no acepta arreglos de estilos en el hijo de <Slot>.
  return (
    <Pressable accessibilityRole="button" {...resto} style={styles.tarjeta}>
      {({ pressed }) => (
        <View style={[styles.contenido, pressed && styles.presionado]}>
          <View style={styles.circulo}>
            <Ionicons name={icono} size={26} color={colores.primario} />
          </View>
          <View style={styles.textos}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colores.textoSecundario} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: radios.lg,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciado.md,
    padding: espaciado.md,
  },
  presionado: {
    opacity: 0.6,
  },
  circulo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colores.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
    gap: espaciado.xs,
  },
  titulo: {
    color: colores.texto,
    fontSize: 17,
    fontWeight: '600',
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: 14,
  },
});
