import { Stack } from 'expo-router';

import { colores } from '@/tema/colores';

export default function LayoutCarrito() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colores.primario,
        contentStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      {/* DEFENSA: formSheet es una hoja que sube desde abajo; los detents son las alturas
          donde se puede frenar (50% y 90% de la pantalla). */}
      <Stack.Screen
        name="nota"
        options={{
          title: 'Nota para la cocina',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.9],
        }}
      />
    </Stack>
  );
}
