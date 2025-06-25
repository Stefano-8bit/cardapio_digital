import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  botaoVoltar: {
    padding: 10,
    backgroundColor: '#ffd700',
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 6,
  },

  textoVoltar: { color: '#002855', fontWeight: 'bold' },

  acoes: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  botaoAcao: {
    backgroundColor: '#002855',
    padding: 10,
    borderRadius: 6,
  },

  textoBotaoAcao: { color: '#fff', fontWeight: 'bold' },

  secao: { marginBottom: 20, paddingHorizontal: 10 },

  tituloSecao: {
    backgroundColor: '#002855',
    color: '#fff',
    padding: 5,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  linhaProdutos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },

  cardProdutoHorizontal: {
    flexGrow: 1,
    flexBasis: '20%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 100,
    maxWidth: '100%',
  },

  imagemProduto: {
    width: 60,
    height: 60,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  foto: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },

  fotoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
  },

  infoProduto: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },

  nomeProduto: {
    fontWeight: 'bold',
    color: '#002855',
  },

  valorProduto: {
    color: '#002855',
  },

  botaoAdicionarCarrinho: {
    marginTop: 4,
    backgroundColor: '#ffd700',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  textoBotaoCarrinho: {
    color: '#002855',
    fontWeight: 'bold',
    fontSize: 12,
  },

  cardProduto: {
    backgroundColor: '#ffd700',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  textoProduto: {
    color: '#002855',
    fontWeight: 'bold',
  },

  overlayModal: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    backgroundColor: '#fff',
    borderColor: '#002855',
    borderWidth: 1,
    width: '80%',
    padding: 20,
    gap: 12,
    position: 'relative',
    borderRadius: 8,
  },

  tituloModal: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#002855',
  },

  linhaModal: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },

  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#002855',
    color: '#002855',
  },

  caixaFoto: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoAdicionar: {
    backgroundColor: '#ffd700',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
  },

  textoAdicionar: {
    color: '#002855',
    fontWeight: 'bold',
  },

  botaoFechar: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#002855',
  },

  textoFechar: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#002855',
  },

    tituloCategoriaComBotao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#002855',
    padding: 5,
    marginBottom: 10,
  },

  botaoExcluirCategoria: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#ffd700'
  },

  textoExcluir: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
