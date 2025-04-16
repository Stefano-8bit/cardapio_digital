import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useCarrinho } from '../../../../hooks/useCarrinho';

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

export default function CatalogoPorEmpresa() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { carrinho, adicionar } = useCarrinho();
  const { id } = useLocalSearchParams();

  async function carregarCategorias() {
    try {
      const res = await fetch(`http://localhost:3004/categorias?empresaId=${id}`);
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
    if (id) carregarCategorias();
  }, [id]);

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
                {produto.descricao && (
                  <Text style={styles.descProduto}>{produto.descricao}</Text>
                )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  carrinho: {
    fontSize: 16,
    color: '#160b30',
  },
  categoriaBloco: {
    marginBottom: 24,
  },
  categoriaTitulo: {
    backgroundColor: '#ddd',
    padding: 6,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cardProduto: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: 'row',
    padding: 10,
  },
  fotoProduto: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  infoProduto: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeProduto: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  valorProduto: {
    fontSize: 14,
    color: '#160b30',
    marginBottom: 4,
  },
  descProduto: {
    fontSize: 12,
    color: '#555',
  },
  botaoAdicionar: {
    marginTop: 8,
    backgroundColor: '#ffcc00',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#160b30',
    fontWeight: 'bold',
  },
});
