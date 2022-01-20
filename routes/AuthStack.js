
import React from 'react'
import CreateAccount from '../Screens/CreateAccount';
import SignIn from '../Screens/SignIn';
import Profile from '../Screens/Profile';
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImportImage from '../Screens/ImportImage';
import PatientDetails from '../Screens/PatientDetails';
import Results from '../Screens/Results';


const Stack = createNativeStackNavigator();
let isLoggedIn = true

export default function AuthStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Sign In">
                <Stack.Screen name="Sign In" component={SignIn}
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
                <Stack.Screen name="Create Account" component={CreateAccount}
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
                <Stack.Screen name="Patient details" component={PatientDetails}
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
                <Stack.Screen name="Import Image" component={ImportImage}
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
                <Stack.Screen name="Results" component={Results}
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
