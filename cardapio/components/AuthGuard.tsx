import { useAuth } from '../hooks/useAuth';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario } = useAuth();

  useEffect(() => {

    
    if (!usuario) {
      router.replace('/empresa/login');
    }
  }, [usuario]);

  if (!usuario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
