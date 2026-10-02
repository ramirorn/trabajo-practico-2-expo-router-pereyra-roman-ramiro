import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { LogoIPF } from '@/components/LogoIPF';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaAcceso } from '@/components/TarjetaAcceso';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Inicio() {
  const { usuario } = useComedor();

  return (
    <Pantalla scroll>
      {/* Encabezado institucional: logo y saludo en una tarjeta con borde verde. */}
      <View style={styles.encabezado}>
        <LogoIPF ancho={220} />
        <Text style={styles.saludo}>¡Hola! Bienvenido al Comedor IPF</Text>
        <Text style={styles.subtitulo}>¿Qué querés comer hoy?</Text>
      </View>

      {/* DEFENSA: usamos <Link> porque el usuario toca algo para ir a otra pantalla. */}
      <Link href="/menu" asChild>
        <TarjetaAcceso titulo="Menú" descripcion="Ver todos los platos" icono="restaurant" />
      </Link>
      <Link href="/buscar" asChild>
        <TarjetaAcceso titulo="Buscar" descripcion="Encontrá un plato por nombre" icono="search" />
      </Link>
      <Link href="/ayuda" asChild>
        <TarjetaAcceso titulo="Ayuda" descripcion="Horarios, pagos y turnos" icono="help-circle" />
      </Link>
      {/* Sin sesión, la tarjeta de cocina lleva al login. */}
      <Link href={usuario !== null ? '/cocina' : '/login'} asChild>
        <TarjetaAcceso
          titulo="Cocina"
          descripcion={usuario !== null ? 'Atender pedidos' : 'Ingresar como personal de cocina'}
          icono="flame"
        />
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    backgroundColor: colores.superficie,
    borderRadius: radios.lg,
    borderBottomWidth: 4,
    borderBottomColor: colores.acento,
    padding: espaciado.md,
    gap: espaciado.xs,
    alignItems: 'center',
  },
  saludo: {
    color: colores.texto,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitulo: {
    color: colores.textoSecundario,
    fontSize: 16,
  },
});
