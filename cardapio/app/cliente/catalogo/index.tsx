import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>LOGO</Text>
        <TouchableOpacity onPress={() => router.push('/cliente/carrinho')}>
          <Text style={styles.carrinho}>Carrinho ({carrinho.length}) →</Text>
        </TouchableOpacity>
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
  );
}

export default function CatalogoCliente() {
  return (
    <ProtectedRoute>
      <CatalogoClienteContent />
    </ProtectedRoute>
  );
}
