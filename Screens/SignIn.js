import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'

const background = require('../images/background.png')

export default function SignIn({navigation}) {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <Logo></Logo>

                    <View style={Globalstyles.card}>
                            <Screentitle title='Sign In' />
                            <Textfield placeholder='Username' />
                            <Textfield placeholder='Password' />
                            <Button title='Submit' icon='arrow-forward' action={()=>navigation.navigate('Profile')}/>
                            <Button title='Create Acoount' icon='arrow-forward' action={()=>navigation.navigate('Create Account')}/>
                            <Button title='Sign In with Google' icon='arrow-forward' />
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
    }
})