import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Alert } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const background = require('../images/background.png')

export default function SignIn({ navigation }) {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');


    //--------Alert Box to show Alerts
    const showAlert = (type, msg, flag) =>
        Alert.alert(
            type,
            msg,
            [
                {
                    text: "OK",
                    onPress: () => 
                    {
                        if(flag){
                            //--------If credentials are right then fetch the patients.
                            navigation.navigate('Profile',{Name: Name, Username: Username})
                            setUsername('')
                            setPassword('')

                        }
                    },
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        "Info Dismissed."
                    ),
            }
        );

    //--------Checking Credentials of Users
    const checkCredentials = (username, password) => {
        const path = '/Users/' + username
        database()
            .ref(path)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val().Password == password) {
                    setName(snapshot.val().Name)
                    showAlert('Info','Sign In Successful.',true)
                }
                else{
                    showAlert('Error','Invalid Credentials.',false)
                }
            })
            .catch(() => {showAlert('Error','Invalid Credentials.',false)})
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <Logo></Logo>

                    <View style={Globalstyles.card}>
                        <Screentitle title='Sign In' />
                        <Textfield placeholder='Username' value={Username} onChangeText={Username => setUsername(Username)} />
                        <Textfield placeholder='Password' secureTextEntry={true} value={Password} onChangeText={Password => setPassword(Password)} />

                        <Button title='Submit' icon='arrow-forward'
                            onPress={
                                () => {
                                    checkCredentials(Username, Password)
                                }
                            } />

                        <Button title='Create Acoount' icon='supervised-user-circle' onPress={() => navigation.navigate('Create Account')} />

                        <Button title='Sign In with Google' icon='wb-twighlight' />
                    </View>

                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    container2: {
        marginTop: 20,
    }
})