import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  return (
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
          <Text style={styles.buttonText}>Catalogo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/empresa/historico')}>
          <Text style={styles.buttonText}>Historico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/empresa/kds')}>
          <Text style={styles.buttonText}>KDS</Text>
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
  logoContainer: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 20,
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
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
