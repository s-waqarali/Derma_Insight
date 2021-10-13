import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

export default function Textfield(props) {
    return (
        <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor='#338230'
        onChangeText={props.onChangeText}
      />
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '80%',
      alignSelf: 'center',
      margin: 12,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#338230',
      padding: 10,
      backgroundColor: 'white'
    },
  });