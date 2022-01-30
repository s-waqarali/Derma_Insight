import React, { useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import Button from '../Components/button'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const background = require('../images/background.png')

export default function PatientDetails({ route, navigation }) {

    const { Username } = route.params

    const [Patients_ID, setPatients_ID] = useState('');
    const [Name, setName] = useState('');
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
                            <Textfield placeholder='Patients ID' value= {Patients_ID} onChangeText={Patients_ID => setPatients_ID(Patients_ID)} />
                            <Textfield placeholder='Name' value= {Name} onChangeText={Name => setName(Name)} />
                            <Textfield placeholder='Date of Birth' value= {DOB} onChangeText={DOB => setDOB(DOB)} />
                            <Textfield placeholder='Gender' value= {Gender} onChangeText={Gender => setGender(Gender)} />
                            <Textfield placeholder='Contact' value= {Contact} keyboardType='numeric' onChangeText={Contact => setContact(Contact)} />
                            <Textfield placeholder='Email' value= {Email} onChangeText={Email => setEmail(Email)} />
                            <Textfield placeholder='Diagnosed by' value= {DiagnosedBy} onChangeText={DiagnosedBy => setDiagnosedBy(DiagnosedBy)} />
                        </ScrollView>
                        <Button
                            title='Continue'
                            icon='arrow-forward'
                            onPress={
                                () => {
                                    let path_patients = '/Patients/'+Username+'/'+Patients_ID
                                    let patient = { Patients_ID: Patients_ID,
                                                    Name: Name,
                                                    Contact: Contact,
                                                    Gender: Gender,
                                                    DOB: DOB,
                                                    Diagnosed_By: DiagnosedBy,
                                                    Email: Email }
                                    database()
                                        .ref(path_patients)
                                        .set(patient)
                                        .then(
                                            () => {
                                                navigation.navigate('Import Image', {patient, Username})
                                                console.log('Data set.')
                                                setPatients_ID('')
                                                setDiagnosedBy('')
                                                setEmail('')
                                                setContact('')
                                                setGender('')
                                                setDOB('')
                                                setName('')
                                            });
                                            
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