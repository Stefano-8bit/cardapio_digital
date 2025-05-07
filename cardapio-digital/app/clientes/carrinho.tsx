import { View, Text, FlatList, Button } from 'react-native';
import { usePedido } from '../contexts/PedidoContext';

export default function Carrinho() {
  const { carrinho, removerItem, limparCarrinho } = usePedido();

  const total = carrinho.reduce((acc, item) => acc + item.valor, 0);

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-2">Carrinho</Text>
      <FlatList
        data={carrinho}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="mb-2">
            <Text>{item.nome} - R$ {item.valor.toFixed(2)}</Text>
            <Button title="Remover" onPress={() => removerItem(index)} />
          </View>
        )}
      />
      <Text className="mt-4 font-semibold">Total: R$ {total.toFixed(2)}</Text>
      <Button title="Finalizar Compra" onPress={limparCarrinho} />
    </View>
  );
}

