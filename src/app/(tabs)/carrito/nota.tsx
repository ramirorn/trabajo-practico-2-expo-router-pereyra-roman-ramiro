import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Nota() {
  const { nota, guardarNota } = useComedor();
  // Copia local: la nota solo se guarda en el contexto al tocar "Guardar".
  const [texto, setTexto] = useState(nota);

  function guardar() {
    guardarNota(texto.trim());
    // router y no Link: primero guardamos (lógica) y después cerramos la hoja.
    router.back();
  }

  return (
    <Pantalla scroll>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="Ej.: sin cebolla, retiro a las 12:30"
        placeholderTextColor={colores.textoSecundario}
        multiline
      />
      <BotonPrimario titulo="Guardar" onPress={guardar} />
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 100,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.md,
    padding: espaciado.sm,
    fontSize: 16,
    color: colores.texto,
    textAlignVertical: 'top',
  },
});
