import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, Alert, Image } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import storage from '@react-native-firebase/storage';

const background = require('../images/background.png')

export default function PatientReport({ navigation }) {

    const [Patients_ID, setPatients_ID] = useState('');
    const [Username, setUsername] = useState('');
    const [ImageUrl, setImageUrl] = useState(undefined);

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

    const showReport = (Username, Patients_ID) => {
        let report = 'hammad123_P_01_Report'
        console.log(report)
        storage()
            .ref(report)
            .getDownloadURL()
            .then((url) => {
                setImageUrl(url)
            })
            .catch(() => {console.log('error') })
        
    }

    return (

        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => navigation.goBack()}></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={Globalstyles.card}>
                    <Screentitle title='Check Report' />
                    <Textfield placeholder='Patients ID' value={Patients_ID} onChangeText={Patients_ID => setPatients_ID(Patients_ID)} />
                    <Textfield placeholder='Doctors Username' value={Username} onChangeText={Username => setUsername(Username)} />
                    <Button title='Continue' icon='arrow-forward' onPress={showReport} />
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
    scrollView: {
        height: '68%',
    },
    scrollViewOffShow: {
        height: '75%',
    },
    Lesionimage: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
    noData: {
        fontSize: 16,
        color: '#328230',
        textAlign: 'center'
    },
    imageContainer: {
        backgroundColor: '#FFFFFF90',
        borderColor: '#328230',
        borderWidth: 1,
        width: '40%',
    },
})