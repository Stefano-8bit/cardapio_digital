import { Slot } from 'expo-router';
import { CarrinhoProvider } from '../hooks/useCarrinho';
import { PedidoProvider } from '../hooks/usePedido';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function LogoutButton() {
  const { logout } = useAuth();

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
    backgroundColor: '#160b30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    top: 40,
    right: 20,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
