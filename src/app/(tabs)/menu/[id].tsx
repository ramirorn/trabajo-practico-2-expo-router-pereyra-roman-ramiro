import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { buscarPlatoPorId } from '@/data/platos';
import { useTamanioPila } from '@/hooks/useTamanioPila';
import { colores, radios } from '@/tema/colores';

export default function DetallePlato() {
  // DEFENSA: los params de la URL siempre llegan como texto ("5"), aunque en el Link
  // pasemos un número. Por eso lo convertimos con Number() antes de buscar el plato.
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();
  const tamanioPila = useTamanioPila();
  const plato = buscarPlatoPorId(Number(id));

  if (plato === undefined) {
    return (
      <Pantalla>
        <MensajeEstado mensaje={`No existe un plato con id "${id}".`} tipo="error" />
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla scroll>
      {/* El título del header es el nombre del plato (se configura desde la pantalla). */}
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={styles.pila}>Pantallas en la pila: {tamanioPila}</Text>
      <Image
        source={plato.imagen}
        style={styles.imagen}
        contentFit="cover"
        transition={200}
        accessibilityLabel={plato.nombre}
      />
      <Text style={styles.nombre}>{plato.nombre}</Text>
      <Text style={styles.precio}>$ {plato.precio.toLocaleString('es-AR')}</Text>
      <Text style={styles.descripcion}>{plato.descripcion}</Text>
      <BotonPrimario titulo="Agregar al carrito" onPress={() => agregarAlCarrito(plato)} />
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: radios.md,
    backgroundColor: colores.primarioSuave,
  },
  nombre: {
    color: colores.texto,
    fontSize: 24,
    fontWeight: '700',
  },
  precio: {
    color: colores.primario,
    fontSize: 22,
    fontWeight: '700',
  },
  descripcion: {
    color: colores.textoSecundario,
    fontSize: 16,
  },
  pila: {
    color: colores.textoSecundario,
  },
});
