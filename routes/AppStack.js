
import React from 'react'
import Profile from '../Screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppStack() {

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="Profile" component={Profile}
          options={{
            title: 'Derma Insight',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#338230',
            headerTitleStyle: {
              fontFamily: 'century-gothic',
            },
          }}
          />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
