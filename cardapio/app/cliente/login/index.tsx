import { View, Text, TextInput, Button } from 'react-native';
import { usePedido } from '../../../hooks/usePedido';
import { router } from 'expo-router';

export default function Login() {
  const { setPedido } = usePedido();

  return (
    <View style={{ padding: 20 }}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgDcx-I2OLjGtFKlaAY1B89BZASmqHcZQ2w&s" alt="imagem logo" width={200}/>
      <Text>Login</Text>
      <TextInput placeholder="Nome" onChangeText={(nome) => setPedido((p) => ({ ...p, cliente: { ...p.cliente, nome } }))} />
      <TextInput placeholder="CPF" onChangeText={(cpf) => setPedido((p) => ({ ...p, cliente: { ...p.cliente, cpf } }))} />
      <Button title="Avançar" onPress={() => router.push('/cliente/introducao')} />
    </View>
  );
}
