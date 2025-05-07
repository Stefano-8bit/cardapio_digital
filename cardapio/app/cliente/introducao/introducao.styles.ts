import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
