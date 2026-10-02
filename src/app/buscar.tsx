import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { CATEGORIAS, NOMBRES_CATEGORIA, PLATOS, type Categoria } from '@/data/platos';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Buscar() {
  const { q = '', categoria } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  // Estado local solo para el TextInput: si lo atamos directo al param, en web el cursor salta.
  const [texto, setTexto] = useState(q);

  function cambiarTexto(nuevo: string) {
    setTexto(nuevo);
    // DEFENSA: setParams cambia la URL de ESTA pantalla sin apilar una nueva.
    // Así la búsqueda queda en la URL (/buscar?q=mila) y se puede compartir.
    router.setParams({ q: nuevo });
  }

  function elegirCategoria(nueva?: Categoria) {
    router.setParams({ categoria: nueva });
  }

  // La URL es la fuente de verdad: filtramos con los params, sin distinguir mayúsculas.
  const resultados = PLATOS.filter(
    (plato) =>
      plato.nombre.toLowerCase().includes(q.toLowerCase()) &&
      (categoria === undefined || plato.categoria === categoria),
  );

  return (
    <FlatList
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      data={resultados}
      keyExtractor={(plato) => String(plato.id)}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <TextInput
            style={styles.input}
            value={texto}
            onChangeText={cambiarTexto}
            placeholder="Buscar plato..."
            placeholderTextColor={colores.textoSecundario}
          />
          <View style={styles.chips}>
            <Chip texto="Todas" activo={categoria === undefined} onPress={() => elegirCategoria()} />
            {CATEGORIAS.map((cat) => (
              <Chip
                key={cat}
                texto={NOMBRES_CATEGORIA[cat]}
                activo={categoria === cat}
                onPress={() => elegirCategoria(cat)}
              />
            ))}
          </View>
        </View>
      }
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
      ListEmptyComponent={<MensajeEstado mensaje="No hay platos que coincidan con la búsqueda." />}
      ListFooterComponent={<DondeEstoy />}
    />
  );
}

// Botoncito para elegir categoría (solo se usa en esta pantalla).
function Chip({ texto, activo, onPress }: { texto: string; activo: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, activo && styles.chipActivo]}>
      <Text style={[styles.textoChip, activo && styles.textoChipActivo]}>{texto}</Text>
    </Pressable>
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
  encabezado: {
    gap: espaciado.sm,
    marginBottom: espaciado.sm,
  },
  input: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.md,
    padding: espaciado.sm,
    fontSize: 16,
    color: colores.texto,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaciado.sm,
  },
  chip: {
    paddingVertical: espaciado.xs,
    paddingHorizontal: espaciado.md,
    borderRadius: radios.lg,
    borderWidth: 1,
    borderColor: colores.primario,
    backgroundColor: colores.superficie,
  },
  chipActivo: {
    backgroundColor: colores.primario,
  },
  textoChip: {
    color: colores.primario,
    fontWeight: '600',
  },
  textoChipActivo: {
    color: colores.textoSobrePrimario,
  },
});
