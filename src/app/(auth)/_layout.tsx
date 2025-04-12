import { useEffect, useState } from 'react';
import { Slot, Stack, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AuthLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(protected)/protected');
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(protected)/protected');
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return <Stack>
    <Stack.Screen name='signin' options={{headerShown: false}}/>
    <Stack.Screen name='signup' options={{headerShown: false}}/>
  </Stack>;
}
