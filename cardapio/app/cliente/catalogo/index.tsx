import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Catalogo() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Catálogo</Text>
      <Button title="Ir para Carrinho" onPress={() => router.push('/cliente/carrinho')} />
      <Button title="Abrir Filtro" />
    </View>
  );
}
