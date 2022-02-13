import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, Alert, Image } from 'react-native'
import Head from '../Components/header'

const background = require('../images/background.png')

export default function ShowReport({ route, navigation }) {

    let { uri } = route.params
    console.log(uri)
    
    return (

        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => navigation.goBack()}></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: uri }}
                        style={styles.Lesionimage}
                    />
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