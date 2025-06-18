import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { usePedido } from '../../../hooks/usePedido';
import { useAuth } from '../../../hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from './login.styles';

export default function LoginCliente() {
  const { setPedido } = usePedido();
  const { login } = useAuth();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert('Erro', 'Preencha CPF e senha');
      return;
    }

    try {
      const res = await fetch('http://localhost:3004/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data?.erro || 'Falha no login');
        return;
      }

      login({ ...data.usuario, tipo: 'cliente' });
      setPedido((p) => ({ ...p, cliente: data.usuario }));
      router.replace('/cliente/introducao');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Erro de conexão com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgDcx-I2OLjGtFKlaAY1B89BZASmqHcZQ2w&s' }}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.form}>
        <Text style={styles.label}>CPF:</Text>
        <TextInput
          placeholder="Digite seu CPF"
          placeholderTextColor="#999"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
