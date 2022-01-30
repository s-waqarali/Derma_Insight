import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

export default function ContIcon(props) {
    return (
        <View>
            <TouchableOpacity style={styles.box} onPress={props.onPress}>
                <View style={styles.circle}>
                <Icon name= 'arrow-forward' size={35} color='white' ></Icon>
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        //height: '30%',
        paddingVertical: 25,
        paddingHorizontal: 55,
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
        borderStyle: 'dashed',
        borderColor: '#328230',
        borderWidth: 1,
        width: '100%',
    },
    circle: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: '#328230',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white'
    }
});