import { createContext, useContext, useState } from 'react';

export type Produto = {
  id: number;
  nome: string;
  valor: number;
  foto?: string;
  descricao?: string;
  quantidade: number;
};

interface CarrinhoContextType {
  carrinho: Produto[];
  adicionar: (produto: Omit<Produto, 'quantidade'>) => void;
  remover: (id: number) => void;
  limpar: () => void;
  atualizarQuantidade: (id: number, novaQuantidade: number) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  function adicionar(produto: Omit<Produto, 'quantidade'>) {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  }

  function remover(id: number) {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  }

  function limpar() {
    setCarrinho([]);
  }

  function atualizarQuantidade(id: number, novaQuantidade: number) {
    if (novaQuantidade <= 0) {
      remover(id);
      return;
    }

    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: novaQuantidade } : p
      )
    );
  }

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, adicionar, remover, limpar, atualizarQuantidade }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error('useCarrinho deve estar dentro do CarrinhoProvider');
  return context;
}
