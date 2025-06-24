import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoTopo: {
    backgroundColor: '#002855',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  botaoTopoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  carrinho: {
    fontSize: 16,
    color: '#002855',
  },
  categoriaBloco: {
    marginBottom: 24,
  },
  categoriaTitulo: {
    backgroundColor: '#002855',
    color: '#fff',
    padding: 6,
    marginBottom: 10,
    fontWeight: 'bold',
    borderRadius: 4,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  cardProduto: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: 'row',
    padding: 10,
  },
  fotoProduto: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  infoProduto: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeProduto: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  valorProduto: {
    fontSize: 14,
    color: '#002855',
    marginBottom: 4,
  },
  descProduto: {
    fontSize: 12,
    color: '#555',
  },
  botaoAdicionar: {
    marginTop: 8,
    backgroundColor: '#ffcc00',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#002855',
    fontWeight: 'bold',
  },
  linhaNome: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  interrogacao: {
    backgroundColor: '#e6f0ff',
    color: '#002855',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    borderRadius: 100,
    textAlign: 'center',
    lineHeight: 18,
    fontSize: 16,
  },
});
