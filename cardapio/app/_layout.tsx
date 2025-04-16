import { Slot } from 'expo-router';
import { CarrinhoProvider } from '../hooks/useCarrinho';
import { PedidoProvider } from '../hooks/usePedido';

export default function Layout() {
  return (
    <PedidoProvider>
      <CarrinhoProvider>
        <Slot />
      </CarrinhoProvider>
    </PedidoProvider>
  );
}
