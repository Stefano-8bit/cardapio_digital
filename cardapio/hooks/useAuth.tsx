// Atualização completa do AuthContext para suportar cliente e empresa com persistência de login

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos genéricos para cliente ou empresa
export type Usuario = {
  id: string;
  nome: string;
  cpf?: string;
  cnpj?: string;
  tipo: 'cliente' | 'empresa';
};

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('usuario').then((data) => {
      if (data) {
        try {
          const parsed = JSON.parse(data);
          setUsuario({ ...parsed, id: String(parsed.id) });
        } catch (error) {
          console.warn('Erro ao carregar dados do usuário:', error);
          AsyncStorage.removeItem('usuario');
        }
      }
    });
  }, []);

  const login = async (usuario: Usuario) => {
    const formatado = { ...usuario, id: String(usuario.id) };
    setUsuario(formatado);
    await AsyncStorage.setItem('usuario', JSON.stringify(formatado));
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
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
