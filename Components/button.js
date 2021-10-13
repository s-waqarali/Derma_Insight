import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

export default function Button(props) {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <View style={styles.Container}>
                    <View style={styles.iconContainer}>
                        <Icon name={props.icon} color='white'/>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.buttontitle}>{props.title}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: '#338230',
        borderRadius: 30,
        width: '80%',
        alignSelf: 'center',
    },
    buttontitle: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'century-gothic'
    },
    Container: {
        flexDirection: 'row',
        marginVertical: -2,
    },
    iconContainer:{
    },
    titleContainer:{
        flex: 1,
    }
});