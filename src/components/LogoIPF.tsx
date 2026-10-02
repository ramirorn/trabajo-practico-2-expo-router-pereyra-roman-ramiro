import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

interface Props {
  ancho?: number;
}

// Logo del Instituto Politécnico Formosa.
// Usamos Image de expo-image porque muestra .webp igual en Android, iOS y web.
export function LogoIPF({ ancho = 260 }: Props) {
  return (
    <Image
      source={require('@/assets/images/logo-ipf.webp')}
      style={[styles.logo, { width: ancho }]}
      contentFit="contain"
      accessibilityLabel="Logo del Instituto Politécnico Formosa"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    // El archivo mide 640 × 254, así que mantenemos esa proporción.
    aspectRatio: 640 / 254,
    alignSelf: 'center',
  },
});
