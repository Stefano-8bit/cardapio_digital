import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { styles } from './introducao.styles';

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
