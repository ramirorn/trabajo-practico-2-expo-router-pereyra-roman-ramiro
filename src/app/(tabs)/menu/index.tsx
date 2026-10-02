import { Link } from 'expo-router';
import { SectionList, StyleSheet, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { CATEGORIAS, NOMBRES_CATEGORIA, platosPorCategoria } from '@/data/platos';
import { useTamanioPila } from '@/hooks/useTamanioPila';
import { colores, espaciado } from '@/tema/colores';

// Una sección por categoría: SectionList pide { title, data }.
const SECCIONES = CATEGORIAS.map((categoria) => ({
  categoria,
  title: NOMBRES_CATEGORIA[categoria],
  data: platosPorCategoria(categoria),
}));

export default function Menu() {
  const tamanioPila = useTamanioPila();

  return (
    <SectionList
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      sections={SECCIONES}
      keyExtractor={(plato) => String(plato.id)}
      ListHeaderComponent={<Text style={styles.pila}>Pantallas en la pila: {tamanioPila}</Text>}
      renderSectionHeader={({ section }) => (
        <Link
          href={{ pathname: '/categorias/[categoria]', params: { categoria: section.categoria } }}
          style={styles.titulo}
        >
          {section.title} ›
        </Link>
      )}
      renderItem={({ item }) => (
        <Link href={{ pathname: '/menu/[id]', params: { id: item.id } }} asChild>
          <TarjetaPlato nombre={item.nombre} descripcion={item.descripcion} precio={item.precio} />
        </Link>
      )}
      ListFooterComponent={<DondeEstoy />}
      stickySectionHeadersEnabled={false}
    />
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
  pila: {
    color: colores.textoSecundario,
  },
  titulo: {
    color: colores.primario,
    fontSize: 20,
    fontWeight: '700',
    marginTop: espaciado.md,
  },
});
