import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(null);

  async function carregarPedidos() {
    try {
      const res = await fetch('http://localhost:3004/pedidos');
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  }

  async function cancelarPedidoComMotivo() {
    if (!pedidoSelecionado || !motivo.trim()) {
      Alert.alert('Erro', 'Informe o motivo do cancelamento');
      return;
    }

    try {
      await fetch(`http://localhost:3004/pedidos/${pedidoSelecionado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELADO', motivoCancelamento: motivo }),
      });

      setModalVisible(false);
      setMotivo('');
      setPedidoSelecionado(null);
      await carregarPedidos();
    } catch {
      Alert.alert('Erro', 'Não foi possível cancelar o pedido');
    }
  }

  async function atualizarStatus(id: number, novoStatus: string) {
    try {
      await fetch(`http://localhost:3004/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus }),
      });
      carregarPedidos();
    } catch {
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
      case 'confirmado': return '#160b30';
      case 'cancelado': return '#ff4d4d';
      case 'pronto': return '#00FF00';
      default: return '#999';
    }
  };

  const segundosParaTempo = (iso: string) => {
    const inicio = new Date(iso).getTime();
    const agora = Date.now();
    const s = Math.floor((agora - inicio) / 1000);
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return {
      total: s,
      display: `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`,
    };
  };

  const corFundoTempo = (segundos: number) => {
    if (segundos <= 900) return '#cce5ff';
    if (segundos <= 1800) return '#fff4cc';
    return '#ffcccc';
  };

  const pedidosOrdenados = [...pedidos]
    .filter((p) => {
      const status = p.status.toString().toUpperCase();
      return status !== 'RETIRADO' && status !== 'CANCELADO';
    })
    .sort((a, b) => {
      const tempoA = segundosParaTempo(a.horario).total;
      const tempoB = segundosParaTempo(b.horario).total;

      const prioridade = (s: number) => {
        if (s > 1800) return 0;
        if (s > 900) return 1;
        return 2;
      };

      const pA = prioridade(tempoA);
      const pB = prioridade(tempoB);

      if (pA !== pB) return pA - pB;
      return tempoB - tempoA;
    });

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

        {pedidosOrdenados.map((p) => {
          const tempo = segundosParaTempo(p.horario);
          const corFundo = corFundoTempo(tempo.total);

          return (
            <View key={p.id} style={[styles.row, { backgroundColor: corFundo }]}>
              <View style={[styles.statusCol, { backgroundColor: corStatus(p.status) }]} />
              <Text style={styles.col}>{p.id}</Text>
              <Text style={styles.col}>{p.usuario?.nome || 'Cliente'}</Text>
              <Text style={styles.col}>{p.produto?.nome || 'Produto'}</Text>
              <Text style={styles.col}>R$ {p.valor.toFixed(2)}</Text>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setPedidoSelecionado(p.id);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.btnText}>X</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => atualizarStatus(p.id, 'PRONTO')}
              >
                <Text style={styles.btnText}>✔</Text>
              </TouchableOpacity>

              <View style={styles.btn}>
                <Text style={styles.btnText}>{tempo.display}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            width: '100%',
          }}>
            <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>
              Motivo do Cancelamento
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 6,
                marginBottom: 16,
              }}
              multiline
              value={motivo}
              onChangeText={setMotivo}
              placeholder="Descreva o motivo..."
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#999' }}>Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelarPedidoComMotivo}>
                <Text style={{ color: '#160b30', fontWeight: 'bold' }}>Cancelar Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AuthGuard>
  );
}
