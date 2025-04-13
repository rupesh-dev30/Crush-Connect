import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AuthLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // Check if user is logged in and profile is complete
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Get user details
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error getting user:', error);
          return;
        }

        // Check if the user's profile is complete
        const isComplete = user?.user_metadata?.is_profile_complete === true;

        setIsProfileComplete(isComplete);

        // Redirect based on profile completion
        if (isComplete) {
          router.replace('/(protected)/home'); // Redirect to Home screen if profile is complete
        } else {
          router.replace('/(protected)/onboarding'); // Redirect to Onboarding if not complete
        }
      } else {
        setLoading(false); // Set loading to false if no session
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        // Get user details when the auth state changes
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error getting user:', error);
          return;
        }

        // Check if the user's profile is complete
        const isComplete = user?.user_metadata?.is_profile_complete === true;
        setIsProfileComplete(isComplete);

        // Redirect based on profile completion
        if (isComplete) {
          router.replace('/(protected)/home');
        } else {
          router.replace('/(protected)/onboarding');
        }
      } else {
        setLoading(false); // Set loading to false if session is null
      }
    });

    return () => listener.subscription.unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (loading) return null;

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
