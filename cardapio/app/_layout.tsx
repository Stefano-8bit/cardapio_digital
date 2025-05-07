import { Slot } from 'expo-router';
import { CarrinhoProvider } from '../hooks/useCarrinho';
import { PedidoProvider } from '../hooks/usePedido';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { View, Button, StyleSheet } from 'react-native';

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <View style={styles.logoutButton}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <PedidoProvider>
        <CarrinhoProvider>
          <View style={{ flex: 1 }}>
            <Slot />
            <LogoutButton />
          </View>
        </CarrinhoProvider>
      </PedidoProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
  },
});
