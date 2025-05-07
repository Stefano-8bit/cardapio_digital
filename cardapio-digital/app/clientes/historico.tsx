import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Historico() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('clienteId');
    axios.get(`http://localhost:3000/pedidos/usuario/${id}`).then((res) => setPedidos(res.data));
  }, []);

  return (
    <View>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.produto.nome} - {item.status}</Text>
        )}
      />
    </View>
  );
}
