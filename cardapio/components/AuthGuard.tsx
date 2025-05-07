import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../hooks/useAuth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { empresa } = useAuth()

  console.log('AuthGuard empresa:', empresa) // ✅ debug

  if (!empresa) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Você precisa estar logado para acessar essa área.</Text>
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
  },
  text: {
    color: '#160b30', fontWeight: 'bold'
  }
})
