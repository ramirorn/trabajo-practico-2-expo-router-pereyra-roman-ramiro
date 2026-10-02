import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado } from '@/tema/colores';
import { estiloHeader } from '@/tema/navegacion';

export default function LayoutCocina() {
  const { cerrarSesion } = useComedor();

  return (
    <Drawer
      screenOptions={{
        ...estiloHeader,
        drawerActiveTintColor: colores.primario,
        drawerActiveBackgroundColor: colores.primarioSuave,
        // DEFENSA: al cerrar sesión el guard de cocina pasa a false y Expo Router saca
        // esta sección del historial solo; no hace falta router.back().
        headerRight: () => (
          <Pressable onPress={cerrarSesion} style={styles.salir} accessibilityRole="button">
            <Text style={styles.textoSalir}>Salir</Text>
          </Pressable>
        ),
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Pedido actual' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  salir: {
    paddingHorizontal: espaciado.md,
  },
  textoSalir: {
    color: colores.textoSobrePrimario, // el header es verde oscuro
    fontSize: 16,
    fontWeight: '600',
  },
});
