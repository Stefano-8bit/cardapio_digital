import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { usuario } = useAuth();

  useEffect(() => {
    console.log('[ProtectedRoute] Usuário atual:', usuario);
  }, [usuario]);

  if (!usuario) {
    return <Redirect href="/cliente/login" />;
  }

  return children;
}
