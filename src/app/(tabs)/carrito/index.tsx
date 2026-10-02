import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Carrito() {
  const { items, total, cantidad, nota, deshacerUltimo, puedeDeshacer } = useComedor();

  return (
    <FlatList
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      data={items}
      keyExtractor={(item) => String(item.idItem)}
      renderItem={({ item }) => (
        <View style={styles.fila}>
          <Text style={styles.texto}>{item.plato.nombre}</Text>
          <Text style={styles.texto}>$ {item.plato.precio.toLocaleString('es-AR')}</Text>
        </View>
      )}
      ListEmptyComponent={<MensajeEstado mensaje="Tu carrito está vacío." />}
      ListFooterComponent={
        <View style={styles.pie}>
          <Text style={styles.total}>Total: $ {total.toLocaleString('es-AR')}</Text>
          {nota !== '' && <Text style={styles.nota}>Nota: {nota}</Text>}
          {/* DEFENSA: deshacer saca el tope de la Pila: el último plato agregado. */}
          <BotonPrimario
            titulo="Deshacer último"
            variante="secundario"
            onPress={deshacerUltimo}
            deshabilitado={!puedeDeshacer}
          />
          <Link href="/carrito/nota" style={styles.enlace}>
            {nota === '' ? 'Agregar una nota para la cocina' : 'Editar la nota'}
          </Link>
          {/* Si el carrito está vacío el botón queda deshabilitado y el Link no navega. */}
          <Link href="/confirmar" asChild>
            <BotonPrimario titulo="Confirmar pedido" deshabilitado={cantidad === 0} />
          </Link>
          <DondeEstoy />
        </View>
      }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: espaciado.md,
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.md,
  },
  texto: {
    color: colores.texto,
    fontSize: 16,
  },
  pie: {
    gap: espaciado.md,
    marginTop: espaciado.sm,
  },
  total: {
    color: colores.texto,
    fontSize: 20,
    fontWeight: '700',
  },
  nota: {
    color: colores.textoSecundario,
    fontStyle: 'italic',
  },
  enlace: {
    color: colores.primario,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
