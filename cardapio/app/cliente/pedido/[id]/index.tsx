import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../../../hooks/useAuth';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { router } from 'expo-router';

type Pedido = {
  id: number;
  status: 'PENDENTE' | 'CONFIRMADO' | 'PRONTO' | 'CANCELADO' | 'RETIRADO';
  produto: {
    nome: string;
  };
};

function PedidosContent() {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function buscarPedidos() {
    try {
      const res = await fetch(`http://localhost:3004/pedidos/usuario/${usuario?.id}`);
      const data = await res.json();
      if (res.ok) setPedidos(data);
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err);
    }
  }

  async function confirmarRetirada(id: number) {
    try {
      const res = await fetch(`http://localhost:3004/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RETIRADO' }),
      });

      if (res.ok) {
        buscarPedidos();
      } else {
        Alert.alert('Erro', 'Falha ao confirmar retirada');
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro ao atualizar status');
    }
  }

  useEffect(() => {
    buscarPedidos();
    const interval = setInterval(buscarPedidos, 3000);
    return () => clearInterval(interval);
  }, []);

  function corStatus(status: string) {
    if (status === 'PRONTO') return '#00cc66';
    if (status === 'RETIRADO') return '#aaa';
    return '#cc0000';
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Seus Pedidos</Text>

        {pedidos.map((pedido) => (
          <View key={pedido.id} style={[styles.cardContainer]}>
            <View style={[styles.statusBar, { backgroundColor: corStatus(pedido.status) }]} />
            <View style={styles.card}>
              <Text style={styles.texto}>Pedido #{pedido.id}</Text>
              <Text style={styles.texto}>Produto: {pedido.produto.nome}</Text>
              <Text style={styles.texto}>
                Status:{' '}
                {pedido.status === 'PRONTO'
                  ? 'Pronto para retirada'
                  : pedido.status === 'RETIRADO'
                  ? 'Retirado'
                  : 'Aguardando preparo...'}
              </Text>

              {pedido.status === 'PRONTO' && (
                <TouchableOpacity
                  style={styles.botao}
                  onPress={() => confirmarRetirada(pedido.id)}
                >
                  <Text style={styles.botaoTexto}>Confirmar Retirada</Text>
                </TouchableOpacity>
              )}

              {pedido.status !== 'PRONTO' && (
                <View style={styles.botao}>
                  <Text style={styles.botaoTexto}>
                    {pedido.status === 'RETIRADO'
                      ? 'Pedido já retirado'
                      : 'Aguardando confirmação do bar...'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.voltarBotao} onPress={() => router.replace('/cliente/catalogo')}>
        <Text style={styles.voltarTexto}>Voltar para o Catálogo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Pedidos() {
  return (
    <ProtectedRoute>
      <PedidosContent />
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusBar: {
    width: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  texto: {
    fontSize: 16,
    marginBottom: 6,
  },
  botao: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  voltarBotao: {
    backgroundColor: '#160b30',
    padding: 16,
    alignItems: 'center',
  },
  voltarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
