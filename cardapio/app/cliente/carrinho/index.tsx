import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCarrinho } from '../../../hooks/useCarrinho';
import { useAuth } from '../../../hooks/useAuth';
import { router } from 'expo-router';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { styles } from './carrinho.styles';

function CarrinhoContent() {
  const { carrinho, remover, limpar, atualizarQuantidade } = useCarrinho();
  const { usuario } = useAuth();
  const [metodoPagamento, setMetodoPagamento] = useState('');

  const total = carrinho.reduce((soma, item) => soma + item.valor * item.quantidade, 0);

  async function finalizarPedido() {
    if (!metodoPagamento) {
      Alert.alert('Escolha um método de pagamento');
      return;
    }

    if (!usuario || !usuario.id) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    const itens = carrinho.map((item) => ({
      produtoId: item.id,
      valor: item.valor,
      quantidade: item.quantidade,
    }));

    try {
      const res = await fetch('http://localhost:3004/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId: usuario.id, itens }),
      });

      const resposta = await res.json();

      if (!res.ok) {
        Alert.alert('Erro ao criar pedido', JSON.stringify(resposta));
        return;
      }

      const primeiroId = resposta[0]?.id;
      if (primeiroId) {
        Alert.alert('Pedido enviado com sucesso', `Pagamento: ${metodoPagamento}`);
        limpar();
        router.push(`/cliente/pedido/${primeiroId}`);
      } else {
        Alert.alert('Erro', 'Não foi possível identificar o pedido.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      Alert.alert('Erro', 'Não foi possível enviar o pedido');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/cliente/catalogo')}>
  <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
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

export default function Carrinho() {
  return (
    <ProtectedRoute>
      <CarrinhoContent />
    </ProtectedRoute>
  );
}
