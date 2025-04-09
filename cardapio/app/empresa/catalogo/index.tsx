import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

// Tipagem de produto e categoria para evitar erro "never"
type Produto = {
  id: number;
  nome: string;
};

type Categoria = {
  id: number;
  nome: string;
  produtos: Produto[];
};

export default function Catalogo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formulario, setFormulario] = useState({
    nome: '',
    descricao: '',
    valor: '',
    foto: '',
    categoriaId: '',
    tipo: 'categoria',
  });

  async function carregarCategorias() {
    try {
      const resposta = await fetch('http://localhost:3004/categorias');
      const dados = await resposta.json();
      setCategorias(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar as categorias');
    }
  }

  async function adicionarItem() {
    try {
      if (formulario.tipo === 'categoria') {
        await fetch('http://localhost:3004/categorias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: formulario.nome }),
        });
      } else {
        await fetch('http://localhost:3004/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: formulario.nome,
            descricao: formulario.descricao,
            valor: parseFloat(formulario.valor),
            foto: formulario.foto,
            categoriaId: parseInt(formulario.categoriaId),
          }),
        });
      }

      setModalVisible(false);
      setFormulario({ nome: '', descricao: '', valor: '', foto: '', categoriaId: '', tipo: 'categoria' });
      carregarCategorias();
    } catch (erro) {
      Alert.alert('Erro', 'Erro ao adicionar item');
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
        <Text style={styles.textoVoltar}>Voltar Home</Text>
      </TouchableOpacity>

      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => {
            setFormulario({ ...formulario, tipo: 'categoria' });
            setModalVisible(true);
          }}
        >
          <Text>Adicionar Categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => {
            setFormulario({ ...formulario, tipo: 'produto' });
            setModalVisible(true);
          }}
        >
          <Text>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      {categorias.map((categoria) => (
        <View key={categoria.id} style={styles.secao}>
          <Text style={styles.tituloSecao}>{categoria.nome}</Text>
          <View style={styles.linhaProdutos}>
            {categoria.produtos.map((produto) => (
              <View key={produto.id} style={styles.cardProduto}>
                <Text>{produto.nome}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlayModal}>
          <View style={styles.modalCard}>
            {/* Botão X para fechar */}
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
              <Text style={styles.textoFechar}>X</Text>
            </TouchableOpacity>

            <Text style={styles.tituloModal}>
              {formulario.tipo === 'categoria' ? 'Nova Categoria' : 'Novo Produto'}
            </Text>

            <View style={styles.linhaModal}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={formulario.nome}
                onChangeText={(texto) => setFormulario({ ...formulario, nome: texto })}
              />
              {formulario.tipo === 'produto' && (
                <TextInput
                  style={[styles.input, styles.caixaFoto]}
                  placeholder="URL da foto"
                  value={formulario.foto}
                  onChangeText={(texto) => setFormulario({ ...formulario, foto: texto })}
                />
              )}
            </View>

            {formulario.tipo === 'produto' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Descrição"
                  value={formulario.descricao}
                  onChangeText={(texto) => setFormulario({ ...formulario, descricao: texto })}
                />
                <View style={styles.linhaModal}>
                  <TextInput
                    style={styles.input}
                    placeholder="ID da Categoria"
                    keyboardType="numeric"
                    value={formulario.categoriaId}
                    onChangeText={(texto) => setFormulario({ ...formulario, categoriaId: texto })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    keyboardType="decimal-pad"
                    value={formulario.valor}
                    onChangeText={(texto) => setFormulario({ ...formulario, valor: texto })}
                  />
                </View>
              </>
            )}

            <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarItem}>
              <Text>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  botaoVoltar: { padding: 10, backgroundColor: '#ddd', alignSelf: 'flex-start', margin: 10 },
  textoVoltar: { color: '#000' },
  acoes: { flexDirection: 'row', gap: 10, paddingHorizontal: 10, marginBottom: 10 },
  botaoAcao: { backgroundColor: '#ccc', padding: 10 },
  secao: { marginBottom: 20, paddingHorizontal: 10 },
  tituloSecao: { backgroundColor: '#ddd', padding: 5, marginBottom: 10 },
  linhaProdutos: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cardProduto: {
    backgroundColor: '#ddd',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayModal: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    width: '80%',
    padding: 20,
    gap: 12,
    position: 'relative',
  },
  tituloModal: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linhaModal: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    flex: 1,
  },
  caixaFoto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoAdicionar: {
    backgroundColor: '#ccc',
    padding: 12,
    alignItems: 'center',
  },
  botaoFechar: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFechar: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});