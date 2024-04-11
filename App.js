import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';

/**
 * Creates a native stack navigator.
 *
 * @type {import('@react-navigation/native-stack').NativeStack}
 */
const Stack = createNativeStackNavigator();

/**
 * The main component of the app.
 *
 * @returns {JSX.Element|null} The main component of the app, or null if loading is not yet complete.
 */
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style='auto' />
      </SafeAreaProvider>
    );
  }
}
