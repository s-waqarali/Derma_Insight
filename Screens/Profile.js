import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Head from '../Components/header';
import Dialog from "react-native-dialog";
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Button from '../Components/button';

const background = require('../images/background.png')

export default function Profile({ route, navigation }) {

    const { User } = route.params
    console.log(User)

    const [visible, setVisible] = useState(false);
    const [patientDialog, setpatientDialog] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([])

    const Item = ({ Patient }) => (
        <TouchableOpacity style={styles.patient} onPress={() => showDialog(Patient)}>
            <Text style={styles.patinetID}>{Patient.Patients_ID}</Text>
            <Text style={styles.patinetName}>{Patient.Name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item Patient={item} />
    );

    const showDialog = (Patient) => {
        setpatientDialog(Patient)
        setVisible(true);
    };

    const showAlert = (type, msg) => {
        Alert.alert(
            type,
            msg,
            [{
                text: "Yes",
                onPress: () => { deletePatient() },
                style: "cancel",
            },
            {
                text: "No",
                onPress: () => { },
                style: "cancel",
            }
            ],
            {
                cancelable: true,
                onDismiss: () => Alert.alert("Info Dismissed.")
            }
        );
    }

    const handleCancel = () => {
        setVisible(false);
    };

    const deletePatient = () => {
        const dbpath = 'Patients/' + User.Username + '/' + patientDialog.Patients_ID
        const stpath = User.Username + '/' + patientDialog.Patients_ID
        database().ref(dbpath).remove().then(storage().ref(stpath).delete().then(setVisible(false)))
    };

    let patientData = [];

    const fetchData = async () => {
        const path = '/Patients/' + User.Username
        await database()
            .ref(path)
            .once('value')
            .then((snapshot) => {
                let Patients = snapshot.val()
                if (Patients != null) {
                    const patientID = Object.keys(Patients)
                    for (let i = 0; i < patientID.length; i++) {
                        patientData.push(Patients[patientID[i]])
                    }
                    setLoading(false)
                    setData(patientData)
                }
                else {
                    setData([])
                }

            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Head></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View style={styles.profileinfo}>
                        <View style={styles.profilepic}></View>
                        <View style={styles.profileTextView}>
                            <Text style={styles.profileText}>{User.Name}</Text>
                            <Text style={styles.profileText}>{User.Username}</Text>
                            <Text style={styles.profileText}>{User.Gender}</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.title}>Patients</Text>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={fetchData}>
                                <Icon name='refresh' color='#338230'></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={
                                    () => {
                                        navigation.navigate('Patient details', { User })
                                    }
                                }>
                                <Icon name='add-circle' color='#338230'></Icon>
                            </TouchableOpacity>
                        </View>
                        {isLoading && <Text style={styles.noData}>No data available.</Text>}
                        {data && (
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => item.Patients_ID}
                                showsVerticalScrollIndicator={true}
                            />
                        )}
                        <Button title='Logout' icon='arrow-back' onPress={() => navigation.navigate('Sign In')} />
                    </View>
                    {/* <View style={styles.dialogContainer}> */}
                    <Dialog.Container visible={visible}>
                        <Dialog.Title style={styles.patinetID}>{patientDialog.Name}</Dialog.Title>
                        <Dialog.Description style={styles.patientInfo}>ID: {patientDialog.Patients_ID}</Dialog.Description>
                        <Dialog.Description style={styles.patientInfo}>Email: {patientDialog.Email}</Dialog.Description>
                        <Dialog.Description style={styles.patientInfo}>Gender: {patientDialog.Gender}</Dialog.Description>
                        <Dialog.Description style={styles.patientInfo}>DOB: {patientDialog.DOB}</Dialog.Description>
                        <Dialog.Description style={styles.patientInfo}>Contact: {patientDialog.Contact}</Dialog.Description>
                        <Dialog.Description style={styles.patientInfo}>Diagnosed By: {patientDialog.Diagnosed_By}</Dialog.Description>
                        <Dialog.Description style={styles.patientInfo}>Lesion: {patientDialog.Lesion}</Dialog.Description>
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                        <Dialog.Button label="Delete"
                            onPress={
                                () => showAlert('Information', 'Are you sure you want to delete it?')
                            }
                        />
                    </Dialog.Container>
                    {/* </View> */}
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
    profileinfo: {
        flexDirection: 'row',
        backgroundColor: '#338230',
        width: '80%',
        height: '22%',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 30,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    profilepic: {
        height: '77%',
        width: '35%',
        backgroundColor: 'white',
        marginTop: -25,
        marginLeft: 15,
        borderRadius: 15,
        borderColor: '#338230',
        borderWidth: 1,
    },
    profileText: {
        fontSize: 14,
        color: 'white',
    },
    profileTextView: {
        margin: 10
    },
    card: {
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
        width: '80%',
        height: '75%',
        alignSelf: 'center',
        paddingVertical: 20,
        marginTop: -30,

    },
    title: {
        flex: 1,
        fontSize: 26,
        fontFamily: 'century-gothic',
        color: '#338230',
        marginLeft: 10,
        marginTop: 10,
    },
    icon: {
        marginRight: 10,
        marginTop: 17,
    },
    iconContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        marginRight: 10,
    },
    patient: {
        backgroundColor: '#ffffff',
        width: '90%',
        borderWidth: 1,
        borderColor: '#328230',
        borderRadius: 5,
        borderStyle: 'dashed',
        padding: 8,
        marginBottom: 15,
        marginLeft: 10

    },
    patinetID: {
        fontSize: 17,
        color: '#328230'
    },
    patinetName: {
        fontSize: 13,
        color: '#328230'
    },
    patientInfo: {
        fontSize: 13,
    },
    dialogContainer: {
        flex: 1,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    noData: {
        fontSize: 14,
        color: '#328230',
        textAlign: 'center'
    }
})