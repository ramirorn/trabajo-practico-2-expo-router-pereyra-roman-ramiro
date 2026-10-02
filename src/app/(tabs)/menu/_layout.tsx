import { Stack } from 'expo-router';

import { colores } from '@/tema/colores';
import { estiloHeader } from '@/tema/navegacion';

// Si se entra directo a /menu/5 (desde Buscar o por URL), el listado queda debajo.
export const unstable_settings = {
  anchor: 'index',
};

// DEFENSA: la tab Menú tiene su propio Stack: al entrar a un plato se apila encima del
// listado y "atrás" vuelve al listado sin salir de la tab.
export default function LayoutMenu() {
  return (
    <Stack
      screenOptions={{
        ...estiloHeader,
        contentStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      <Stack.Screen name="[id]" options={{ title: 'Plato' }} />
    </Stack>
  );
}
