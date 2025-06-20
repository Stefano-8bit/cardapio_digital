import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard';
import { styles } from './kds.styles';

type Pedido = {
  id: number;
  status: string;
  valor: number;
  quantidade: number;
  horario: string;
  produto: { nome: string };
  usuario: { nome: string };
};

export default function KDS() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function carregarPedidos() {
    try {
      const res = await fetch('http://localhost:3004/pedidos');
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  }

  async function atualizarStatus(id: number, novoStatus: string) {
    try {
      await fetch(`http://localhost:3004/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus }),
      });
      carregarPedidos(); // atualiza após mudança
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status');
    }
  }

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  const corStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado':
        return '#160b30';
      case 'cancelado':
        return '#ff4d4d';
      case 'pronto':
        return '#ffd700';
      default:
        return '#999';
    }
  };

  const segundosParaTempo = (iso: string) => {
    const inicio = new Date(iso).getTime();
    const agora = Date.now();
    const s = Math.floor((agora - inicio) / 1000);
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <AuthGuard>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.push('/empresa/home')} style={styles.voltar}>
          <Text style={styles.voltarText}>Voltar Home</Text>
        </TouchableOpacity>

        <View style={styles.headerBar}>
          <View style={[styles.statusBlock, { backgroundColor: '#ffd700' }]} />
          <Text style={styles.headerBarText}>Produtos Prontos</Text>
        </View>

        <View style={styles.header}>
          <View style={[styles.statusCol]} />
          <Text style={styles.col}>Id</Text>
          <Text style={styles.col}>Cliente</Text>
          <Text style={styles.col}>Produto</Text>
          <Text style={styles.col}>Valor</Text>
          <Text style={styles.col}>Cancelar</Text>
          <Text style={styles.col}>Confirmar</Text>
          <Text style={styles.col}>✓</Text>
        </View>

        {pedidos.map((p) => (
          <View key={p.id} style={styles.row}>
            <View style={[styles.statusCol, { backgroundColor: corStatus(p.status) }]} />
            <Text style={styles.col}>{p.id}</Text>
            <Text style={styles.col}>{p.usuario?.nome || 'Cliente'}</Text>
            <Text style={styles.col}>{p.produto?.nome || 'Produto'}</Text>
            <Text style={styles.col}>R$ {p.valor.toFixed(2)}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => atualizarStatus(p.id, 'CANCELADO')}>
              <Text style={styles.btnText}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => atualizarStatus(p.id, 'PRONTO')}>
              <Text style={styles.btnText}>✔</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => atualizarStatus(p.id, 'PRONTO')}>
              <Text style={styles.btnText}>{segundosParaTempo(p.horario)}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </AuthGuard>
  );
}
