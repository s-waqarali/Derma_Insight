import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, FlatList, Button } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Dialog from "react-native-dialog";


const background = require('../images/background.png')

export default function Profile({ route, navigation }) {

    const { PName, Username, Patients } = route.params
    const [visible, setVisible] = useState(false);
    const [patientDialog, setpatientDialog] = useState('');


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

        console.log(Patient.Patients_ID + '------------------')
        setpatientDialog(Patient)
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>

                    <View style={styles.profileinfo}>
                        <View style={styles.profilepic}></View>
                        <Text style={styles.profileText}>{PName}</Text>
                    </View>

                    <View style={styles.card}>

                        <View style={styles.iconContainer}>
                            <Text style={styles.title}>Patients</Text>
                            <TouchableOpacity
                                style={styles.icon}

                                onPress={
                                    () => {
                                        navigation.navigate('Patient details', { Username: Username })
                                    }
                                }>

                                <Icon name='add-circle' color='#338230'></Icon>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={Patients}
                            renderItem={renderItem}
                            keyExtractor={item => item.Patients_ID}
                            showsVerticalScrollIndicator={true}
                        />

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
                            <Dialog.Button label="Cancel" onPress={handleCancel} />
                            <Dialog.Button label="Delete" onPress={handleDelete} />
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
        backgroundColor: '#338230',
        width: '80%',
        height: '25%',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 40,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    profilepic: {
        height: '75%',
        width: '40%',
        backgroundColor: 'white',
        marginTop: -30,
        marginLeft: 15,
        borderRadius: 15,
        borderColor: '#338230',
        borderWidth: 1
    },
    profileText: {
        fontSize: 14,
        color: 'white',
        marginTop: 4,
        marginLeft: 20
    },
    card: {
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
        width: '80%',
        height: '70%',
        alignSelf: 'center',
        paddingVertical: 20,
        marginTop: -25,

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
})