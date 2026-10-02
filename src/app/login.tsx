import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { useComedor } from '@/context/ComedorContext';
import { CLAVE_COCINA, USUARIO_COCINA } from '@/data/sesion';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Login() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    // DEFENSA: no navegamos después del login. Al iniciar sesión, el guard de login
    // pasa a false y Expo Router cierra este modal solo.
    if (!iniciarSesion(usuario, clave)) {
      setError('Usuario o clave incorrectos.');
    }
  }

  return (
    <Pantalla scroll>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        placeholderTextColor={colores.textoSecundario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        placeholderTextColor={colores.textoSecundario}
        secureTextEntry
      />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <BotonPrimario titulo="Ingresar" onPress={ingresar} />
      <Text style={styles.ayuda}>
        Para la prueba: usuario &quot;{USUARIO_COCINA}&quot;, clave &quot;{CLAVE_COCINA}&quot;.
      </Text>
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.md,
    padding: espaciado.sm,
    fontSize: 16,
    color: colores.texto,
  },
  error: {
    color: colores.error,
    fontWeight: '600',
  },
  ayuda: {
    color: colores.textoSecundario,
    textAlign: 'center',
  },
});
