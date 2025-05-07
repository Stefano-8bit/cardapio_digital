import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { usePedido } from '../../../hooks/usePedido';
import { useAuth } from '../../../hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';
import { styles } from './login.styles';

export default function LoginCliente() {
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
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgDcx-I2OLjGtFKlaAY1B89BZASmqHcZQ2w&s' }}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.form}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>CPF:</Text>
        <TextInput
          placeholder="Digite seu CPF"
          placeholderTextColor="#999"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
