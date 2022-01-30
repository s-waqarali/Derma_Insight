import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text } from 'react-native'
import Button from '../Components/button'
import Screentitle from '../Components/screenTitle'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const background = require('../images/background.png')

export default function Report({ route }) {

    //const { Username } = route.params

    return (

        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View style={Globalstyles.card}>
                        <Screentitle title='Patient Details' />
                        <Button
                            title='Download Report'
                            icon='arrow-forward'
                        />
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
        height: '75%',

    }
})