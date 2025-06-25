import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard';
import { styles } from './historico.styles';

type Pedido = {
  id: number;
  valor: number;
  status: string;
  horario: string;
  updatedAt: string;
  produto: { nome: string };
  usuario: { nome: string };
};


function HistoricoInterno() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState<string | null>('RETIRADO');

  const statusList = [null, 'RETIRADO', 'PRONTO', 'CANCELADO', 'PENDENTE', 'CONFIRMADO'];

  async function carregarHistorico() {
    try {
      const res = await fetch('http://localhost:3004/pedidos');
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }

  function alternarFiltro() {
    const atual = statusList.indexOf(filtro);
    const proximo = (atual + 1) % statusList.length;
    setFiltro(statusList[proximo]);
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  const pedidosFiltrados = filtro
    ? pedidos.filter((p) => p.status === filtro)
    : pedidos;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
        <Text style={styles.voltarText}>Voltar Home</Text>
      </TouchableOpacity>

      <View style={styles.filtroRow}>
        <TouchableOpacity style={styles.filtroBtn} onPress={alternarFiltro}>
          <Text style={styles.filtroBtnText}>Filtro: {filtro || 'Todos'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabela}>
        <View style={styles.header}>
  <Text style={styles.colHeader}>Id Produto</Text>
  <Text style={styles.colHeader}>Nome Cliente</Text>
  <Text style={styles.colHeader}>Produto</Text>
  <Text style={styles.colHeader}>Valor</Text>
  <Text style={styles.colHeader}>Criado</Text>
  <Text style={styles.colHeader}>Atualizado</Text>
</View>

{pedidosFiltrados.map((p) => (
  <View key={p.id} style={styles.row}>
    <Text style={styles.col}>{p.id}</Text>
    <Text style={styles.col}>{p.usuario?.nome || 'Cliente'}</Text>
    <Text style={styles.col}>{p.produto?.nome || 'Produto'}</Text>
    <Text style={styles.col}>R$ {p.valor.toFixed(2)}</Text>
    <Text style={styles.col}>{new Date(p.horario).toLocaleTimeString()}</Text>
    <Text style={styles.col}>{new Date(p.updatedAt).toLocaleTimeString()}</Text>
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
