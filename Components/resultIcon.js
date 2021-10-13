import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

export default function ResultIcon(props) {
    return (
        <View>
            <View style={styles.box}>
                <Text style={styles.probability}>{props.probability}</Text>
                <Text style={styles.text}>Probability</Text>
                <Text style={styles.lesionName}>{props.lesion}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        //height: '30%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
        borderStyle: 'dashed',
        borderColor: '#328230',
        borderWidth: 1,
        width: '100%',
    },
    box1: {
        //height: '30%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#328230',
        borderRadius: 20,
        borderStyle: 'dashed',
        borderColor: '#328230',
        borderWidth: 1,
        width: '100%',
    },
    probability: {
        fontSize: 30,
        color: '#328230',
        alignSelf: 'center'
        
    },
    text: {
        fontSize: 20,
        color: '#328230',
        alignSelf: 'center'
    },
    lesionName: {
        fontSize: 10,
        color: '#328230',
        alignSelf: 'center'
    }
});