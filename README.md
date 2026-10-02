# Comedor IPF — Trabajo Práctico N° 2 (Expo Router)

App para que los alumnos pidan comida desde el celular y la cocina atienda los pedidos **en orden de llegada**.
Usa una **Cola** para los pedidos y una **Pila** para deshacer acciones del carrito y guardar el historial de atendidos.

Hecha con Expo SDK 57, Expo Router y TypeScript.

**Alumno:** Pereyra Roman, Ramiro Nicolás **Fecha de entrega:** 02/10/2026

---

## Cómo ejecutarla

```bash
npm install
```

```bash
npx expo start
```

Escanear el QR con Expo Go, o presionar `w` para abrirla en el navegador.

**Usuario de cocina (fijo en el código, `src/data/sesion.ts`):** usuario `cocina`, clave `1234`.

---

## Organización del código

```
src/
  app/          solo rutas (cada archivo es una pantalla, cada _layout un navegador)
  components/   componentes reutilizables (Pantalla, BotonPrimario, TarjetaPlato, LogoIPF, DondeEstoy...)
  context/      ComedorContext: sesión, carrito, cola de pedidos y pilas
  data/         platos, artículos de ayuda y usuario de cocina
  estructuras/  clases Pila y Cola
  hooks/        useTamanioPila (contador de pila del desafío opcional)
  tema/         colores, espaciados y radios
```

## Árbol de rutas (`src/app`) y navegador de cada layout

```
src/app/
├── _layout.tsx                  → Stack raíz (GestureHandlerRootView + ComedorProvider, anchor: "(tabs)")
├── (tabs)/
│   ├── _layout.tsx              → Tabs (expo-router/js-tabs)
│   ├── index.tsx                → /                  Inicio
│   ├── panel-cocina.tsx         → /panel-cocina      Tab "Cocina" (Tabs.Protected, solo con sesión)
│   ├── menu/
│   │   ├── _layout.tsx          → Stack de la tab Menú
│   │   ├── index.tsx            → /menu
│   │   └── [id].tsx             → /menu/[id]
│   └── carrito/
│       ├── _layout.tsx          → Stack de la tab Carrito
│       ├── index.tsx            → /carrito
│       └── nota.tsx             → /carrito/nota      (formSheet)
├── categorias/
│   └── [categoria].tsx          → /categorias/[categoria]
├── buscar.tsx                   → /buscar?q=&categoria=
├── confirmar.tsx                → /confirmar         (modal)
├── turno/
│   └── [numero].tsx             → /turno/[numero]
├── login.tsx                    → /login             (modal, Stack.Protected: solo SIN sesión)
├── cocina/
│   ├── _layout.tsx              → Drawer (expo-router/drawer), Stack.Protected: solo CON sesión
│   ├── index.tsx                → /cocina
│   └── atendidos.tsx            → /cocina/atendidos
├── ayuda/
│   ├── index.tsx                → /ayuda
│   └── [...slug].tsx            → /ayuda/... (catch-all)
├── pedido.tsx                   → /pedido  →  <Redirect href="/carrito" />
└── +not-found.tsx               → cualquier otra URL (404)
```

| Layout | Navegador | Qué contiene |
|---|---|---|
| `src/app/_layout.tsx` | Stack raíz | `(tabs)`, buscar, categorías, turno, ayuda, confirmar (modal), `cocina` y `login` protegidas |
| `src/app/(tabs)/_layout.tsx` | Tabs | Inicio, Menú, Carrito (con badge) y Cocina (solo con sesión) |
| `src/app/(tabs)/menu/_layout.tsx` | Stack | Lista del menú y detalle del plato (la barra de pestañas sigue visible) |
| `src/app/(tabs)/carrito/_layout.tsx` | Stack | Carrito y nota para la cocina (hoja inferior) |
| `src/app/cocina/_layout.tsx` | Drawer | Pedido actual y pedidos atendidos, con botón "Salir" |

## Flujo de confirmación: ¿`replace` o `push`?

En `src/app/confirmar.tsx`, después de confirmar el pedido se navega con:

```ts
router.replace(`/turno/${pedido.numero}`);
```

`replace` **reemplaza** la pantalla de confirmación por la del turno en la pila, en lugar de apilar una encima.
Así, al tocar "atrás" desde el turno, el usuario **no** vuelve a la confirmación de un pedido que ya se envió.
Con `push`, la confirmación quedaría debajo en la pila: el usuario podría volver y confirmar el mismo pedido dos veces.

Se usa `router` (y no `<Link>`) porque la navegación ocurre **después de una lógica** (encolar el pedido y obtener su número).

## Deep link de prueba (Expo Go)

Con la IP que muestra `npx expo start` en la compu de desarrollo:

```
exp://10.254.198.119:8081/--/menu/5
```

En una build propia, el mismo plato se abre con `comedoripf://menu/5`, y en web con `http://localhost:8081/menu/5`.

## Respuestas de las Partes A a F

Están en [RESPUESTAS.md](RESPUESTAS.md).

---

# Preguntas para la defensa oral (G6)

1. ¿Qué método usaste para pasar de `/confirmar` a `/turno/[numero]` y qué pasaría si usaras `push`?

   **Respuesta:** `router.replace` (en `src/app/confirmar.tsx`). Con `push`, la confirmación quedaría debajo del turno y "atrás" volvería a la confirmación de un pedido ya enviado.

2. Si la cocina cierra sesión estando en `/cocina/atendidos`, ¿qué ocurre con esa pantalla? ¿Por qué no hace falta llamar a `router.back()`?

   **Respuesta:** El guard de `cocina` pasa a `false` y toda la sección (el Drawer, con atendidos incluida) sale del historial; queda visible Inicio. No hace falta `router.back()` porque lo resuelve `Stack.Protected`.

3. ¿Por qué "Deshacer" usa una pila y no una cola? ¿Y por qué los pedidos usan una cola y no una pila?

   **Respuesta:** Deshacer debe revertir la última acción (LIFO); con una cola se borraría el primer plato agregado. Los pedidos se atienden por orden de llegada (FIFO); con una pila se atendería primero al último en llegar.

4. ¿Qué pasa si alguien abre `comedoripf://menu/999`? ¿Y `comedoripf://no-existe`?

   **Respuesta:** `/menu/999` abre la pantalla del detalle, que convierte el id con `Number`, no encuentra el plato y muestra *No existe un plato con id "999"*. `/no-existe` no coincide con ninguna ruta y muestra la pantalla 404 con la URL.

5. Si tocás "Agregar al carrito" y enseguida el link al carrito, ¿en qué orden se procesan esas acciones de navegación y por qué?

   **Respuesta:** "Agregar al carrito" no navega: solo cambia el estado del Context. La única acción de navegación es la del link, que entra en la cola de acciones y se procesa en orden (FIFO). Si hubiera dos acciones de navegación, se procesarían en el orden en que se tocaron.

6. ¿Qué pantalla queda debajo cuando se abre `/categorias/bebidas` desde un deep link? ¿Qué configuración lo decide?

   **Respuesta:** Queda `(tabs)`, en la pestaña Inicio. Lo decide `unstable_settings = { anchor: '(tabs)' }` en `src/app/_layout.tsx`.
