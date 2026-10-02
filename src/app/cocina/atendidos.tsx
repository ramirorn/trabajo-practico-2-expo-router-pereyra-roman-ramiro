import { FlatList, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Atendidos() {
  // DEFENSA: los atendidos se guardan en una Pila; el contexto ya los da vueltos,
  // así que el primero de la lista es el más reciente (el tope de la pila).
  const { atendidos } = useComedor();

  return (
    <FlatList
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      data={atendidos}
      keyExtractor={(pedido) => String(pedido.numero)}
      renderItem={({ item }) => (
        <View style={styles.fila}>
          <Text style={styles.numero}>Pedido N° {item.numero}</Text>
          <Text style={styles.texto}>
            {item.items.length} ítems · $ {item.total.toLocaleString('es-AR')}
          </Text>
        </View>
      )}
      ListEmptyComponent={<MensajeEstado mensaje="Todavía no se atendió ningún pedido." />}
      ListFooterComponent={<DondeEstoy />}
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
  fila: {
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.md,
    gap: espaciado.xs,
  },
  numero: {
    color: colores.texto,
    fontSize: 17,
    fontWeight: '600',
  },
  texto: {
    color: colores.textoSecundario,
  },
});
