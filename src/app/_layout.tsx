import { Stack } from 'expo-router';
import "./global.css"

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name='(auth)' options={{headerShown: false}} />
      <Stack.Screen name='(protected)/home' options={{headerShown: false}} />
      <Stack.Screen name='(protected)/onboarding' options={{headerShown: false}} />
    </Stack>
  )
}

export default RootLayout;