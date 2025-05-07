import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import AuthGuard from '../../../components/AuthGuard'; // certifique-se que o caminho está correto

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
        return '#160b30';
      case 'cancelado':
        return '#ff4d4d';
      case 'pronto':
        return '#ffd700';
      default:
        return '#999';
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
          <View style={styles.statusCol}></View>
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
              <Text style={styles.btnText}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => atualizarStatus(p.id, 'confirmado')}
            >
              <Text style={styles.btnText}>✔</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => atualizarStatus(p.id, 'pronto')}
            >
              <Text style={styles.btnText}>{segundosParaTempo(p.criadoEm)}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  voltar: {
    padding: 10,
    backgroundColor: '#ffd700',
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 6,
  },
  voltarText: {
    color: '#160b30',
    fontWeight: 'bold',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#fdf5d4',
  },
  headerBarText: {
    color: '#160b30',
    fontWeight: 'bold',
  },
  statusBlock: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#160b30',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    textAlign: 'center',
    color: '#160b30',
    fontWeight: '500',
  },
  statusCol: {
    width: 20,
    height: 40,
    marginRight: 4,
    borderRadius: 4,
  },
  btn: {
    flex: 1,
    backgroundColor: '#ffd700',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  btnText: {
    color: '#160b30',
    fontWeight: 'bold',
  },
});