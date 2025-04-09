import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Historico() {
  // mock de pedidos
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
          <Text>Filtro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabela}>
        <View style={styles.header}>
          <Text style={styles.col}>Id Produto</Text>
          <Text style={styles.col}>Nome Cliente</Text>
          <Text style={styles.col}>Produto</Text>
          <Text style={styles.col}>Valor</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  voltar: {
    padding: 10,
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    margin: 10,
  },
  voltarText: { color: '#000' },
  filtroRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filtroBtn: {
    backgroundColor: '#ccc',
    padding: 10,
  },
  tabela: {
    backgroundColor: '#ddd',
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#aaa',
    padding: 10,
  },
  col: {
    flex: 1,
    textAlign: 'center',
  },
});
