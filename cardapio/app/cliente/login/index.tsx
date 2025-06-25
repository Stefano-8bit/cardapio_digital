import { View, Text, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
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
  const [showModal, setShowModal] = useState(false);

  const [nomeCadastro, setNomeCadastro] = useState('');
  const [cpfCadastro, setCpfCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [erroSenha, setErroSenha] = useState(false);
  const [erroCpf, setErroCpf] = useState(false);

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

      if (!data.usuario || !data.usuario.id) {
        Alert.alert('Erro', 'Usuário inválido retornado pela API');
        return;
      }

      login({ ...data.usuario, id: String(data.usuario.id), tipo: 'cliente' });
      setPedido((p) => ({ ...p, cliente: data.usuario }));
      router.replace('/cliente/introducao');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Erro de conexão com o servidor');
    }
  };

  const handleCadastro = async () => {
    if (!nomeCadastro || !cpfCadastro || !senhaCadastro) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3004/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCadastro, cpf: cpfCadastro, senha: senhaCadastro }),
      });

      const data = await res.json();

      if (!res.ok) {
  const erro = data?.erro || data?.message || JSON.stringify(data);

  if (erro.toLowerCase().includes('senha')) {
    setErroSenha(true);
    setErroCpf(false);
    Alert.alert('Senha inválida', erro);
  } else if (erro.toLowerCase().includes('cpf') || erro.includes('P2002')) {
    setErroCpf(true);
    setErroSenha(false);
    Alert.alert('CPF já cadastrado', 'Esse CPF já está em uso. Tente fazer login.');
  } else {
    setErroCpf(false);
    setErroSenha(false);
    Alert.alert('Erro', erro || 'Erro ao cadastrar');
  }

  return;
}

      setErroSenha(false);
      setErroCpf(false);
      Alert.alert('Sucesso', 'Cadastro realizado. Agora faça login.');
      setShowModal(false);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Erro de conexão com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.banner}
        resizeMode="contain"
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
        <Text style={styles.label}>SENHA:</Text>
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

        <View>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={{ color: '#160b30', textAlign: 'center', marginTop: 12 }}>
              Não tem conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Cadastro</Text>
            <TextInput
              placeholder="Nome"
              placeholderTextColor="#999"
              style={styles.input}
              value={nomeCadastro}
              onChangeText={setNomeCadastro}
            />
            <TextInput
              placeholder="CPF"
              placeholderTextColor="#999"
              style={[styles.input, erroCpf && styles.inputErro]}
              value={cpfCadastro}
              onChangeText={setCpfCadastro}
            />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              style={[styles.input, erroSenha && styles.inputErro]}
              secureTextEntry
              value={senhaCadastro}
              onChangeText={setSenhaCadastro}
            />
            <Text style={styles.regrasSenha}>
              A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.
            </Text>

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
