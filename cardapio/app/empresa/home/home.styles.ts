import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#160b30',
  },
  logo: {
    width: 150,
    height: 50,
  },
  buttonContainer: {
    padding: 20,
    gap: 16,
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#160b30',
    alignItems: 'center',
  },
  buttonText: {
    color: '#160b30',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
