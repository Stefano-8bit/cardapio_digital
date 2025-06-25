import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AuthGuard from '../../../components/AuthGuard';
import { styles } from './catalogo.styles';

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  valor: number;
  foto?: string;
  categoriaId: number;
  oculto: boolean;
}

interface Categoria {
  id: number;
  nome: string;
  produtos: Produto[];
}

function CatalogoInterno() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpcoesVisible, setModalOpcoesVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
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

  async function salvarItem() {
    const payload = {
      nome: formulario.nome,
      descricao: formulario.descricao,
      valor: parseFloat(formulario.valor),
      foto: formulario.foto,
      categoriaId: parseInt(formulario.categoriaId),
    };

    try {
      if (formulario.tipo === 'categoria') {
        await fetch('http://localhost:3004/categorias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: formulario.nome }),
        });
      } else if (editandoId) {
        await fetch(`http://localhost:3004/produtos/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('http://localhost:3004/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setModalVisible(false);
      setFormulario({ nome: '', descricao: '', valor: '', foto: '', categoriaId: '', tipo: 'categoria' });
      setEditandoId(null);
      carregarCategorias();
    } catch (erro) {
      Alert.alert('Erro', 'Erro ao salvar item');
    }
  }

  function abrirModalProduto(produto: Produto) {
    setProdutoSelecionado(produto);
    setModalOpcoesVisible(true);
  }

  async function alternarOculto(produto: Produto) {
    try {
      await fetch(`http://localhost:3004/produtos/${produto.id}/ocultar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oculto: !produto.oculto }),
      });
      setModalOpcoesVisible(false);
      carregarCategorias();
    } catch (err) {
      Alert.alert('Erro ao atualizar visibilidade');
    }
  }

  async function excluirProduto(id: number) {
    try {
      await fetch(`http://localhost:3004/produtos/${id}`, {
        method: 'DELETE',
      });
      setModalOpcoesVisible(false);
      carregarCategorias();
    } catch (err) {
      Alert.alert('Erro ao excluir produto');
    }
  }

  function editarProduto(produto: Produto) {
    setFormulario({
      nome: produto.nome,
      descricao: produto.descricao || '',
      valor: String(produto.valor),
      foto: produto.foto || '',
      categoriaId: String(produto.categoriaId),
      tipo: 'produto',
    });
    setEditandoId(produto.id);
    setModalVisible(true);
    setModalOpcoesVisible(false);
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
            setFormulario({ nome: '', descricao: '', valor: '', foto: '', categoriaId: '', tipo: 'categoria' });
            setEditandoId(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.textoBotaoAcao}>Adicionar Categoria</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={() => {
            setFormulario({ nome: '', descricao: '', valor: '', foto: '', categoriaId: '', tipo: 'produto' });
            setEditandoId(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.textoBotaoAcao}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      {categorias.map((categoria) => (
        <View key={categoria.id} style={styles.secao}>
          <Text style={styles.tituloSecao}>{categoria.nome}</Text>
          <View style={styles.linhaProdutos}>
            {categoria.produtos.map((produto) => (
              <View
                key={produto.id}
                style={[
                  styles.cardProdutoHorizontal,
                  produto.oculto && { backgroundColor: '#e5e5e5' },
                ]}
              >
                <View style={styles.imagemProduto}>
                  {produto.foto ? (
                    <Image source={{ uri: produto.foto }} style={styles.foto} />
                  ) : (
                    <View style={styles.fotoPlaceholder} />
                  )}
                </View>
                <View style={styles.infoProduto}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={styles.nomeProduto}>{produto.nome}</Text>
                    {produto.oculto && (
                      <MaterialIcons name="visibility-off" size={16} color="#666" />
                    )}
                  </View>
                  <Text style={styles.valorProduto}>R$ {produto.valor.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.botaoAdicionarCarrinho}
                    onPress={() => abrirModalProduto(produto)}
                  >
                    <Text style={styles.textoBotaoCarrinho}>Opções</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Modal de edição/criação já existente */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlayModal}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.botaoFechar} onPress={() => {
              setModalVisible(false);
              setEditandoId(null);
            }}>
              <Text style={styles.textoFechar}>X</Text>
            </TouchableOpacity>

            <Text style={styles.tituloModal}>
              {formulario.tipo === 'categoria' ? 'Nova Categoria' : editandoId ? 'Editar Produto' : 'Novo Produto'}
            </Text>

            <View style={styles.linhaModal}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={formulario.nome}
                placeholderTextColor="#999"
                onChangeText={(texto) => setFormulario({ ...formulario, nome: texto })}
              />
              {formulario.tipo === 'produto' && (
                <TextInput
                  style={[styles.input, styles.caixaFoto]}
                  placeholder="URL da foto"
                  value={formulario.foto}
                  placeholderTextColor="#999"
                  onChangeText={(texto) => setFormulario({ ...formulario, foto: texto })}
                />
              )}
            </View>

            {formulario.tipo === 'produto' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Descrição"
                  placeholderTextColor="#999"
                  value={formulario.descricao}
                  onChangeText={(texto) => setFormulario({ ...formulario, descricao: texto })}
                />
                <View style={styles.linhaModal}>
                  <TextInput
                    style={styles.input}
                    placeholder="ID da Categoria"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={formulario.categoriaId}
                    onChangeText={(texto) => setFormulario({ ...formulario, categoriaId: texto })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={formulario.valor}
                    onChangeText={(texto) => setFormulario({ ...formulario, valor: texto })}
                  />
                </View>
              </>
            )}

            <TouchableOpacity style={styles.botaoAdicionar} onPress={salvarItem}>
              <Text style={styles.textoAdicionar}>{editandoId ? 'Salvar Alterações' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de opções */}
      <Modal visible={modalOpcoesVisible} transparent animationType="fade">
        <View style={styles.overlayModal}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalOpcoesVisible(false)}>
              <Text style={styles.textoFechar}>X</Text>
            </TouchableOpacity>

            {produtoSelecionado && (
              <>
                <Text style={styles.tituloModal}>{produtoSelecionado.nome}</Text>

                <TouchableOpacity
                  style={styles.botaoAdicionar}
                  onPress={() => editarProduto(produtoSelecionado)}
                >
                  <Text style={styles.textoAdicionar}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoAdicionar}
                  onPress={() => alternarOculto(produtoSelecionado)}
                >
                  <Text style={styles.textoAdicionar}>
                    {produtoSelecionado.oculto ? 'Mostrar' : 'Ocultar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botaoAdicionar, { backgroundColor: 'red' }]}
                  onPress={() => excluirProduto(produtoSelecionado.id)}
                >
                  <Text style={[styles.textoAdicionar, { color: 'white' }]}>Excluir</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default function CatalogoProtegido() {
  return (
    <AuthGuard>
      <CatalogoInterno />
    </AuthGuard>
  );
}
