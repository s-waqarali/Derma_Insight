import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, View, Alert, Keyboard, ToastAndroid } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const background = require('../images/background.png')

export default function SignIn({ navigation }) {

    const [User, setUser] = useState(null);
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus(true);
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    useEffect(() => {
        if (User != null) {
            navigation.navigate('Profile', { User: User })
        }
    }, [User]);

    const showAlert = (type, msg, flag) =>
        Alert.alert(
            type,
            msg,
            [{
                text: "OK",
                style: "cancel",
            }],
            {
                cancelable: true,
                onDismiss: () => Alert.alert("Info Dismissed."),
            }
        );

    const checkCredentials = (username, password) => {
        const path = '/Users/' + username
        database()
            .ref(path)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val().Password == password) {
                    ToastAndroid.show('Sign In successful', ToastAndroid.SHORT)
                    setUser(snapshot.val())
                    setUsername('')
                    setPassword('')
                }
                else {
                    showAlert('Error', 'Invalid Credentials.', false)
                }
            })
            .catch(() => { showAlert('Error', 'Invalid Credentials.', false) })
    }

    return (
        <View style={styles.container}>
            <Head></Head>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    {!keyboardStatus && (<Logo></Logo>)}
                    <View style={Globalstyles.card}>
                        <Screentitle title='Sign In' />
                        <Textfield placeholder='Username' value={Username} onChangeText={Username => setUsername(Username)} />
                        <Textfield placeholder='Password' secureTextEntry={true} value={Password} onChangeText={Password => setPassword(Password)} />
                        <Button title='Submit' icon='arrow-forward'
                            onPress={() => {
                                checkCredentials(Username, Password)
                            }}/>
                        <Button title='Create Acoount' icon='account-circle' onPress={() => navigation.navigate('Create Account')} />
                        <Button title='Check Reports' icon='supervised-user-circle' onPress={() => navigation.navigate('Patient Report')} />
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