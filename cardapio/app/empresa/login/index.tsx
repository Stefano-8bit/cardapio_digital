import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './login.styles';

export default function Login() {
  const { login } = useAuth();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3004/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', data.erro || 'Falha no login');
        return;
      }

      login(data.usuario || data);
      router.push('/empresa/home');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar com o servidor');
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.banner}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          placeholder="Digite seu Cnpj"
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={setCpf}
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
