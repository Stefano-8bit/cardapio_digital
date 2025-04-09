import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Pedido() {
  const [status, setStatus] = useState<'pendente' | 'pronto'>('pendente');
  const { id } = useLocalSearchParams();

  // Simulação futura de status vindo do KDS (atualmente fixo como "pendente")
  useEffect(() => {
    const interval = setInterval(() => {
      // Aqui será onde o sistema verificará o status real do pedido
      // setStatus('pronto');
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: status === 'pronto' ? '#00cc66' : '#ff0000' }]}>
      <View style={styles.box}>
        <Text style={styles.texto}>Informações do pedido</Text>
        <Text style={styles.texto}>Horário do pedido: {new Date().toLocaleTimeString()}</Text>
        <Text style={styles.texto}>Status: {status === 'pronto' ? 'Pronto para retirada' : 'Aguardando preparo...'}</Text>
      </View>

      <View style={styles.botaoBox}>
        <Text style={styles.botaoTexto}>Aguardando confirmação do bar...</Text>
      </View>
    </View>
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
