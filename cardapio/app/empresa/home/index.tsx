import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard'; // importa o guard

export default function Home() {
  return (
    <AuthGuard>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgDcx-I2OLjGtFKlaAY1B89BZASmqHcZQ2w&s' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/empresa/catalogo')}>
            <Text style={styles.buttonText}>Catálogo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/empresa/historico')}>
            <Text style={styles.buttonText}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/empresa/kds')}>
            <Text style={styles.buttonText}>KDS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#160b30',
  },
  logo: {
    width: 150,
    height: 50,
  },
  buttonContainer: {
    padding: 20,
    gap: 16,
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#160b30',
    alignItems: 'center',
  },
  buttonText: {
    color: '#160b30',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
