import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
  width: '100%',
  height: 200, // pode ajustar aqui pra ficar proporcional
  backgroundColor: '#002855', // opcional: azul escuro do fundo
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
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.6)',
},
modalContent: {
  width: '85%',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
},
titulo: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 12,
  textAlign: 'center',
},
regrasSenha: {
  fontSize: 12,
  color: '#555',
  marginTop: -6,
  marginBottom: 12,
},
inputErro: {
  borderColor: '#b00020',
  shadowColor: '#b00020',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 4,
},


});
