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
  const { carrinho, remover, limpar, atualizarQuantidade } = useCarrinho();
  const [metodoPagamento, setMetodoPagamento] = useState('');

  const total = carrinho.reduce((soma, item) => soma + item.valor * item.quantidade, 0);

  function finalizarPedido() {
    if (!metodoPagamento) {
      Alert.alert('Escolha um método de pagamento');
      return;
    }
    Alert.alert('Pedido finalizado', `Pagamento: ${metodoPagamento}`);
    limpar();
    const pedidoId = Date.now();
    router.push(`/cliente/pedido/${pedidoId}`);
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.voltar}>{'<'} Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Seu Carrinho</Text>

      {carrinho.length === 0 && <Text style={styles.vazio}>Seu carrinho está vazio.</Text>}

      {carrinho.map((item, index) => (
        <View key={`${item.id}-${index}`} style={styles.item}>
          <View style={styles.infoProduto}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.valor}>R$ {(item.valor * item.quantidade).toFixed(2)}</Text>
            {item.descricao && <Text style={styles.descricao}>{item.descricao}</Text>}

            <View style={styles.quantidadeContainer}>
              <TouchableOpacity onPress={() => atualizarQuantidade(item.id, item.quantidade - 1)}>
                <Text style={styles.qtdBotao}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtdNumero}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}>
                <Text style={styles.qtdBotao}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => remover(item.id)}>
            <Text style={styles.remover}>Remover</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <Text style={styles.label}>Escolha o método de pagamento:</Text>
      <View style={styles.pagamentos}>
        {['Dinheiro', 'Cartão', 'Pix'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.metodo, metodoPagamento === m && styles.metodoSelecionado]}
            onPress={() => setMetodoPagamento(m)}
          >
            <Text style={styles.metodoTexto}>{m}</Text>
          </TouchableOpacity>
        ))}
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
    fontSize: 16,
    color: '#160b30',
    marginBottom: 10,
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
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  pagamentos: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  metodo: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  metodoSelecionado: {
    backgroundColor: '#ffcc00',
  },
  metodoTexto: {
    color: '#160b30',
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    backgroundColor: '#160b30',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  qtdBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qtdNumero: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
