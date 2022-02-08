import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Screens/Profile';
import PatientDetails from './Screens/PatientDetails';
import ImportImage from './Screens/ImportImage';
import AppStack from './routes/AppStack';
import AuthStack from './routes/AuthStack';
import Results from './Screens/Results';
import Report from './Screens/Report';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <Report></Report> */}
      <AuthStack></AuthStack>
    </SafeAreaProvider>

  )
}

