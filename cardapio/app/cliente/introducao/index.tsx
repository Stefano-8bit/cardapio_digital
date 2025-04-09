import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Introducao() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Tutorial de como usar o app</Text>
      <Button title="Ir para Catálogo" onPress={() => router.push('/cliente/catalogo')} />
    </View>
  );
}
