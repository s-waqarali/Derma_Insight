import React, { useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Alert } from 'react-native'
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
    const [Gender, setGender] = useState('');

    const showAlert = (msg) =>
        Alert.alert(
            "Information",
            msg,
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate('Sign In'),
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

    return (
        <View style={styles.container}>
            {/* <Head></Head> */}
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <Logo></Logo>

                    <View style={Globalstyles.card}>
                        <Screentitle title='Create Account' />
                        <ScrollView style={styles.scrollView}>

                            <Textfield placeholder='Name' onChangeText={Name => setName(Name)} />
                            <Textfield placeholder='Username' onChangeText={Username => setUsername(Username)} />
                            <Textfield placeholder='Password' onChangeText={Password => setPassword(Password)} />
                            <Textfield placeholder='Gender' onChangeText={Gender => setGender(Gender)} />

                        </ScrollView>
                        <Button title='Submit' icon='arrow-forward' onPress={
                            () => {
                                const path = '/Users/'+Username
                                database()
                                    .ref(path)
                                    .set({
                                        Name: Name,
                                        Username: Username,
                                        Password: Password,
                                        Gender: Gender,
                                    })
                                    .then(showAlert("Account Created Successfully."))
                                    .catch(function (err){
                                        console.log(err)})
                            }
                        } />
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
        height: '50%',

    }
})