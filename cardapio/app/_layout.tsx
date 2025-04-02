import React from 'react';
import { Stack } from 'expo-router';
import { PedidoProvider } from '../hooks/usePedido';

export default function Layout() {
  return (
    <PedidoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PedidoProvider>
  );
}
