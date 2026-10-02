import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

import { CLAVE_COCINA, USUARIO_COCINA } from '@/data/sesion';
import type { Plato } from '@/data/platos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

// Cada vez que se agrega un plato al carrito se crea un ítem con un id único.
// Así podemos tener dos veces el mismo plato y deshacer solo uno.
export interface ItemCarrito {
  idItem: number;
  plato: Plato;
}

export interface Pedido {
  numero: number;
  items: ItemCarrito[];
  nota: string;
  total: number;
}

interface ValorComedor {
  // Sesión
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  // Carrito
  items: ItemCarrito[];
  total: number;
  cantidad: number;
  nota: string;
  guardarNota: (texto: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;
  // Pedidos
  confirmarPedido: () => Pedido;
  pedidoActual: Pedido | undefined;
  enEspera: Pedido[];
  atenderSiguiente: () => void;
  atendidos: Pedido[];
  posicionEnCola: (numero: number) => number;
  fueAtendido: (numero: number) => boolean;
}

const ComedorContext = createContext<ValorComedor | null>(null);

export function ComedorProvider({ children }: { children: ReactNode }) {
  // DEFENSA: Pila y Cola son objetos mutables; si cambian por dentro React no se entera.
  // Por eso guardamos las instancias en useRef (persisten entre renders) y, después de
  // cada operación, guardamos en un useState una "foto" con aArray(). Ese setState re-renderiza.
  const pilaDeshacer = useRef(new Pila<number>()); // guarda los idItem agregados
  const colaPedidos = useRef(new Cola<Pedido>());
  const pilaAtendidos = useRef(new Pila<Pedido>());

  // Contadores para ids y números de pedido (no se muestran, por eso useRef y no useState).
  const siguienteIdItem = useRef(1);
  const siguienteNumero = useRef(1);

  const [usuario, setUsuario] = useState<string | null>(null);
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [puedeDeshacer, setPuedeDeshacer] = useState(false);
  // "Fotos" de las estructuras para mostrar en pantalla.
  const [enEspera, setEnEspera] = useState<Pedido[]>([]);
  const [atendidos, setAtendidos] = useState<Pedido[]>([]);

  // ---------- Sesión ----------
  function iniciarSesion(usuarioIngresado: string, clave: string): boolean {
    if (usuarioIngresado === USUARIO_COCINA && clave === CLAVE_COCINA) {
      setUsuario(usuarioIngresado);
      return true;
    }
    return false;
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  // ---------- Carrito ----------
  const total = items.reduce((suma, item) => suma + item.plato.precio, 0);
  const cantidad = items.length;

  function guardarNota(texto: string) {
    setNota(texto);
  }

  function agregarAlCarrito(plato: Plato) {
    const idItem = siguienteIdItem.current++;
    setItems((anteriores) => [...anteriores, { idItem, plato }]);
    // DEFENSA: apilamos el idItem; el último agregado queda en el tope y es el primero en deshacerse.
    pilaDeshacer.current.push(idItem);
    setPuedeDeshacer(true);
  }

  function deshacerUltimo() {
    const idItem = pilaDeshacer.current.pop();
    if (idItem === undefined) return;
    setItems((anteriores) => anteriores.filter((item) => item.idItem !== idItem));
    setPuedeDeshacer(!pilaDeshacer.current.vacia);
  }

  // ---------- Pedidos ----------
  function confirmarPedido(): Pedido {
    const pedido: Pedido = {
      numero: siguienteNumero.current++,
      items,
      nota,
      total,
    };
    // DEFENSA: encolamos el pedido; la cocina lo atenderá en orden de llegada (FIFO).
    colaPedidos.current.encolar(pedido);
    setEnEspera(colaPedidos.current.aArray());

    // Vaciamos el carrito, la nota y la pila de deshacer (ya no hay nada que deshacer).
    setItems([]);
    setNota('');
    pilaDeshacer.current = new Pila<number>();
    setPuedeDeshacer(false);
    return pedido;
  }

  function atenderSiguiente() {
    const pedido = colaPedidos.current.desencolar();
    if (pedido === undefined) return;
    pilaAtendidos.current.push(pedido);
    setEnEspera(colaPedidos.current.aArray());
    // aArray() va de base a tope; lo damos vuelta para mostrar primero el más reciente.
    setAtendidos(pilaAtendidos.current.aArray().reverse());
  }

  // El pedido actual es el frente de la cola (el primero de la foto).
  const pedidoActual: Pedido | undefined = enEspera[0];

  // Cuántos pedidos tiene adelante: su posición en la foto de la cola (-1 si no está).
  function posicionEnCola(numero: number): number {
    return enEspera.findIndex((pedido) => pedido.numero === numero);
  }

  function fueAtendido(numero: number): boolean {
    return atendidos.some((pedido) => pedido.numero === numero);
  }

  // DEFENSA: no usamos useMemo ni useCallback porque el proyecto tiene React Compiler,
  // que memoriza automáticamente. Así el código queda más corto.
  const valor: ValorComedor = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    items,
    total,
    cantidad,
    nota,
    guardarNota,
    agregarAlCarrito,
    deshacerUltimo,
    puedeDeshacer,
    confirmarPedido,
    pedidoActual,
    enEspera,
    atenderSiguiente,
    atendidos,
    posicionEnCola,
    fueAtendido,
  };

  return <ComedorContext.Provider value={valor}>{children}</ComedorContext.Provider>;
}

// Hook para usar el contexto desde cualquier pantalla.
export function useComedor(): ValorComedor {
  const contexto = useContext(ComedorContext);
  if (contexto === null) {
    throw new Error('useComedor debe usarse dentro de <ComedorProvider>');
  }
  return contexto;
}
