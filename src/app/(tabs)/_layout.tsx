import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { useComedor } from '@/context/ComedorContext';
import { colores } from '@/tema/colores';
import { estiloHeader } from '@/tema/navegacion';

export default function LayoutTabs() {
  const { cantidad, usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Tabs
      screenOptions={{
        ...estiloHeader,
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.textoSecundario,
        tabBarStyle: { backgroundColor: colores.superficie, borderTopColor: colores.borde },
        tabBarLabelStyle: { fontWeight: '600' },
        // Verde institucional con texto blanco (contraste AA).
        tabBarBadgeStyle: { backgroundColor: colores.exito, color: colores.textoSobrePrimario },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      {/* Menú y Carrito tienen su propio Stack con header, por eso ocultamos el de la tab. */}
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          // undefined = sin globito cuando el carrito está vacío.
          tabBarBadge: cantidad > 0 ? cantidad : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      />
      {/* DEFENSA: Tabs.Protected funciona igual que en el Stack: la tab solo existe con sesión. */}
      <Tabs.Protected guard={conSesion}>
        <Tabs.Screen
          name="panel-cocina"
          options={{
            title: 'Cocina',
            tabBarIcon: ({ color, size }) => <Ionicons name="flame" color={color} size={size} />,
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
