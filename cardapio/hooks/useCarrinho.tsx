import { createContext, useContext, useState } from 'react';

export type Produto = {
  id: number;
  nome: string;
  valor: number;
  foto?: string;
  descricao?: string;
};

interface CarrinhoContextType {
  carrinho: Produto[];
  adicionar: (produto: Produto) => void;
  remover: (id: number) => void;
  limpar: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  function adicionar(produto: Produto) {
    setCarrinho((prev) => [...prev, produto]);
  }

  function remover(id: number) {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  }

  function limpar() {
    setCarrinho([]);
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, remover, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error('useCarrinho deve estar dentro do CarrinhoProvider');
  return context;
}
