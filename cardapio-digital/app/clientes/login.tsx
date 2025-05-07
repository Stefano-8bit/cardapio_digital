import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginCliente() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3000/usuarios/login', { cpf, senha });
      localStorage.setItem('clienteId', res.data.id);
      router.push('/clientes/introducao');
    } catch (e) {
      setErro('Login inválido');
    }
  };

  return (
    <View>
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Entrar" onPress={login} />
      {erro && <Text>{erro}</Text>}
    </View>
  );
}
