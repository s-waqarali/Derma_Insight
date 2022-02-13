import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Keyboard, Alert } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';

const background = require('../images/background.png')

export default function PatientDetails({ route, navigation }) {

    const { User } = route.params

    const [Patients_ID, setPatients_ID] = useState('');
    const [Name, setName] = useState('');
    const [DOB, setDOB] = useState('');
    const [Gender, setGender] = useState('');
    const [Contact, setContact] = useState('');
    const [Email, setEmail] = useState('');
    const [DiagnosedBy, setDiagnosedBy] = useState('');

    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const patientExist = async (Patients_ID) => {
        let patients = null
        let path_patients = '/Patients/' + User.Username
        await database().ref(path_patients).once('value').then((snapshot) => { patients = snapshot.val() }).catch()
        if(patients!=null){
            if (Patients_ID in patients) {
                return true
            }
            else {
                return false
            }
        }
    }

    const validatePatient = async (Patient) => {
        console.log(Patient);
        for (let property in Patient) {
            if (Patient[property] == "") {
                return { patientValidated: false, errorType: 'All fields are required.' }
            }
        }
        if (await patientExist(Patient['Patients_ID'])) {
            return { patientValidated: false, errorType: 'Patient ID already exist.' }
        }
        return { patientValidated: true, errorType: '' }
    }

    const showAlert = (type, msg, flag) =>
        Alert.alert(
            type,
            msg,
            [{
                text: "OK",
                onPress: () => {
                    if (flag) {
                        navigation.navigate('Sign In')
                    }
                },
                style: "cancel",
            }],
            {
                cancelable: true,
                onDismiss: () => Alert.alert("Info Dismissed."),
            }
        );

    const addPatient = async () => {
        let patient = {
            Patients_ID: Patients_ID,
            Name: Name,
            Contact: Contact,
            Gender: Gender,
            DOB: DOB,
            Diagnosed_By: DiagnosedBy,
            Email: Email
        }

        let { patientValidated, errorType } = await validatePatient(patient)
        if (patientValidated) {
            let path_patients = '/Patients/' + User.Username + '/' + Patients_ID
            database()
                .ref(path_patients)
                .set(patient)
                .then(
                    () => {
                        navigation.navigate('Import Image', { patient, User })
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
        else {
            showAlert('Error', errorType, false)
        }
    }

    return (

        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => navigation.goBack()}></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>

                    <View style={Globalstyles.card}>
                        <Screentitle title='Patient Details' />
                        <ScrollView style={[!keyboardStatus ? styles.scrollViewOffShow : styles.scrollView]}>
                            <Textfield placeholder='Patients ID' value={Patients_ID} onChangeText={Patients_ID => setPatients_ID(Patients_ID)} />
                            <Textfield placeholder='Name' value={Name} onChangeText={Name => setName(Name)} />
                            <Textfield placeholder='Date of Birth' value={DOB} onChangeText={DOB => setDOB(DOB)} />
                            <Textfield placeholder='Gender' value={Gender} onChangeText={Gender => setGender(Gender)} />
                            <Textfield placeholder='Contact' value={Contact} keyboardType='numeric' onChangeText={Contact => setContact(Contact)} />
                            <Textfield placeholder='Email' value={Email} onChangeText={Email => setEmail(Email)} />
                            <Textfield placeholder='Diagnosed by' value={DiagnosedBy} onChangeText={DiagnosedBy => setDiagnosedBy(DiagnosedBy)} />
                        </ScrollView>
                        <Button title='Continue' icon='arrow-forward' onPress={addPatient} />
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
        height: '68%',
    },
    scrollViewOffShow: {
        height: '75%',
    }
})