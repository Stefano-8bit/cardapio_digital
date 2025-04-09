import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

// status: 'pendente' | 'confirmado' | 'cancelado' | 'pronto'

export default function KDS() {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: 'João',
      produto: 'Cerveja',
      valor: '10,00',
      status: 'confirmado',
      criadoEm: Date.now(),
    },
    {
      id: 2,
      cliente: 'Maria',
      produto: 'Refrigerante',
      valor: '8,00',
      status: 'pendente',
      criadoEm: Date.now(),
    },
    {
      id: 3,
      cliente: 'Pedro',
      produto: 'Vodka',
      valor: '25,00',
      status: 'pendente',
      criadoEm: Date.now(),
    },
    {
      id: 4,
      cliente: 'Ana',
      produto: 'Água',
      valor: '5,00',
      status: 'pronto',
      criadoEm: Date.now(),
    },
  ]);

  const [_, forceUpdate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => forceUpdate((v) => !v), 1000);
    return () => clearInterval(interval);
  }, []);

  const atualizarStatus = (id: number, novoStatus: string) => {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: novoStatus } : p
      )
    );
  };

  const corStatus = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'green';
      case 'cancelado':
        return 'red';
      case 'pronto':
        return 'pink';
      default:
        return 'gold';
    }
  };

  const segundosParaTempo = (ms: number) => {
    const s = Math.floor((Date.now() - ms) / 1000);
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
        <Text style={styles.voltarText}>Voltar Home</Text>
      </TouchableOpacity>

      <View style={styles.headerBar}>
        <View style={[styles.statusBlock, { backgroundColor: 'pink' }]} />
        <Text>Produtos Prontos</Text>
      </View>

      <View style={styles.header}>
        <View style={styles.statusCol}></View>
        <Text style={styles.col}>Id do Produto</Text>
        <Text style={styles.col}>Nome Cliente</Text>
        <Text style={styles.col}>Produto</Text>
        <Text style={styles.col}>valor</Text>
        <Text style={styles.col}>cancelar</Text>
        <Text style={styles.col}>confirmar</Text>
        <Text style={styles.col}>✓</Text>
      </View>

      {pedidos.map((p) => (
        <View key={p.id} style={styles.row}>
          <View
            style={[styles.statusCol, { backgroundColor: corStatus(p.status) }]}
          />
          <Text style={styles.col}>{p.id}</Text>
          <Text style={styles.col}>{p.cliente}</Text>
          <Text style={styles.col}>{p.produto}</Text>
          <Text style={styles.col}>{p.valor}</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => atualizarStatus(p.id, 'cancelado')}
          >
            <Text>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => atualizarStatus(p.id, 'confirmado')}
          >
            <Text>✔</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => atualizarStatus(p.id, 'pronto')}
          >
            <Text>{segundosParaTempo(p.criadoEm)}</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#f4dede',
  },
  statusBlock: {
    width: 20,
    height: 20,
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ddd',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    textAlign: 'center',
  },
  statusCol: {
    width: 20,
    height: 40,
    marginRight: 4,
  },
  btn: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
