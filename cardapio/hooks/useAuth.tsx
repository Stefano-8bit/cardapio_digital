import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Empresa = {
  id: number
  nome: string
}

type AuthContextType = {
  empresa: Empresa | null
  login: (empresa: Empresa) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [empresa, setEmpresa] = useState<Empresa | null>(null)

  useEffect(() => {
    async function carregarEmpresaSalva() {
      const dados = await AsyncStorage.getItem('empresa')
      if (dados) {
        setEmpresa(JSON.parse(dados))
      }
    }
    carregarEmpresaSalva()
  }, [])

  async function login(empresa: Empresa) {
    setEmpresa(empresa)
    await AsyncStorage.setItem('empresa', JSON.stringify(empresa))
  }

  async function logout() {
    setEmpresa(null)
    await AsyncStorage.removeItem('empresa')
  }

  return (
    <AuthContext.Provider value={{ empresa, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
