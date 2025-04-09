import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { router } from 'expo-router';

export default function Catalogo() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
        <Text style={styles.voltarText}>Voltar Home</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <Text>add categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <Text>add produto</Text>
        </TouchableOpacity>
      </View>

      {/* mock de categorias e produtos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.produtosRow}>
          <View style={styles.produto}><Text>Produto</Text></View>
          <View style={styles.produto}><Text>Produto</Text></View>
          <View style={styles.produto}><Text>Produto</Text></View>
        </View>
      </View>

      {/* Modal para adicionar categoria/produto */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Card para adicionar novos produtos ou categorias</Text>

            <View style={styles.modalRow}>
              <TextInput style={styles.input} placeholder="nome" />
              <View style={[styles.input, styles.fotoBox]}>
                <Text>foto</Text>
              </View>
            </View>

            <TextInput style={styles.input} placeholder="descrição" />

            <View style={styles.modalRow}>
              <TextInput style={styles.inputHalf} placeholder="categoria" />
              <TextInput style={styles.inputHalf} placeholder="valor" />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(false)}>
              <Text>add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  voltar: { padding: 10, backgroundColor: '#ddd', alignSelf: 'flex-start', margin: 10 },
  voltarText: { color: '#000' },
  actions: { flexDirection: 'row', gap: 10, paddingHorizontal: 10, marginBottom: 10 },
  actionButton: { backgroundColor: '#ccc', padding: 10 },
  section: { marginBottom: 20, paddingHorizontal: 10 },
  sectionTitle: { backgroundColor: '#ddd', padding: 5, marginBottom: 10 },
  produtosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  produto: {
    backgroundColor: '#ddd',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // modal
  modalOverlay: {
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
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    flex: 1,
  },
  inputHalf: {
    backgroundColor: '#eee',
    padding: 10,
    flex: 1,
  },
  fotoBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#ccc',
    padding: 12,
    alignItems: 'center',
  },
});
