import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Home</Text>
      <Button title="Histórico" onPress={() => router.push('/historico')} />
      <Button title="KDS" onPress={() => router.push('/kds')} />
    </View>
  );
}
