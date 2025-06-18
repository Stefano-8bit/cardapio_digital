import { useAuth } from '../hooks/useAuth';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario } = useAuth();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !usuario) {
      const isEmpresa = pathname?.includes('/empresa');
      router.replace(isEmpresa ? '/empresa/login' : '/cliente/login');
    }
  }, [mounted, usuario]);

  if (!mounted || !usuario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
