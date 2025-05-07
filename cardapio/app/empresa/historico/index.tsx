import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard';
import { styles } from './historico.styles';

function HistoricoInterno() {
  const pedidos = [
    { id: 1, cliente: 'João', produto: 'Cerveja', valor: '10,00' },
    { id: 2, cliente: 'Maria', produto: 'Refrigerante', valor: '8,00' },
    { id: 3, cliente: 'Pedro', produto: 'Vodka', valor: '25,00' },
    { id: 4, cliente: 'Ana', produto: 'Água', valor: '5,00' },
  ];

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
            <Text style={styles.col}>{p.cliente}</Text>
            <Text style={styles.col}>{p.produto}</Text>
            <Text style={styles.col}>{p.valor}</Text>
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
