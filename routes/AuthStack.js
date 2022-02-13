import React from 'react'
import CreateAccount from '../Screens/CreateAccount';
import SignIn from '../Screens/SignIn';
import Profile from '../Screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImportImage from '../Screens/ImportImage';
import PatientDetails from '../Screens/PatientDetails';
import Results from '../Screens/Results';
import Report from '../Screens/Report';
import PatientReport from '../Screens/PatientReport';
import ShowReport from '../Screens/ShowReport';


const Stack = createNativeStackNavigator();

export default function AuthStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Sign In" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Sign In" component={SignIn}/>
                <Stack.Screen name="Create Account" component={CreateAccount}/>
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="Report" component={Report}/>
                <Stack.Screen name="Patient details" component={PatientDetails}/>
                <Stack.Screen name="Import Image" component={ImportImage} />
                <Stack.Screen name="Patient Report" component={PatientReport}/>
                <Stack.Screen name="Show Report" component={ShowReport}/>
                <Stack.Screen name="Results" component={Results}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
