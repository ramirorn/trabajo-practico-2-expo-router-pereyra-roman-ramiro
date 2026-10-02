import { StyleSheet, Text, View } from 'react-native';

import type { ItemCarrito } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

interface Props {
  items: ItemCarrito[];
  nota: string;
  total: number;
}

// Muestra los ítems, la nota y el total. Se usa en /confirmar y en la cocina.
export function ResumenPedido({ items, nota, total }: Props) {
  return (
    <View style={styles.caja}>
      {items.map((item) => (
        <View key={item.idItem} style={styles.fila}>
          <Text style={styles.texto}>{item.plato.nombre}</Text>
          <Text style={styles.texto}>$ {item.plato.precio.toLocaleString('es-AR')}</Text>
        </View>
      ))}
      {nota !== '' && <Text style={styles.nota}>Nota: {nota}</Text>}
      <View style={styles.fila}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>$ {total.toLocaleString('es-AR')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.md,
    gap: espaciado.sm,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: espaciado.md,
  },
  texto: {
    color: colores.texto,
    fontSize: 15,
  },
  nota: {
    color: colores.textoSecundario,
    fontStyle: 'italic',
  },
  total: {
    color: colores.texto,
    fontSize: 17,
    fontWeight: '700',
  },
});
