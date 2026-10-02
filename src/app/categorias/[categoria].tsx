import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { esCategoriaValida, NOMBRES_CATEGORIA, platosPorCategoria } from '@/data/platos';
import { colores, espaciado } from '@/tema/colores';

export default function CategoriaPantalla() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  // DEFENSA: los params siempre llegan como texto y cualquiera puede escribir la URL
  // (/categorias/pizzas). Por eso validamos con esCategoriaValida antes de usarlo.
  if (!esCategoriaValida(categoria)) {
    return (
      <Pantalla>
        <MensajeEstado mensaje={`La categoría "${categoria}" no existe.`} tipo="error" />
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: NOMBRES_CATEGORIA[categoria] }} />
      <FlatList
        style={styles.fondo}
        contentContainerStyle={styles.contenido}
        data={platosPorCategoria(categoria)}
        keyExtractor={(plato) => String(plato.id)}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/menu/[id]', params: { id: item.id } }} asChild>
            <TarjetaPlato
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
              imagen={item.imagen}
            />
          </Link>
        )}
        ListFooterComponent={<DondeEstoy />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: espaciado.md,
    gap: espaciado.sm,
  },
});
