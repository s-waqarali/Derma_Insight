import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'

const background = require('../images/background.png')
export default function CreateAccount({navigation}) {
    return (
        <View style={styles.container}>
            {/* <Head></Head> */}
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <Logo></Logo>

                    <View style={Globalstyles.card}>
                        <Screentitle title='Create Account' />
                        <ScrollView style={styles.scrollView}>
                            <Textfield placeholder='First Name' />
                            <Textfield placeholder='Last Name' />
                            <Textfield placeholder='Email' />
                            <Textfield placeholder='Gender' />
                            <Textfield placeholder='Contact' />
                            <Textfield placeholder='Password' />
                        </ScrollView>
                        <Button title='Submit' icon='arrow-forward' action={()=>navigation.navigate('Sign In')} />
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
        height: '50%',

    }
})