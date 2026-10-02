import { StyleSheet, Text } from 'react-native';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { ResumenPedido } from '@/components/ResumenPedido';
import { useComedor } from '@/context/ComedorContext';
import { colores } from '@/tema/colores';

export default function PedidoActual() {
  const { pedidoActual, enEspera, atenderSiguiente } = useComedor();

  return (
    <Pantalla scroll>
      <Text style={styles.texto}>Pedidos en espera: {enEspera.length}</Text>
      {/* DEFENSA: pedidoActual es el frente de la Cola: el que llegó primero se atiende primero. */}
      {pedidoActual === undefined ? (
        <MensajeEstado mensaje="No hay pedidos para atender." />
      ) : (
        <>
          <Text style={styles.numero}>Pedido N° {pedidoActual.numero}</Text>
          <ResumenPedido items={pedidoActual.items} nota={pedidoActual.nota} total={pedidoActual.total} />
        </>
      )}
      <BotonPrimario
        titulo="Atender siguiente"
        onPress={atenderSiguiente}
        deshabilitado={pedidoActual === undefined}
      />
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: colores.textoSecundario,
    fontSize: 16,
  },
  numero: {
    color: colores.primario,
    fontSize: 24,
    fontWeight: '700',
  },
});
