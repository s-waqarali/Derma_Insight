import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Screentitle(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontFamily: 'century-gothic',
        color: '#338230'
    },
    container: {
        alignSelf: 'center',
        marginBottom: 20
    }

})