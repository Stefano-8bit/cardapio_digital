import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginEmpresa() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3000/empresa/login', { nome, senha });
      localStorage.setItem('empresaId', res.data.id);
      router.push('/empresa/menu');
    } catch (e) {
      setErro('Login inválido');
    }
  };

  return (
    <View>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
      <Button title="Entrar" onPress={login} />
      {erro && <Text>{erro}</Text>}
    </View>
  );
}
