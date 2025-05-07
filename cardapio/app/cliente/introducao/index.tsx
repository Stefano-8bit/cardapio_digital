import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function IntroducaoCliente() {
  return (
    <View style={styles.container}>
      <View style={styles.passo}>
        <View style={styles.numeroBox}><Text style={styles.numero}>1</Text></View>
        <View style={styles.descricaoBox}>
          <Text style={styles.descricao}>Adicione suas bebidas no carrinho</Text>
        </View>
      </View>

      <View style={styles.passo}>
        <View style={styles.numeroBox}><Text style={styles.numero}>2</Text></View>
        <View style={styles.descricaoBox}>
          <Text style={styles.descricao}>Selecione o método de pagamento</Text>
        </View>
      </View>

      <View style={styles.passo}>
        <View style={styles.numeroBox}><Text style={styles.numero}>3</Text></View>
        <View style={styles.descricaoBox}>
          <Text style={styles.descricao}>Retire seu pedido no Balcão</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoAvancar} onPress={() => router.push('/cliente/catalogo')}>
        <Text style={styles.seta}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160b30',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  passo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  numeroBox: {
    backgroundColor: '#ffcc00',
    width: 30,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  numero: {
    color: '#160b30',
    fontWeight: 'bold',
  },
  descricaoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    flex: 1,
  },
  descricao: {
    color: '#160b30',
    fontSize: 16,
  },
  botaoAvancar: {
    marginTop: 40,
    backgroundColor: '#ffcc00',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  seta: {
    color: '#160b30',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
