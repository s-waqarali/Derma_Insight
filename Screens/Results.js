import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import ResultIcon from '../Components/resultIcon'
import ContIcon from '../Components/ContIcon'

const background = require('../images/background.png')

export default function Results({ route, navigation }) {

    const {pred, image_Data} = route.params
    const probability = pred.substring(2, pred.length - 3).split(',')
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
                        <ResultIcon probability={probability[0]+'%'} lesion='Akiec'></ResultIcon>
                        <ResultIcon probability={probability[1]+'%'} lesion='Bcc'></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[2]+'%'} lesion='Bkl'></ResultIcon>
                        <ResultIcon probability={probability[3]+'%'} lesion='Df '></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[4]+'%'} lesion='Melanoma'></ResultIcon>
                        <ResultIcon probability={probability[5]+'%'} lesion='Nevus'></ResultIcon>
                    </View>
                    <View style={styles.iconsubContainer}>
                        <ResultIcon probability={probability[6]+'%'} lesion='Vasc'></ResultIcon>
                        <ContIcon></ContIcon>
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