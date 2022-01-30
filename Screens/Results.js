import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import ResultIcon from '../Components/resultIcon'
import ContIcon from '../Components/ContIcon'
import database from '@react-native-firebase/database';


const background = require('../images/background.png')

export default function Results({ route, navigation }) {

    const {prediction, image_Data, patient, Username} = route.params
    console.log('Results--' + patient.Patients_ID)

    const probability = prediction.substring(2, prediction.length - 3).split(',').map(Number)
    const lesionCategory = ['Akiec','Bcc','Bkl','Df','Melanoma','Nevus','Vasc']
    const Lesion = lesionCategory[probability.indexOf(Math.max(...probability))]

    const uploadPredictions = () => {
        const path = '/Patients/' + Username + '/' + patient.Patients_ID
        database()
            .ref(path)
            .update({
                Lesion: Lesion,
            })
            .then(
                navigation.navigate('Report')
            )
            .catch()
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.imageContainer}>
                    <Image
                        source={image_Data}
                        style={styles.Lesionimage}
                    />
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[0] + '%'} lesion='Akiec'></ResultIcon>
                        <ResultIcon probability={probability[1] + '%'} lesion='Bcc'></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[2] + '%'} lesion='Bkl'></ResultIcon>
                        <ResultIcon probability={probability[3] + '%'} lesion='Df '></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[4] + '%'} lesion='Melanoma'></ResultIcon>
                        <ResultIcon probability={probability[5] + '%'} lesion='Nevus'></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[6] + '%'} lesion='Vasc'></ResultIcon>
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
    imageContainer: {
        marginTop: 20,
        height: '30%',
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 30
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
})