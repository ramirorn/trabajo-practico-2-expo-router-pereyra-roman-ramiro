import { Link, usePathname } from 'expo-router';
import { StyleSheet } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { colores } from '@/tema/colores';

// DEFENSA: +not-found atrapa cualquier URL que no coincide con ningún archivo de src/app.
export default function NoEncontrada() {
  const ruta = usePathname();

  return (
    <Pantalla>
      <MensajeEstado mensaje={`La página "${ruta}" no existe.`} tipo="error" />
      <Link href="/" style={styles.enlace}>
        Volver al inicio
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  enlace: {
    color: colores.primario,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
