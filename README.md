# Comedor IPF — Trabajo Práctico N° 2 (Expo Router)

App para que los alumnos pidan comida desde el celular y la cocina atienda los pedidos **en orden de llegada**.
Usa una **Cola** para los pedidos y una **Pila** para deshacer acciones del carrito y guardar el historial de atendidos.

Hecha con Expo SDK 57, Expo Router y TypeScript.

**Alumno/a:** ______________________ **Fecha de entrega:** ____________

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

**Respuesta:**

b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?

**Respuesta:**

c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.

**Respuesta:**

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
| (1) | |
| (2) | |
| (3) | |
| (4) | |

**Estado final de la pila (de base a tope):**

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
| (1) | |
| (2) | |
| (3) | |

**Estado final de la cola (de frente a final):**

### A4. Análisis de la implementación

a) En las clases de clase, el array se declara como `#items`. ¿Qué significa el `#` y qué problema evita?

**Respuesta:**

b) La cola usa `array.shift()` para desencolar. ¿Qué problema de rendimiento tiene con colas muy grandes? ¿Cómo lo resuelven las colas "serias"?

**Respuesta:**

c) ¿Qué método de array usa la pila para sacar y cuál usa la cola? ¿Por qué no pueden usar el mismo?

**Respuesta:**

### A5. Programación: una cola eficiente

Implementá en JavaScript la clase `ColaEficiente` con los métodos `encolar(x)`, `desencolar()`, `frente()` y los getters `vacia` y `tamanio`, **sin usar** `shift()`.

> Referencia: la versión en TypeScript usada en la app está en `src/estructuras/Cola.ts`.

```js
// Escribir acá la clase ColaEficiente
```

### A6. Pila y cola dentro de Expo Router

a) ¿Qué estructura describe el **historial de pantallas** de un Stack? ¿Qué pantalla es la visible y qué operación hace "atrás"?

**Respuesta:**

b) ¿Qué estructura usa Expo Router para las **acciones de navegación**? ¿Qué pasa si el usuario toca dos links muy rápido?

**Respuesta:**

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | |
| `src/app/acerca.tsx` | |
| `src/app/(tabs)/perfil.tsx` | |
| `src/app/(tabs)/productos/index.tsx` | |
| `src/app/(tabs)/productos/[id].tsx` | |
| `src/app/docs/[...slug].tsx` | |
| `src/app/_layout.tsx` | |
| `src/app/+not-found.tsx` | |
| `src/app/Boton.tsx` | |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | |
| `/buscar?q=mate&categoria=kiosco` | |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | |
| `/ayuda` (con una pantalla propia) | |

### B3. Verdadero o falso

Indicá V o F y justificá las falsas.

| | Afirmación | V/F | Justificación |
|---|---|---|---|
| a | Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración. | | |
| b | Los archivos `_layout.tsx` son pantallas que el usuario puede visitar. | | |
| c | Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL. | | |
| d | Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión. | | |
| e | En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx`. | | |
| f | La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar. | | |
| g | Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx`. | | |
| h | En SDK 57, `expo-router` usa el mismo número de versión mayor que el SDK (57). | | |

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | |
| `router.navigate(href)` | |
| `router.replace(href)` | |
| `router.back()` | |
| `router.dismissTo(href)` | |
| `router.dismissAll()` | |
| `router.canGoBack()` | |
| `router.setParams({...})` | |

### C2. Simulación de la pila

Un único Stack; la pila empieza en `[ /productos ]`.

| # | Instrucción | Pila resultante (de base a tope) |
|---|---|---|
| 1 | `router.push("/productos/1")` | |
| 2 | `router.push("/productos/2")` | |
| 3 | `router.navigate("/productos/5")` | |
| 4 | `router.push("/perfil")` | |
| 5 | `router.replace("/buscar")` | |
| 6 | `router.back()` | |
| 7 | `router.dismissTo("/productos")` | |
| 8 | `router.canGoBack()` → ¿qué devuelve? | |

### C3. ¿Link o router?

Para cada situación, elegí `<Link>` o `router` e indicá el método o prop que usarías. Justificá.

a) El usuario toca la tarjeta de un producto en una lista.

**Respuesta:**

b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.

**Respuesta:**

c) Botón "Cancelar" dentro de un modal.

**Respuesta:**

d) Después de un login exitoso hay que ir a la pantalla principal.

**Respuesta:**

e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.

**Respuesta:**

### C4. Escribí el código

a) Un `<Link>` que abra el producto con id 8 usando **href como objeto**.

```tsx

```

b) Un `<Link>` a `/perfil` que **siempre** apile, aunque la pantalla ya exista.

```tsx

```

c) Un botón (`Pressable`) propio que funcione como link a `/carrito` usando `asChild`.

```tsx

```

### C5. Pensar

En una web, cada `<Link>` se convierte en un `<a href>` real. ¿Qué ventaja concreta tiene eso para el usuario? ¿Qué pasa en el celular, donde no hay barra de direcciones?

**Respuesta:**

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | | | |
| ¿Cómo cambia de pantalla el usuario? | | | |
| ¿Desde dónde se importa en SDK 57? | | | |
| Un caso de uso típico | | | |

### D2. Cada tab tiene su pila

En una app con pestañas Inicio y Productos (Productos tiene su propio Stack), el usuario está en Productos, abre el detalle del producto 4, cambia a Inicio y vuelve a Productos. ¿Qué pantalla ve? ¿Por qué? ¿Qué app que uses todos los días se comporta así?

**Respuesta:**

### D3. ¿Dónde va cada pantalla?

Indicá si va en el **Stack raíz** o **dentro de una tab**.

| | Pantalla | ¿Dónde va? |
|---|---|---|
| a | El detalle de un producto, que debe mantener visible la barra de pestañas. | |
| b | Un modal para confirmar una compra, que debe tapar la barra de pestañas. | |
| c | La pantalla de login que se abre como modal. | |
| d | La pantalla "Mis pedidos anteriores" dentro de la sección Perfil. | |

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

**Respuesta:**

b) ¿Por qué `(tabs)` tiene `headerShown: false`?

**Respuesta:**

c) Si existe `src/app/perfil-publico.tsx` pero no está declarada en el Stack, ¿existe la pantalla? ¿Para qué sirve declararla?

**Respuesta:**

d) Nombrá cuatro valores posibles de `presentation`. ¿Cuál usarías para una hoja inferior que se abre al 50%?

**Respuesta:**

e) ¿Cómo cambiarías el título del header desde la propia pantalla de detalle para que diga "Producto 7"?

**Respuesta:**

### D5. Tabs y Drawer en SDK 57

a) ¿Qué cambió en SDK 57 al importar `Tabs`? ¿Qué alternativa experimental existe?

**Respuesta:**

b) ¿Qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz para los gestos?

**Respuesta:**

c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?

**Respuesta:**

d) Si hay navegadores anidados, ¿en qué navegador actúa `router.back()`?

**Respuesta:**

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

**¿Por qué nunca encuentra el producto?**

**Código corregido:**

```tsx

```

### E2. Catch-all

Para `src/app/docs/[...slug].tsx`:

| URL | `slug` |
|---|---|
| `/docs/react` | |
| `/docs/react/hooks/useState` | |
| `/docs` | |

### E3. Anatomía de una URL

Dada la URL `rutasipf://buscar?q=mate&categoria=bebidas`:

a) Identificá el scheme, la ruta y los parámetros de búsqueda.

**Respuesta:**

b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?

**Respuesta:**

c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?

**Respuesta:**

d) En el buscador, cada vez que el usuario escribe se llama a `router.setParams({ q: texto })` en lugar de `router.push`. Dá dos razones.

**Respuesta:**

### E4. ¿Dónde estoy?

(`buscar.tsx` está en el Stack raíz; el detalle está en `(tabs)/productos/[id].tsx`.)

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | | |
| `useSegments()` | | |
| `useLocalSearchParams()` | | |

### E5. Local vs global

a) ¿Cuál es la diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`? ¿Cuál es la opción por defecto y por qué?

**Respuesta:**

b) ¿Para qué sirve `useFocusEffect`? Dá un ejemplo de uso.

**Respuesta:**

c) La URL `/productos/mate` abre la pantalla de detalle aunque no exista ese producto. ¿Es un error de Expo Router? ¿De quién es la responsabilidad?

**Respuesta:**

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de `router` equivale?

**Respuesta:**

b) ¿Por qué una redirección debe **reemplazar** y no **apilar**? Describí el problema que aparecería.

**Respuesta:**

### F2. Stack.Protected

Completá los `guard` para que `privado` solo exista con sesión y `login` solo sin sesión.

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={ ______ }>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={ ______ }>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

a) ¿Qué le pasa a una pantalla cuando su `guard` es `false`?

**Respuesta:**

b) Al iniciar sesión, el modal de login se cierra solo, sin llamar a `router.back()`. ¿Por qué?

**Respuesta:**

c) Aparece el aviso "The action 'NAVIGATE' … was not handled by any navigator". ¿Qué lo causa y cómo se evita?

**Respuesta:**

d) ¿Qué ventaja tiene `Stack.Protected` frente a poner un `<Redirect>` condicional en cada pantalla?

**Respuesta:**

### F3. 404, anchor y rutas tipadas

Explicá brevemente para qué sirve cada uno y en qué archivo se define:

a) `+not-found.tsx`

**Respuesta:**

b) `export const unstable_settings = { anchor: "(tabs)" }`

**Respuesta:**

c) `typedRoutes`: ¿qué pasa si escribís `<Link href="/prodcutos" />`? ¿Dónde se generan los tipos?

**Respuesta:**

### F4. Deep links

La app tiene `"scheme": "comedoripf"` en `app.json` y la compu de desarrollo tiene la IP `192.168.1.20`. URL que abre el plato 7 (`/menu/7`):

| Dónde | URL |
|---|---|
| App instalada (build propia) | |
| Expo Go en desarrollo | |
| Web (`npx expo start --web`) | |

¿Qué significa la parte `/--/` en la URL de Expo Go? ¿Por qué el scheme propio no funciona dentro de Expo Go?

**Respuesta:**

### F5. Errores comunes

Para cada situación explicá la causa y la solución:

a) Al usar `<Link href="/perfil" asChild>` con un `<Pressable style={[estilos.boton, activo && estilos.activo]}>` aparece: "You are passing an array of styles to a child of `<Slot>`".

**Causa:**

**Solución:**

b) Un compañero creó `src/app/TarjetaProducto.tsx` para reutilizar un componente y ahora la app tiene una ruta nueva.

**Causa:**

**Solución:**

c) Después de iniciar sesión se usa `router.push("/")` y, al tocar atrás, el usuario vuelve al login.

**Causa:**

**Solución:**

d) Expo Go dice que el proyecto es incompatible después de instalar un paquete con `npm install`.

**Causa:**

**Solución:**

---

# Preguntas para la defensa oral (G6)

Responder sobre el código de este proyecto.

1. ¿Qué método usaste para pasar de `/confirmar` a `/turno/[numero]` y qué pasaría si usaras `push`?

   **Respuesta:**

2. Si la cocina cierra sesión estando en `/cocina/atendidos`, ¿qué ocurre con esa pantalla? ¿Por qué no hace falta llamar a `router.back()`?

   **Respuesta:**

3. ¿Por qué "Deshacer" usa una pila y no una cola? ¿Y por qué los pedidos usan una cola y no una pila?

   **Respuesta:**

4. ¿Qué pasa si alguien abre `comedoripf://menu/999`? ¿Y `comedoripf://no-existe`?

   **Respuesta:**

5. Si tocás "Agregar al carrito" y enseguida el link al carrito, ¿en qué orden se procesan esas acciones de navegación y por qué?

   **Respuesta:**

6. ¿Qué pantalla queda debajo cuando se abre `/categorias/bebidas` desde un deep link? ¿Qué configuración lo decide?

   **Respuesta:**
