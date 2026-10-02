import { colores } from '@/tema/colores';

// Header institucional compartido por todos los navegadores (Stack, Tabs y Drawer).
// Se usa con spread: screenOptions={{ ...estiloHeader, ... }}.
export const estiloHeader = {
  headerStyle: { backgroundColor: colores.primario },
  headerTintColor: colores.textoSobrePrimario, // título y flecha "atrás"
  headerTitleStyle: { fontWeight: '700' },
} as const;
