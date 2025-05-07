import { Slot } from 'expo-router';
import { CarrinhoProvider } from '../hooks/useCarrinho';

export default function Layout() {
  return (
    <CarrinhoProvider>
      <Slot />
    </CarrinhoProvider>
  );
}
