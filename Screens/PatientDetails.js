import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text } from 'react-native'
import Button from '../Components/button'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const reference = database().ref('/Patients/Pat-001');
const background = require('../images/background.png')

export default function PatientDetails({ navigation }) {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [DOB, setDOB] = useState('');
    const [Gender, setGender] = useState('');
    const [Contact, setContact] = useState('');
    const [Email, setEmail] = useState('');
    const [DiagnosedBy, setDiagnosedBy] = useState('');

    return (

        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>

                    <View style={Globalstyles.card}>
                        <Screentitle title='Patient Details' />
                        <ScrollView style={styles.scrollView}>
                            <Textfield placeholder='First Name' onChangeText={FirstName => setFirstName(FirstName)} />
                            <Textfield placeholder='Last Name' onChangeText={LastName => setLastName(LastName)} />
                            <Textfield placeholder='Date of Birth' onChangeText={DOB => setDOB(DOB)} />
                            <Textfield placeholder='Gender' onChangeText={Gender => setGender(Gender)} />
                            <Textfield placeholder='Contact' onChangeText={Contact => setContact(Contact)} />
                            <Textfield placeholder='Email' onChangeText={Email => setEmail(Email)} />
                            <Textfield placeholder='Diagnosed by' onChangeText={DiagnosedBy => setDiagnosedBy(DiagnosedBy)} />
                        </ScrollView>
                        <Button
                            title='Continue'
                            icon='arrow-forward'
                            onPress={
                                () => {
                                    database()
                                        .ref('/Patients/pat')
                                        .set({
                                            First_Name: FirstName,
                                            Last_Name: LastName,
                                            Contact: Contact,
                                            Gender: Gender,
                                            DOB: DOB,
                                            Diagnosed_By: DiagnosedBy,
                                            Email: Email
                            
                                        })
                                        .then(() => console.log('Data set.'));
                                    navigation.navigate('Import Image')
                                }
                            } />
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