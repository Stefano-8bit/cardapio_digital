import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard';
import { styles } from './home.styles';

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
