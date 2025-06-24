import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useCarrinho } from '../../../hooks/useCarrinho';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { styles } from './catalogo.styles';

interface Produto {
  id: number;
  nome: string;
  foto?: string;
  valor: number;
  descricao?: string;
}

interface Categoria {
  id: number;
  nome: string;
  produtos: Produto[];
}

function CatalogoClienteContent() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { carrinho, adicionar } = useCarrinho();

  async function carregarCategorias() {
    try {
      const res = await fetch('http://localhost:3004/categorias');
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  function adicionarAoCarrinho(produto: Produto) {
    adicionar(produto);
    Alert.alert('Adicionado', `${produto.nome} foi adicionado ao carrinho.`);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>LOGO</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.botaoTopo} onPress={() => router.push('/cliente/pedido/index')}>
              <Text style={styles.botaoTopoTexto}>Pedidos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {categorias.map((categoria) => (
          <View key={categoria.id} style={styles.categoriaBloco}>
            <Text style={styles.categoriaTitulo}>{categoria.nome}</Text>
            {categoria.produtos.map((produto) => (
              <View key={produto.id} style={styles.cardProduto}>
                {produto.foto && (
                  <Image source={{ uri: produto.foto }} style={styles.fotoProduto} />
                )}
                <View style={styles.infoProduto}>
                  <Text style={styles.nomeProduto}>{produto.nome}</Text>
                  <Text style={styles.valorProduto}>R$ {produto.valor.toFixed(2)}</Text>
                  {produto.descricao && <Text style={styles.descProduto}>{produto.descricao}</Text>}
                  <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={() => adicionarAoCarrinho(produto)}
                  >
                    <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {totalItens > 0 && (
        <TouchableOpacity
          style={estilo.botaoCarrinhoFixo}
          onPress={() => router.push('/cliente/carrinho')}
        >
          <Text style={estilo.textoBotaoCarrinho}>
            Ver Carrinho ({totalItens}) item{totalItens > 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function CatalogoCliente() {
  return (
    <ProtectedRoute>
      <CatalogoClienteContent />
    </ProtectedRoute>
  );
}

const estilo = StyleSheet.create({
  botaoCarrinhoFixo: {
    backgroundColor: '#160b30',
    paddingVertical: 16,
    alignItems: 'center',
  },
  textoBotaoCarrinho: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
