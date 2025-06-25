import { View, Text, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';
import { styles } from './login.styles';

export default function Login() {
  const { login } = useAuth();
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

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
    if (!novoNome || !novaSenha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3004/empresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome, senha: novaSenha }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', data.erro || 'Erro ao cadastrar');
        return;
      }

      Alert.alert('Sucesso', 'Empresa cadastrada com sucesso!');
      setModalVisible(false);
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
        <Text style={styles.label}>CNPJ:</Text>
        <TextInput
          placeholder="Digite o nome da empresa"
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={setNome}
        />
        <Text style={styles.label}>SENHA:</Text>
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

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ textAlign: 'center', color: '#002855', marginTop: 12 }}>
            Criar nova conta
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Cadastro da Empresa</Text>
            <TextInput
              placeholder="Nome da empresa"
              placeholderTextColor="#999"
              style={styles.input}
              value={novoNome}
              onChangeText={setNovoNome}
            />
            <TextInput
  placeholder="Senha"
  placeholderTextColor="#999"
  style={styles.input}
  secureTextEntry
  value={novaSenha}
  onChangeText={setNovaSenha}
/>
<Text style={styles.regrasSenha}>
  A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.
</Text>

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
