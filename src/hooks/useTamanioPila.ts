import { useNavigation, useRoute } from 'expo-router';

// Devuelve cuántas pantallas hay en la pila del Stack hasta esta pantalla (incluida).
// DEFENSA: getState() devuelve el estado del Stack padre; routes es la pila de pantallas.
// No usamos routes.length porque una pantalla NO se vuelve a dibujar cuando se apila otra
// encima, y el número quedaría viejo. La posición de esta pantalla (su índice + 1) no cambia,
// y cuando la pantalla está visible (arriba de todo) es igual al tamaño de la pila.
export function useTamanioPila(): number {
  const navigation = useNavigation();
  const ruta = useRoute();
  const rutas = navigation.getState()?.routes ?? [];
  return rutas.findIndex((r) => r.key === ruta.key) + 1;
}
