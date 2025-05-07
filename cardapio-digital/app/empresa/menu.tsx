import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuEmpresa() {
  const router = useRouter();

  return (
    <View>
      <Button title="Catálogo" onPress={() => router.push('/empresa/catalogo')} />
      <Button title="Histórico" onPress={() => router.push('/empresa/historico')} />
      <Button title="KDS" onPress={() => router.push('/empresa/kds')} />
    </View>
  );
}

