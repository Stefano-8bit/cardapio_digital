import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCarrinho } from '../../../hooks/useCarrinho';
import { router } from 'expo-router';

export default function Carrinho() {
  const { carrinho, remover, limpar } = useCarrinho();
  const [pagamento, setPagamento] = useState<'dinheiro' | 'cartao' | 'pix' | null>(null);

  const total = carrinho.reduce((soma, item) => soma + item.valor, 0);

  function finalizarPedido() {
    if (!pagamento) {
      Alert.alert('Escolha a forma de pagamento');
      return;
    }
    Alert.alert('Pedido finalizado', `Pagamento via ${pagamento.toUpperCase()}`);
    limpar();
    router.push('/cliente/catalogo');
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
        <Text style={styles.voltarTexto}>←</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Seu Carrinho</Text>

      {carrinho.length === 0 && <Text style={styles.vazio}>Seu carrinho está vazio.</Text>}

      {carrinho.map((item, index) => (
        <View key={`${item.id}-${index}`} style={styles.item}>
          <View style={styles.infoProduto}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
            {item.descricao && <Text style={styles.descricao}>{item.descricao}</Text>}
          </View>
          <TouchableOpacity onPress={() => remover(item.id)}>
            <Text style={styles.remover}>Remover</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <View style={styles.pagamentosBox}>
        <Text style={styles.subtitulo}>Forma de pagamento:</Text>
        <View style={styles.pagamentosOpcoes}>
          {['dinheiro', 'cartao', 'pix'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[styles.botaoPagamento, pagamento === tipo && styles.botaoSelecionado]}
              onPress={() => setPagamento(tipo as any)}
            >
              <Text style={styles.textoPagamento}>{tipo.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {carrinho.length > 0 && (
        <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarPedido}>
          <Text style={styles.textoBotao}>Finalizar Pedido</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  voltar: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  voltarTexto: {
    fontSize: 18,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  item: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoProduto: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    color: '#160b30',
    marginTop: 4,
  },
  descricao: {
    fontSize: 12,
    color: '#555',
  },
  remover: {
    color: 'red',
    marginTop: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  },
  pagamentosBox: {
    marginTop: 30,
  },
  subtitulo: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pagamentosOpcoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoPagamento: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  botaoSelecionado: {
    backgroundColor: '#ffcc00',
  },
  textoPagamento: {
    color: '#160b30',
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    backgroundColor: '#160b30',
    padding: 14,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});