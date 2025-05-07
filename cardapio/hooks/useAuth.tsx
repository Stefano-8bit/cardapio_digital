// hooks/useAuth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = { id: number; nome: string; cpf: string };
type AuthContextType = {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('usuario').then((data) => {
      if (data) {
        try {
          const parsed = JSON.parse(data);
          setUsuario(parsed);
        } catch (error) {
          console.warn('Erro ao fazer parse do usuário:', error);
          AsyncStorage.removeItem('usuario');
        }
      }
    });
  }, []);

  const login = async (usuario: Usuario) => {
    setUsuario(usuario);
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const logout = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return context;
}
