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
  logo: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  carrinho: {
    fontSize: 16,
    color: '#160b30',
  },
  categoriaBloco: {
    marginBottom: 24,
  },
  categoriaTitulo: {
    backgroundColor: '#ddd',
    padding: 6,
    marginBottom: 10,
    fontWeight: 'bold',
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
    color: '#160b30',
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
    color: '#160b30',
    fontWeight: 'bold',
  },
});
