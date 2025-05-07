import { View, Text, TextInput, Button } from 'react-native';
import { usePedido } from '../../../hooks/usePedido';
import { useAuth } from '../../../hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const { setPedido } = usePedido();
  const { login } = useAuth();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const handleLogin = () => {
    const usuario = { id: Date.now(), nome, cpf }; // ID fictício
    login(usuario);
    setPedido((p) => ({ ...p, cliente: { ...usuario } }));
    router.replace('/cliente/introducao');
  };

  return (
    <View style={{ padding: 20 }}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgDcx-I2OLjGtFKlaAY1B89BZASmqHcZQ2w&s" alt="imagem logo" width={200} />
      <Text>Login</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={{ marginBottom: 20, borderBottomWidth: 1 }}
      />
      <Button title="Avançar" onPress={handleLogin} />
    </View>
  );
}
