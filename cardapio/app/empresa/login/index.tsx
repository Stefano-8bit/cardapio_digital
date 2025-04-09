import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { usePedido } from '../../../hooks/usePedido';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const { setPedido } = usePedido();
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

      setPedido((p) => ({ ...p, cliente: data }));
      router.push('/empresa/home');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar com o servidor');
    }
  }

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
          style={styles.input}
          onChangeText={setCpf}
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 250, backgroundColor: '#ccc' },
  form: { padding: 20 },
  label: { marginBottom: 4, fontSize: 14, color: '#000' },
  input: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
