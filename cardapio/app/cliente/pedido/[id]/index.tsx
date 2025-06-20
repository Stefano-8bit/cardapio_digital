import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import ProtectedRoute from '../../../../components/ProtectedRoute';

function PedidoContent() {
  const [status, setStatus] = useState<'PENDENTE' | 'CONFIRMADO' | 'PRONTO' | 'CANCELADO' | 'RETIRADO'>('PENDENTE');
  const { id } = useLocalSearchParams();

  async function buscarStatus() {
    try {
      const res = await fetch(`http://localhost:3004/pedidos/${id}`);
      const data = await res.json();
      if (res.ok && data.status) {
        setStatus(data.status);
      }
    } catch (err) {
      console.error('Erro ao buscar status do pedido:', err);
    }
  }

  async function confirmarRetirada() {
    try {
      const res = await fetch(`http://localhost:3004/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RETIRADO' }),
      });

      if (res.ok) {
        setStatus('RETIRADO');
        router.replace('/cliente/catalogo'); // redireciona para o catálogo
      } else {
        Alert.alert('Erro', 'Não foi possível confirmar a retirada');
      }
    } catch (err) {
      Alert.alert('Erro', 'Falha ao atualizar status');
    }
  }

  useEffect(() => {
    buscarStatus();
    const interval = setInterval(buscarStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: status === 'PRONTO' ? '#00cc66' : '#ff0000' }]}>
      <View style={styles.box}>
        <Text style={styles.texto}>Informações do pedido</Text>
        <Text style={styles.texto}>
          Status: {status === 'PRONTO' ? 'Pronto para retirada' : status === 'RETIRADO' ? 'Retirado' : 'Aguardando preparo...'}
        </Text>
      </View>

      {status === 'PRONTO' && (
        <TouchableOpacity style={styles.botaoBox} onPress={confirmarRetirada}>
          <Text style={styles.botaoTexto}>Confirmar Retirada</Text>
        </TouchableOpacity>
      )}

      {status !== 'PRONTO' && (
        <View style={styles.botaoBox}>
          <Text style={styles.botaoTexto}>
            {status === 'RETIRADO' ? 'Pedido já retirado' : 'Aguardando confirmação do bar...'}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function Pedido() {
  return (
    <ProtectedRoute>
      <PedidoContent />
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
  },
  botaoBox: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
