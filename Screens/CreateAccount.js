import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Alert, Keyboard } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const background = require('../images/background.png')

export default function CreateAccount({ navigation }) {


    const [Name, setName] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Organization, setOrganization] = useState('');
    const [Designation, setDesignation] = useState('');
    const [Gender, setGender] = useState('');

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

    const showAlert = (type, msg, flag) =>
        Alert.alert(
            type,
            msg,
            [{
                text: "OK",
                onPress: () => {
                    if (flag) {
                        navigation.navigate('Sign In')
                    }
                },
                style: "cancel",
            }],
            {
                cancelable: true,
                onDismiss: () => Alert.alert("Info Dismissed."),
            }
        );

    const usernameExist = async (Username) => {
        let users = {}
        await database().ref('/Users/').once('value').then((snapshot) => { users = snapshot.val() })
        if (Username in users) {
            return true
        }
        else {
            return false
        }
    }

    const validateUser = async (User) => {
        console.log(User);
        for (let property in User) {
            if (User[property] == "") {
                return { userValidated: false, errorType: 'All fields are required.' }
            }
        }
        if (User['Password'].length < 6) {
            return { userValidated: false, errorType: 'Password must contain atleast 6 characters.' }
        }
        if (await usernameExist(User['Username'])) {
            return { userValidated: false, errorType: 'Username already exist.' }
        }
        return { userValidated: true, errorType: '' }
    }

    const createAccount = async() => {
        let User = {
            Name: Name,
            Username: Username,
            Password: Password,
            Gender: Gender,
            Designation: Designation,
            Organization: Organization
        }

        let {userValidated, errorType}  = await validateUser(User) 
        console.log(userValidated + errorType)

        if (userValidated) {
            let path = '/Users/' + Username
            database()
                .ref(path)
                .set(User)
                .then(() => showAlert('Info', 'Account Created Successfully.', true))
                .catch(() => showAlert('Error', 'Failed to Create Account.', false))
        }
        else {
            showAlert('Error', errorType, false)
        }

    }

    return (
        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => navigation.goBack()}></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                {!keyboardStatus && (<Logo></Logo>)}

                    <View style={Globalstyles.card}>
                        <Screentitle title='Create Account' />
                        
                        <ScrollView style={[!keyboardStatus ? styles.scrollViewOffShow: styles.scrollView]}>
                            <Textfield placeholder='Name' onChangeText={Name => setName(Name)} />
                            <Textfield placeholder='Username' onChangeText={Username => setUsername(Username)} />
                            <Textfield placeholder='Password' secureTextEntry={true} onChangeText={Password => setPassword(Password)} />
                            <Textfield placeholder='Gender' onChangeText={Gender => setGender(Gender)} />
                            <Textfield placeholder='Organization' onChangeText={Organization => setOrganization(Organization)} />
                            <Textfield placeholder='Designation' onChangeText={Designation => setDesignation(Designation)} />
                        </ScrollView>

                        <Button title='Submit' icon='arrow-forward' onPress={createAccount} />
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
    },
    scrollView: {
        height: '70%',

    },
    scrollViewOffShow: {
        height: '50%',

    }
})