import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import ResultIcon from '../Components/resultIcon'
import ContIcon from '../Components/ContIcon'
import Head from '../Components/header'
import database from '@react-native-firebase/database';


const background = require('../images/background.png')

export default function Results({ route, navigation }) {

    const { prediction, image_Data, patient, User } = route.params

    const probabilities = prediction.substring(2, prediction.length - 3).split(',').map(Number)
    const lesionCategory = ['Akiec', 'Bcc', 'Bkl', 'Df', 'Melanoma', 'Nevus', 'Vasc']
    const Lesion = lesionCategory[probabilities.indexOf(Math.max(...probabilities))]
    const Probability = Math.max(...probabilities)

    const uploadPredictions = () => {
        const path = '/Patients/' + User.Username + '/' + patient.Patients_ID
        database()
            .ref(path)
            .update({
                Lesion: Lesion,
                Probability: Probability
            })
            .then(
                navigation.navigate('Report', { patient, User })
            )
            .catch()
    }

    return (
        <View style={styles.container}>
            <Head></Head>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.imageContainer}>
                    <Image
                        source={image_Data}
                        style={styles.Lesionimage}
                    />
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probabilities[0] + '%'} lesion='Akiec'></ResultIcon>
                        <ResultIcon probability={probabilities[1] + '%'} lesion='Bcc'></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probabilities[2] + '%'} lesion='Bkl'></ResultIcon>
                        <ResultIcon probability={probabilities[3] + '%'} lesion='Df '></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probabilities[4] + '%'} lesion='Melanoma'></ResultIcon>
                        <ResultIcon probability={probabilities[5] + '%'} lesion='Nevus'></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probabilities[6] + '%'} lesion='Vasc'></ResultIcon>
                        <ContIcon onPress={uploadPredictions}></ContIcon>
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
    iconContainer: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center'
    },
    iconsubContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    image: {
        flex: 1,
    },
    Lesionimage: {
        flex: 1,
        height: '90%',
        width: '90%',
        alignSelf: 'center',
    },
    imageContainer: {
        marginTop: 20,
        height: '30%',
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 30
    },
})