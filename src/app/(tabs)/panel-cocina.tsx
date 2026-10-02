import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaAcceso } from '@/components/TarjetaAcceso';
import { useComedor } from '@/context/ComedorContext';
import { colores } from '@/tema/colores';

// Tab que solo aparece con sesión (ver Tabs.Protected en el _layout de las tabs).
// Muestra un resumen y lleva a la sección completa de cocina (/cocina, del Stack raíz).
export default function PanelCocina() {
  const { enEspera, atendidos } = useComedor();

  return (
    <Pantalla scroll>
      <Text style={styles.dato}>Pedidos en espera: {enEspera.length}</Text>
      <Text style={styles.dato}>Pedidos atendidos: {atendidos.length}</Text>
      <Link href="/cocina" asChild>
        <TarjetaAcceso titulo="Ir a la cocina" descripcion="Atender pedidos en orden" icono="flame" />
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  dato: {
    color: colores.texto,
    fontSize: 18,
  },
});
