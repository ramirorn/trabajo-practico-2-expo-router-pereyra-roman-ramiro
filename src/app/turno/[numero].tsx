import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { colores } from '@/tema/colores';

// Minutos que tarda la cocina en preparar un pedido (valor inventado para el TP).
const MINUTOS_POR_PEDIDO = 3;

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { posicionEnCola, fueAtendido } = useComedor();

  // DEFENSA: el param llega como texto ("7"); lo pasamos a número y validamos que sea entero.
  const numeroTurno = Number(numero);
  const valido = Number.isInteger(numeroTurno);
  const adelante = valido ? posicionEnCola(numeroTurno) : -1;
  const listo = valido && fueAtendido(numeroTurno);

  function volverAlInicio() {
    // dismissTo cierra las pantallas apiladas hasta llegar al inicio (no apila uno nuevo).
    router.dismissTo('/');
  }

  let contenido;
  if (listo) {
    contenido = <Text style={styles.listo}>¡Tu pedido está listo!</Text>;
  } else if (adelante >= 0) {
    // Tiempo estimado = posición * 3 minutos. La posición empieza en 1 (el del frente),
    // así se cuentan los de adelante y también el propio pedido: nunca da 0 minutos.
    const posicion = adelante + 1;
    const minutos = posicion * MINUTOS_POR_PEDIDO;
    contenido = (
      <>
        <Text style={styles.texto}>Pedidos adelante: {adelante}</Text>
        <Text style={styles.texto}>Tiempo estimado: {minutos} minutos</Text>
      </>
    );
  } else {
    contenido = <MensajeEstado mensaje={`El turno "${numero}" no existe.`} tipo="error" />;
  }

  return (
    <Pantalla scroll>
      {valido && <Text style={styles.numero}>Turno N° {numeroTurno}</Text>}
      {contenido}
      <BotonPrimario titulo="Volver al inicio" onPress={volverAlInicio} />
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  numero: {
    color: colores.primario,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  texto: {
    color: colores.texto,
    fontSize: 18,
    textAlign: 'center',
  },
  listo: {
    color: colores.exito,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
