import React, { createContext, useContext, useState, ReactNode } from 'react';

type Cliente = {
  nome: string;
  cpf: string;
};

type Produto = {
  id: string;
  nome: string;
  valor: number;
};

type Pedido = {
  cliente: Cliente;
  produtos: Produto[];
  status: 'aberto' | 'finalizado';
};

type PedidoContextType = {
  pedido: Pedido;
  setPedido: React.Dispatch<React.SetStateAction<Pedido>>;
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [pedido, setPedido] = useState<Pedido>({
    cliente: { nome: '', cpf: '' },
    produtos: [],
    status: 'aberto',
  });

  return (
    <PedidoContext.Provider value={{ pedido, setPedido }}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido deve ser usado dentro de um PedidoProvider');
  }
  return context;
}
