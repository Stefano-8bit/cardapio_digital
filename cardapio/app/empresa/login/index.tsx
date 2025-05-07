import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { useAuth } from '../../../hooks/useAuth'

export default function LoginEmpresa() {
  const { login } = useAuth()
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3004/empresa/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }),
      })

      const data = await response.json()
      console.log('Login response:', data) // ✅ debug

      if (!response.ok || !data.empresa) {
        Alert.alert('Erro', data.erro || 'Falha no login')
        return
      }

      login(data.empresa) // ✅ empresa.id e empresa.nome
      router.push('/empresa/home')
    } catch (err) {
      Alert.alert('Erro', 'Erro ao conectar no servidor')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome da Empresa:</Text>
        <TextInput
          placeholder="Digite o nome"
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
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  form: { padding: 20 },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#160b30',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#160b30',
    color: '#160b30',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#160b30',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
