import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { usePedido } from '../../../hooks/usePedido';
import { router } from 'expo-router';

export default function Login() {
  const { setPedido } = usePedido();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgDcx-I2OLjGtFKlaAY1B89BZASmqHcZQ2w&s' }}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.form}>
        <Text style={styles.label}>email:</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          onChangeText={(email) =>
            setPedido((p) => ({ ...p, cliente: { ...p.cliente, email } }))
          }
        />
        <Text style={styles.label}>senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          onChangeText={(senha) =>
            setPedido((p) => ({ ...p, cliente: { ...p.cliente, senha } }))
          }
        />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/empresa/home')}>
          <Text style={styles.buttonText}>continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 250,
    backgroundColor: '#ccc',
  },
  form: {
    padding: 20,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#000',
  },
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
