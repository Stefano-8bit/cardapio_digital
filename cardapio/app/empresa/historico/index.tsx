import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard';
import { styles } from './historico.styles';

type Pedido = {
  id: number;
  valor: number;
  produto: { nome: string };
  usuario: { nome: string };
};

function HistoricoInterno() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function carregarHistorico() {
    try {
      const res = await fetch('http://localhost:3004/pedidos');
      const data = await res.json();
      const filtrados = data.filter((p: any) => p.status === 'RETIRADO');
      setPedidos(filtrados);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
        <Text style={styles.voltarText}>Voltar Home</Text>
      </TouchableOpacity>

      <View style={styles.filtroRow}>
        <TouchableOpacity style={styles.filtroBtn}>
          <Text style={styles.filtroBtnText}>Filtro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabela}>
        <View style={styles.header}>
          <Text style={styles.colHeader}>Id Produto</Text>
          <Text style={styles.colHeader}>Nome Cliente</Text>
          <Text style={styles.colHeader}>Produto</Text>
          <Text style={styles.colHeader}>Valor</Text>
        </View>

        {pedidos.map((p) => (
          <View key={p.id} style={styles.row}>
            <Text style={styles.col}>{p.id}</Text>
            <Text style={styles.col}>{p.usuario?.nome || 'Cliente'}</Text>
            <Text style={styles.col}>{p.produto?.nome || 'Produto'}</Text>
            <Text style={styles.col}>R$ {p.valor.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default function HistoricoProtegido() {
  return (
    <AuthGuard>
      <HistoricoInterno />
    </AuthGuard>
  );
}
