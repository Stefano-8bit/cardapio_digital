import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  voltar: {
    padding: 10,
    backgroundColor: '#ffd700',
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 6,
  },
  voltarText: {
    color: '#002855',
    fontWeight: 'bold',
  },
  filtroRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filtroBtn: {
    backgroundColor: '#002855',
    padding: 10,
    borderRadius: 6,
  },
  filtroBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabela: {
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderWidth: 1,
    borderColor: '#002855',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#002855',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  colHeader: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  col: {
    flex: 1,
    textAlign: 'center',
    color: '#002855',
    fontWeight: '500',
  },
});
