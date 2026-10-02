import { Redirect } from 'expo-router';

// DEFENSA: /pedido era la URL vieja del carrito. <Redirect> manda al usuario a /carrito
// apenas se renderiza, así los enlaces viejos siguen funcionando.
export default function PedidoViejo() {
  return <Redirect href="/carrito" />;
}
