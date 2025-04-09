import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Carrinho() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Carrinho</Text>
      <Button title="Finalizar Pedido" onPress={() => router.push('/cliente/pedido/123')} />
    </View>
  );
}
