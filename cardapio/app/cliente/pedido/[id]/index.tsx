import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Pedido() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Confirmação do Pedido {id}</Text>
      <Button title="Confirmar" onPress={() => {}} />
    </View>
  );
}
    