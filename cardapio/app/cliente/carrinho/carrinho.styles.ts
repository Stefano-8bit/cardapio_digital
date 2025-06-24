import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  voltar: {
    fontSize: 16,
    color: '#160b30',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  item: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoProduto: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valor: {
    color: '#160b30',
    marginTop: 4,
  },
  descricao: {
    fontSize: 12,
    color: '#555',
  },
  remover: {
    color: 'red',
    marginTop: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  },
  label: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  pagamentos: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  metodo: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  metodoSelecionado: {
    backgroundColor: '#ffcc00',
  },
  metodoTexto: {
    color: '#160b30',
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    backgroundColor: '#160b30',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  qtdBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qtdNumero: {
    fontSize: 16,
    fontWeight: 'bold',
  },
    botaoVoltar: {
    backgroundColor: '#160b30',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
