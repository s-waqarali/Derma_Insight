import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './routes/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthStack></AuthStack>
    </SafeAreaProvider>

  )
}

