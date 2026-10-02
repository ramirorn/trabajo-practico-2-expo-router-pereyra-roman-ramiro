import { router } from 'expo-router';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { ResumenPedido } from '@/components/ResumenPedido';
import { useComedor } from '@/context/ComedorContext';

export default function Confirmar() {
  const { items, nota, total, cantidad, confirmarPedido } = useComedor();

  function confirmar() {
    const pedido = confirmarPedido();
    // DEFENSA: usamos router (y no Link) porque navegamos DESPUÉS de una lógica.
    // replace en vez de push: "atrás" no vuelve a esta confirmación; con push el usuario
    // podría volver y confirmar el mismo pedido dos veces.
    router.replace(`/turno/${pedido.numero}`);
  }

  return (
    <Pantalla scroll>
      {cantidad === 0 ? (
        <MensajeEstado mensaje="El carrito está vacío." />
      ) : (
        <ResumenPedido items={items} nota={nota} total={total} />
      )}
      <BotonPrimario titulo="Confirmar" onPress={confirmar} deshabilitado={cantidad === 0} />
      <BotonPrimario titulo="Cancelar" variante="secundario" onPress={() => router.back()} />
      <DondeEstoy />
    </Pantalla>
  );
}
