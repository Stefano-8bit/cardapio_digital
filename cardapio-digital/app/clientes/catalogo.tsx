import { View, Text, Button, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { usePedido } from '../contexts/PedidoContext';
import axios from 'axios';

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const { adicionarItem } = usePedido();

  useEffect(() => {
    axios.get('http://localhost:3000/produtos').then((res) => setProdutos(res.data));
  }, []);

  return (
    <View className="p-4">
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-base font-medium">{item.nome} - R$ {item.valor.toFixed(2)}</Text>
            <Button title="Adicionar ao carrinho" onPress={() => adicionarItem(item)} />
          </View>
        )}
      />
    </View>
  );
}
