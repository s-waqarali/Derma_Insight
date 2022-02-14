import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, Alert, Image, ToastAndroid } from 'react-native'
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
    const [isLoadingReport, setLoadingReport] = useState(false);
    const [isLoadingView, setLoadingView] = useState(true);
    const [ImageUrl, setImageUrl] = useState(undefined);

    const showReport = () => {
        let report = Username + '_' + Patients_ID + '_Report'
        console.log(report)
        storage()
            .ref(report)
            .getDownloadURL()
            .then((url) => {
                console.log(url)
                setImageUrl(url)
                setLoadingView(false)
                setLoadingReport(true)
            })
            .catch(() => {
                ToastAndroid.show('No Report Found', ToastAndroid.SHORT)
            })
    }

    return (

        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => navigation.goBack()}></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                {isLoadingView && (<View style={Globalstyles.card}>
                    <Screentitle title='Check Report' />
                    <Textfield placeholder='Patients ID' value={Patients_ID} onChangeText={Patients_ID => setPatients_ID(Patients_ID)} />
                    <Textfield placeholder='Doctors Username' value={Username} onChangeText={Username => setUsername(Username)} />
                    <Button title='Continue' icon='arrow-forward' onPress={() => { showReport() }} />
                </View>)}
                {isLoadingReport && (<View>
                    <Image
                        source={{ uri: ImageUrl }}
                        style={styles.Lesionimage}
                    />
                </View>)}
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
    Lesionimage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
})