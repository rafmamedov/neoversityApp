import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />; // Показуй індикатор завантаження
  }

  return (
    <LoginScreen />
  );
}
