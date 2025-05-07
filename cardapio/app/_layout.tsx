import { Slot } from 'expo-router';
import { CarrinhoProvider } from '../hooks/useCarrinho';
import { PedidoProvider } from '../hooks/usePedido';
import { AuthProvider } from '../hooks/useAuth';

export default function Layout() {
  return (
    <AuthProvider>
      <PedidoProvider>
        <CarrinhoProvider>
          <Slot />
        </CarrinhoProvider>
      </PedidoProvider>
    </AuthProvider>
  );
}
