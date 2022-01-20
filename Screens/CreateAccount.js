import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'

const background = require('../images/background.png')
export default function CreateAccount({ navigation }) {


    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Gender, setGender] = useState('');
    const [Contact, setContact] = useState('');

    return (
        <View style={styles.container}>
            {/* <Head></Head> */}
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <Logo></Logo>

                    <View style={Globalstyles.card}>
                        <Screentitle title='Create Account' />
                        <ScrollView style={styles.scrollView}>

                            <Textfield placeholder='First Name' onChangeText={FirstName => setFirstName(FirstName)} />
                            <Textfield placeholder='Last Name' onChangeText={LastName => setLastName(LastName)} />
                            <Textfield placeholder='Email' onChangeText={Email => setEmail(Email)} />
                            <Textfield placeholder='Password' onChangeText={Password => setPassword(Password)} />
                            <Textfield placeholder='Gender' onChangeText={Gender => setGender(Gender)} />
                            <Textfield placeholder='Contact' onChangeText={Contact => setContact(Contact)} />

                        </ScrollView>
                        <Button title='Submit' icon='arrow-forward' onPress={() => navigation.navigate('Sign In')} />
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