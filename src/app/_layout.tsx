import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ComedorProvider, useComedor } from '@/context/ComedorContext';
import { colores } from '@/tema/colores';
import { estiloHeader } from '@/tema/navegacion';

// DEFENSA: anchor dice qué pantalla queda "debajo" si se entra directo por un deep link.
// Si alguien abre /categorias/bebidas, el Stack arma (tabs) abajo y "atrás" vuelve a las tabs.
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        {/* Íconos claros en la barra de estado porque el header es verde oscuro. */}
        <StatusBar style="light" />
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}

// Está separado porque useComedor() solo funciona DENTRO de <ComedorProvider>.
function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack
      screenOptions={{
        ...estiloHeader,
        contentStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="confirmar" options={{ title: 'Confirmar pedido', presentation: 'modal' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Mi turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de ayuda' }} />
      <Stack.Screen name="pedido" options={{ title: 'Pedido' }} />
      <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />

      {/* DEFENSA: Stack.Protected muestra sus pantallas solo si guard es true.
          Si cambia la sesión, la pantalla protegida sale del historial sola. */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ title: 'Ingresar', presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
