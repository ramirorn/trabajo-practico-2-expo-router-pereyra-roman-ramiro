import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colores, espaciado } from '@/tema/colores';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Contenedor base: todas las pantallas comparten fondo y márgenes.
export function Pantalla({ children, scroll = false, style }: Props) {
  if (scroll) {
    return (
      <ScrollView style={styles.fondo} contentContainerStyle={[styles.contenido, style]}>
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.fondo, styles.contenido, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: espaciado.md,
    gap: espaciado.md,
  },
});
