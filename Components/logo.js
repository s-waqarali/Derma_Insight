import { BackgroundColor } from 'chalk'
import React from 'react'
import { Image, View, StyleSheet, Text } from 'react-native'
export default function Logo() {
    return (
        <View style={styles.container}>
            <Image 
            source={require('../images/Logo.png')}
            style = {styles.logo}
            ></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    logo: {
        height: 150,
        width: 200
    }
})