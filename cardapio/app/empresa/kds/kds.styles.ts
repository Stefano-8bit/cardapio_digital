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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#fdf5d4',
  },
  headerBarText: {
    color: '#002855',
    fontWeight: 'bold',
  },
  statusBlock: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#002855',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    textAlign: 'center',
    color: '#002855',
    fontWeight: '500',
  },
  statusCol: {
    width: 20,
    height: 40,
    marginRight: 4,
    borderRadius: 4,
  },
  btn: {
    flex: 1,
    backgroundColor: '#ffd700',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  btnText: {
    color: '#002855',
    fontWeight: 'bold',
  },
});
