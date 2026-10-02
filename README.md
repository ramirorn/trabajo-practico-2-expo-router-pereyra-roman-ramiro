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

Reemplazar `IP_DE_TU_PC` por la IP que muestra `npx expo start` (puerto por defecto 8081):

```
exp://IP_DE_TU_PC:8081/--/menu/5
```

En una build propia, el mismo plato se abre con `comedoripf://menu/5`, y en web con `http://localhost:8081/menu/5`.

## Capturas

> Agregar capturas o un video corto de cada flujo.

- [ ] Carrito con "Deshacer último"
- [ ] Turno del pedido
- [ ] Cocina atendiendo pedidos
- [ ] Login y logout
- [ ] Pantalla 404

---

# Respuestas — Partes A a F

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

a) ¿Qué significan **LIFO** y **FIFO**? ¿Cuál corresponde a la pila y cuál a la cola?

**Respuesta:** LIFO (*Last In, First Out*): el último en entrar es el primero en salir → **pila**. FIFO (*First In, First Out*): el primero en entrar es el primero en salir → **cola**.

b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?

**Respuesta:** En la pila se entra y se sale por el mismo extremo (el tope). En la cola se entra por el final y se sale por el frente.

c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.

**Respuesta:** Pila: una pila de platos / el botón "atrás" o el deshacer de una app. Cola: la fila del comedor / los pedidos de una app de delivery o los mensajes pendientes de envío.

### A2. Seguimiento de una pila

```js
const p = new Pila();
p.push('Inicio');
p.push('Productos');
p.push('Detalle 3');
p.pop();
p.push('Perfil');
console.log(p.tope());   // (1)
console.log(p.pop());    // (2)
console.log(p.tope());   // (3)
console.log(p.vacia);    // (4)
```

| # | Imprime |
|---|---|
| (1) | `'Perfil'` |
| (2) | `'Perfil'` |
| (3) | `'Productos'` |
| (4) | `false` |

**Estado final de la pila (de base a tope):** `Inicio, Productos`.

### A3. Seguimiento de una cola

```js
const c = new Cola();
c.encolar('Ana');
c.encolar('Beto');
c.desencolar();
c.encolar('Caro');
c.encolar('Dani');
console.log(c.frente());      // (1)
console.log(c.desencolar());  // (2)
console.log(c.vacia);         // (3)
```

| # | Imprime |
|---|---|
| (1) | `'Beto'` |
| (2) | `'Beto'` |
| (3) | `false` |

**Estado final de la cola (de frente a final):** `Caro, Dani`.

### A4. Análisis de la implementación

a) ¿Qué significa el `#` y qué problema evita?

**Respuesta:** Marca un campo privado real de JavaScript: no se puede leer ni modificar desde afuera de la clase. Evita que otro código altere el arreglo (por ejemplo con `splice`) y rompa el orden LIFO/FIFO. El `_` es solo una convención y no protege nada.

b) ¿Qué problema de rendimiento tiene `shift()` con colas muy grandes? ¿Cómo lo resuelven las colas "serias"?

**Respuesta:** `shift()` saca el primer elemento y corre todos los demás una posición: cuesta O(n). Las colas serias guardan un índice del frente que solo avanza (o usan un buffer circular o una lista enlazada), así desencolar cuesta O(1).

c) ¿Qué método de array usa la pila para sacar y cuál usa la cola? ¿Por qué no pueden usar el mismo?

**Respuesta:** La pila usa `pop()` (saca del final) y la cola `shift()` (saca del principio). No pueden usar el mismo porque sacan por extremos distintos: la pila saca el último que entró y la cola el primero.

### A5. Programación: una cola eficiente

> La versión en TypeScript usada en la app está en `src/estructuras/Cola.ts`.

```js
class ColaEficiente {
  #items = [];
  #inicio = 0; // índice del frente

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const x = this.#items[this.#inicio];
    this.#items[this.#inicio] = undefined; // libera la referencia
    this.#inicio++; // avanza el frente sin usar shift()
    return x;
  }

  frente() {
    return this.vacia ? undefined : this.#items[this.#inicio];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#inicio;
  }
}
```

### A6. Pila y cola dentro de Expo Router

a) ¿Qué estructura describe el historial de pantallas de un Stack? ¿Qué pantalla es la visible y qué operación hace "atrás"?

**Respuesta:** Una pila. La pantalla visible es el tope y "atrás" hace un pop.

b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?

**Respuesta:** Una cola: las acciones se procesan en el orden en que llegan. Si se tocan dos links rápido, se ejecutan las dos, una detrás de la otra, y pueden quedar dos pantallas apiladas.

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/` (el grupo no aparece en la URL) |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/3`, `/productos/abc`… (ruta dinámica) |
| `src/app/docs/[...slug].tsx` | `/docs/a`, `/docs/a/b/c`… (catch-all, cualquier profundidad) |
| `src/app/_layout.tsx` | No es pantalla: define el navegador que envuelve a las rutas de su carpeta |
| `src/app/+not-found.tsx` | Pantalla 404 para cualquier URL que no exista |
| `src/app/Boton.tsx` | **Problema:** crea la ruta `/Boton`. Los componentes van en `src/components` |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` (los parámetros de búsqueda no llevan corchetes) |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` (con una pantalla propia) | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

| | Afirmación | V/F | Justificación |
|---|---|---|---|
| a | Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración. | F | Las rutas salen de los archivos: crear el archivo ya crea la ruta. |
| b | Los archivos `_layout.tsx` son pantallas que el usuario puede visitar. | F | Envuelven pantallas y definen el navegador; no tienen URL propia. |
| c | Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL. | V | |
| d | Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión. | F | Conviene `npx expo install`, que instala la versión compatible con el SDK. |
| e | En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx`. | V | |
| f | La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar. | V | |
| g | Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx`. | V | |
| h | En SDK 57, `expo-router` usa el mismo número de versión mayor que el SDK (57). | V | |

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | Apila siempre una pantalla nueva. |
| `router.navigate(href)` | Va a la ruta sin duplicar la actual: si ya es la pantalla visible no apila; si no, apila. |
| `router.replace(href)` | Reemplaza el tope por la nueva pantalla (no agrega historial). |
| `router.back()` | Saca el tope (pop). |
| `router.dismissTo(href)` | Saca pantallas hasta llegar a `href`; si no está, reemplaza la actual. |
| `router.dismissAll()` | Vuelve a la primera pantalla del Stack. |
| `router.canGoBack()` | No la cambia: devuelve `true`/`false` según haya a dónde volver. |
| `router.setParams({...})` | No la cambia: actualiza los parámetros (la URL) de la pantalla actual. |

### C2. Simulación de la pila

Un único Stack; la pila empieza en `[ /productos ]`.

| # | Instrucción | Pila resultante (de base a tope) |
|---|---|---|
| 1 | `router.push("/productos/1")` | `/productos, /productos/1` |
| 2 | `router.push("/productos/2")` | `/productos, /productos/1, /productos/2` |
| 3 | `router.navigate("/productos/5")` | `/productos, /productos/1, /productos/2, /productos/5` |
| 4 | `router.push("/perfil")` | `/productos, /productos/1, /productos/2, /productos/5, /perfil` |
| 5 | `router.replace("/buscar")` | `/productos, /productos/1, /productos/2, /productos/5, /buscar` |
| 6 | `router.back()` | `/productos, /productos/1, /productos/2, /productos/5` |
| 7 | `router.dismissTo("/productos")` | `/productos` |
| 8 | `router.canGoBack()` → ¿qué devuelve? | `false` (queda una sola pantalla) |

### C3. ¿Link o router?

a) El usuario toca la tarjeta de un producto en una lista.

**Respuesta:** `<Link href=… asChild>`: es una acción directa del usuario.

b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.

**Respuesta:** `router.replace('/exito')`: se navega después de una lógica, y con replace "atrás" no vuelve al formulario ya enviado.

c) Botón "Cancelar" dentro de un modal.

**Respuesta:** `router.back()`: cierra el modal sacándolo de la pila.

d) Después de un login exitoso hay que ir a la pantalla principal.

**Respuesta:** `router.replace('/')`: así no se puede volver al login. Con `Stack.Protected` ni siquiera hace falta navegar.

e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.

**Respuesta:** `router.dismissTo('/pedidos')`: saca de una vez todas las pantallas de arriba.

### C4. Escribí el código

a) Un `<Link>` que abra el producto con id 8 usando **href como objeto**.

```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: 8 } }}>Producto 8</Link>
```

b) Un `<Link>` a `/perfil` que **siempre** apile, aunque la pantalla ya exista.

```tsx
<Link href="/perfil" push>Perfil</Link>
```

c) Un botón (`Pressable`) propio que funcione como link a `/carrito` usando `asChild`.

```tsx
<Link href="/carrito" asChild>
  <Pressable style={estilos.boton}>
    <Text>Carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

**Respuesta:** En la web el usuario puede abrir el link en otra pestaña, copiarlo, compartirlo y usar el historial del navegador; además lo entienden los lectores de pantalla y los buscadores. En el celular la URL no se ve, pero existe igual: Expo Router la usa para decidir qué pantalla mostrar y para los deep links; el `Link` funciona como un botón que navega.

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí | No (cada tab puede tener su propio Stack) | No |
| ¿Cómo cambia de pantalla el usuario? | Tocando links; vuelve con "atrás" o con el gesto | Tocando la barra inferior | Con el menú lateral (hamburguesa o deslizando) |
| ¿Desde dónde se importa en SDK 57? | `expo-router` | `expo-router/js-tabs` | `expo-router/drawer` |
| Un caso de uso típico | Lista → detalle | Secciones principales (Inicio, Menú, Carrito) | Panel con varias secciones (Cocina) |

### D2. Cada tab tiene su pila

**Respuesta:** Ve el detalle del producto 4, porque cada tab conserva su propia pila: cambiar de pestaña no la borra. Así funcionan Instagram o YouTube.

### D3. ¿Dónde va cada pantalla?

| | Pantalla | ¿Dónde va? |
|---|---|---|
| a | El detalle de un producto, que debe mantener visible la barra de pestañas. | Dentro de la tab |
| b | Un modal para confirmar una compra, que debe tapar la barra de pestañas. | Stack raíz |
| c | La pantalla de login que se abre como modal. | Stack raíz |
| d | La pantalla "Mis pedidos anteriores" dentro de la sección Perfil. | Dentro de la tab Perfil |

### D4. Configurar el Stack

```tsx
import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen
        name="hoja"
        options={{ presentation: 'formSheet', sheetAllowedDetents: [0.5, 0.9] }}
      />
    </Stack>
  );
}
```

a) ¿Qué diferencia hay entre `screenOptions` y las `options` de un `Stack.Screen`?

**Respuesta:** `screenOptions` se aplica a todas las pantallas del navegador; `options` solo a esa pantalla y pisa lo general.

b) ¿Por qué `(tabs)` tiene `headerShown: false`?

**Respuesta:** Porque las tabs ya muestran su propio header; si no, aparecería un header doble.

c) Si existe `src/app/perfil-publico.tsx` pero no está declarada en el Stack, ¿existe la pantalla? ¿Para qué sirve declararla?

**Respuesta:** Sí existe, la crea el archivo. Declararla sirve para configurarla (título, `presentation`), definir el orden o meterla en un `Stack.Protected`.

d) Nombrá cuatro valores posibles de `presentation`. ¿Cuál usarías para una hoja inferior que se abre al 50%?

**Respuesta:** `card`, `modal`, `transparentModal`, `fullScreenModal` (también `containedModal` y `formSheet`). Para la hoja al 50%: `formSheet` con `sheetAllowedDetents: [0.5]`.

e) ¿Cómo cambiarías el título del header desde la propia pantalla de detalle para que diga "Producto 7"?

**Respuesta:** Dentro de la pantalla: `<Stack.Screen options={{ title: `Producto ${id}` }} />` (o `navigation.setOptions`).

### D5. Tabs y Drawer en SDK 57

a) ¿Qué cambió en SDK 57 al importar `Tabs`? ¿Qué alternativa experimental existe?

**Respuesta:** Importar `Tabs` desde `'expo-router'` quedó deprecado; ahora se importa desde `'expo-router/js-tabs'`. La alternativa experimental son las `NativeTabs` de `'expo-router/unstable-native-tabs'`, que usan la barra nativa.

b) ¿Qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz para los gestos?

**Respuesta:** `react-native-gesture-handler` y `react-native-reanimated`, con `<GestureHandlerRootView style={{ flex: 1 }}>` en el layout raíz.

c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?

**Respuesta:** No. expo-router ya trae incluida su propia copia de React Navigation y el Drawer se importa desde `expo-router/drawer`.

d) Si hay navegadores anidados, ¿en qué navegador actúa `router.back()`?

**Respuesta:** En el navegador más cercano a la pantalla actual que pueda volver; si ese no puede, la acción sube al navegador padre.

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const producto = productos.find((p) => p.id === id);
  if (id === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

**¿Por qué nunca encuentra el producto?** Los parámetros siempre llegan como texto: se compara `3 === '3'`, que es `false`. Lo mismo pasa con `id === 3`.

**Código corregido:**

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumero = Number(id);
  const producto = productos.find((p) => p.id === idNumero);
  if (idNumero === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

### E2. Catch-all

| URL | `slug` |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | No entra en el catch-all (necesita al menos un segmento): muestra `docs/index.tsx` o la 404 |

### E3. Anatomía de una URL

a) Identificá el scheme, la ruta y los parámetros de búsqueda.

**Respuesta:** Scheme: `rutasipf`. Ruta: `/buscar`. Parámetros: `q=mate` y `categoria=bebidas`.

b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?

**Respuesta:** `{ q: 'mate', categoria: 'bebidas' }`.

c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?

**Respuesta:** No. Los corchetes son para segmentos de la ruta; los parámetros de búsqueda le llegan a cualquier pantalla.

d) Dá dos razones para usar `router.setParams` en lugar de `router.push`.

**Respuesta:** 1) No apila una pantalla por cada letra (con push, "atrás" iría letra por letra). 2) La URL queda actualizada y se puede compartir, sin volver a montar la pantalla.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `'/productos/3'` | `'/buscar'` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

### E5. Local vs global

a) ¿Cuál es la diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`? ¿Cuál es la opción por defecto y por qué?

**Respuesta:** El local devuelve los parámetros de la pantalla donde está el componente; el global, los de la URL actual, y re-renderiza en cada cambio. Por defecto se usa el local: evita re-renders de pantallas que están atrás en la pila y que una pantalla lea parámetros de otra.

b) ¿Para qué sirve `useFocusEffect`? Dá un ejemplo de uso.

**Respuesta:** Ejecuta un efecto cada vez que la pantalla gana el foco, no solo al montarse. Ejemplo: recargar la lista de pedidos cada vez que se vuelve a `/cocina`.

c) La URL `/productos/mate` abre la pantalla de detalle aunque no exista ese producto. ¿Es un error de Expo Router? ¿De quién es la responsabilidad?

**Respuesta:** No. El router solo compara la URL con el patrón `[id]`. Validar el parámetro y mostrar un mensaje es responsabilidad del desarrollador, en la pantalla.

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de `router` equivale?

**Respuesta:** Al renderizarse lleva inmediatamente a `/productos`. Equivale a `router.replace('/productos')`.

b) ¿Por qué una redirección debe **reemplazar** y no **apilar**?

**Respuesta:** Si apilara, la pantalla que redirige quedaría debajo: al tocar "atrás" volvería a ella, que vuelve a redirigir, y el usuario quedaría atrapado en un bucle.

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

a) ¿Qué le pasa a una pantalla cuando su `guard` es `false`?

**Respuesta:** Deja de existir: sale del historial y no se puede navegar a ella, ni siquiera por deep link.

b) Al iniciar sesión, el modal de login se cierra solo, sin llamar a `router.back()`. ¿Por qué?

**Respuesta:** Porque el guard de login pasa a `false` y Expo Router saca esa pantalla de la pila automáticamente.

c) Aparece el aviso "The action 'NAVIGATE' … was not handled by any navigator". ¿Qué lo causa y cómo se evita?

**Respuesta:** Se navega a una pantalla cuyo guard está en `false` (por ejemplo, `router.push('/privado')` justo al iniciar sesión, antes de que se actualice el estado). Se evita no navegando a mano después de cambiar la sesión y mostrando el link solo cuando la pantalla existe.

d) ¿Qué ventaja tiene `Stack.Protected` frente a poner un `<Redirect>` condicional en cada pantalla?

**Respuesta:** La regla queda en un solo lugar, las pantallas salen solas del historial, también se bloquean los deep links y no se ve un "parpadeo" de la pantalla protegida.

### F3. 404, anchor y rutas tipadas

a) `+not-found.tsx`

**Respuesta:** Es la pantalla que se muestra para URLs que no existen. Se define en `src/app/+not-found.tsx`.

b) `export const unstable_settings = { anchor: "(tabs)" }`

**Respuesta:** Indica qué pantalla queda debajo cuando se entra directo por un deep link, para que "atrás" lleve ahí. Se define en el `_layout.tsx` de ese Stack (en esta app, el raíz).

c) `typedRoutes`: ¿qué pasa si escribís `<Link href="/prodcutos" />`? ¿Dónde se generan los tipos?

**Respuesta:** TypeScript marca un error porque esa ruta no existe. Los tipos se generan en `.expo/types/router.d.ts` al ejecutar `npx expo start`.

### F4. Deep links

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

**Respuesta:** `/--/` separa la dirección del servidor de desarrollo (que identifica el proyecto dentro de Expo Go) de la ruta de la app. El scheme propio no funciona en Expo Go porque Expo Go es otra app con su scheme `exp://`; `comedoripf` recién se registra al compilar una build propia.

### F5. Errores comunes

a) Arreglo de estilos en el hijo de `<Link asChild>`.

**Causa:** `Link asChild` usa un `Slot` que mezcla las props con el hijo y no acepta un arreglo de estilos.

**Solución:** Pasar un único objeto, por ejemplo con `StyleSheet.flatten([...])` o con una función en `style`.

b) `src/app/TarjetaProducto.tsx` creó una ruta nueva.

**Causa:** Todo archivo dentro de `src/app` se convierte en una ruta.

**Solución:** Moverlo a `src/components`.

c) Después de iniciar sesión con `router.push("/")`, atrás vuelve al login.

**Causa:** `push` deja el login debajo en la pila.

**Solución:** Usar `router.replace('/')` o, mejor, `Stack.Protected`.

d) Expo Go dice que el proyecto es incompatible después de `npm install`.

**Causa:** `npm install` trajo una versión que no es compatible con el SDK de Expo Go.

**Solución:** Ejecutar `npx expo install --fix` y de ahí en adelante instalar con `npx expo install`.

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
