import { View, Text, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './login.styles';

export default function Login() {
  const { login } = useAuth();
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3004/empresa/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', data.erro || 'Falha no login');
        return;
      }

      login({ ...data, tipo: 'empresa' });
      router.push('/empresa/home');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar com o servidor');
    }
  }

  async function handleCadastro() {
    if (!nomeCadastro || !senhaCadastro) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3004/empresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCadastro, senha: senhaCadastro }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.erro || 'Erro ao cadastrar empresa');
        return;
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      setShowModal(false);
    } catch (err) {
      Alert.alert('Erro', 'Erro de conexão com o servidor');
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
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          placeholder="Digite o nome da empresa"
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={setNome}
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
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={{ color: '#160b30', textAlign: 'center', marginTop: 12 }}>
            Não tem conta? Cadastre sua empresa
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Cadastro da Empresa</Text>
            <TextInput
              placeholder="Nome da empresa"
              placeholderTextColor="#999"
              style={styles.input}
              value={nomeCadastro}
              onChangeText={setNomeCadastro}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
              value={senhaCadastro}
              onChangeText={setSenhaCadastro}
            />
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ marginTop: 10, textAlign: 'center', color: 'red' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
