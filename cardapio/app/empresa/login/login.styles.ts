import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 250,
    backgroundColor: '#eee',
  },
  form: {
    padding: 20,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#160b30',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#160b30',
    color: '#160b30',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#160b30',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
