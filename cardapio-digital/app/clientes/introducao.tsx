import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Introducao() {
  const router = useRouter();

  return (
    <View>
      <Text>Bem-vindo ao cardápio digital!</Text>
      <Button title="Ver catálogo" onPress={() => router.push('/clientes/catalogo')} />
    </View>
  );
}
