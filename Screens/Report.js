import React, { useState, useEffect, useRef } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, Image, ToastAndroid } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Screentitle from '../Components/screenTitle'
import database from '@react-native-firebase/database';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import ResultIcon from '../Components/resultIcon'
import storage from '@react-native-firebase/storage';
import { captureRef } from "react-native-view-shot";


const background = require('../images/background.png')

const Bar = (props) => (
    <View style={styles.head}>
        <View style={styles.Container}>
            <View style={styles.iconContainer}>
                <Icon name={props.icon} color='#308230' />
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.headTitle}>{props.title}</Text>
            </View>
        </View>
    </View>
);

export default function Report({ route, navigation }) {

    const { patient, User, flag } = route.params
    let todayDate = new Date().toISOString().slice(0, 10)

    const [isLoading, setLoading] = useState(true);
    const [patientData, setpatientData] = useState([])
    const [imageUrl, setImageUrl] = useState(undefined);

    let refView = useRef(null)

    let takeScreenShot = () => {
        captureRef(refView, {
            format: "jpg",
            quality: 1
        }).then(
            uri => uploadImage(uri),
            error => console.error("Oops, snapshot failed", error)
        );
    }

    const uploadImage = (uri) => {
        let path = User.Username + '_' + patient.Patients_ID + '_Report'
        storage()
            .ref(path)
            .putFile(uri)
            .then(() => {
                ToastAndroid.show('Report uploaded', ToastAndroid.SHORT)
            })
            .catch(() => {
                ToastAndroid.show('Unable to upload.', ToastAndroid.SHORT)
            }
            )
    }

    const fetchPatientData = async () => {
        const path = '/Patients/' + User.Username + '/' + patient.Patients_ID
        const stpath = User.Username + '/' + patient.Patients_ID
        await database()
            .ref(path)
            .once('value')
            .then((snapshot) => {
                setpatientData(snapshot.val())
                storage()
                    .ref(stpath)
                    .getDownloadURL()
                    .then((url) => {
                        setImageUrl(url)
                        console.log(url)
                        setLoading(false)
                    })
                    .catch(() => { })
            })
    }

    useEffect(() => {
        fetchPatientData();
    }, []);

    return (

        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => {
                if (flag) {
                    navigation.goBack()
                }
                else {
                    navigation.navigate('Profile', { User: User })
                }
            }}></Head>
            <View style={styles.screenshotView} ref={refView} collapsable={false}>

                <Screentitle title='Patient Report' />
                {patientData && (<View>
                    <Bar icon='info-outline' title='Personal Information'></Bar>
                    <View style={styles.separator}></View>
                    <View style={styles.personalInfoCont}>
                        <View>
                            <Text style={styles.personalInfoLabels}>Patient ID:</Text>
                            <Text style={styles.personalInfoLabels}>Patient Name:</Text>
                            <Text style={styles.personalInfoLabels}>Contact:</Text>
                            <Text style={styles.personalInfoLabels}>Gender:</Text>
                            <Text style={styles.personalInfoLabels}>Date:</Text>
                        </View>
                        <View>
                            <Text style={styles.personalInfo}>{patientData.Patients_ID}</Text>
                            <Text style={styles.personalInfo}>{patientData.Name}</Text>
                            <Text style={styles.personalInfo}>{patientData.Contact}</Text>
                            <Text style={styles.personalInfo}>{patientData.Gender}</Text>
                            <Text style={styles.personalInfo}>{todayDate}</Text>
                        </View>
                    </View>


                    <Bar icon='image' title='Lesion Image'></Bar>
                    <View style={styles.separator}></View>

                    <View style={styles.iconContainer}>
                        <View style={styles.iconsubContainer}>
                            <ResultIcon probability={patientData.Probability + '%'} lesion={patientData.Lesion}></ResultIcon>
                            <View style={styles.imageContainer}>
                                {isLoading && <Text style={styles.noData}>Loading...</Text>}
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={styles.Lesionimage}
                                />
                            </View>
                        </View>
                    </View>

                    <Bar icon='insights' title='Lesion Insights'></Bar>
                    <View style={styles.separator}></View>

                    <View style={styles.insightContainer}>
                        <Text style={styles.insightText}>
                        </Text>
                    </View>
                    <View style={styles.separator}></View>
                    <Text style={styles.rightsText}>Generated by Derma Insight</Text>
                </View>)}
            </View>
            <Button
                title='Upload Report'
                icon='upload-file'
                onPress={() => takeScreenShot()}
            />
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
    scrollView: {
        height: '75%',
    },
    head: {
        marginLeft: 20,
        marginBottom: 5
    },
    headTitle: {
        color: 'white',
        fontSize: 17,
        color: '#338230',
        fontFamily: 'century-gothic',
        marginLeft: 15
    },
    Container: {
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
    },
    iconsubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    separator: {
        height: 1,
        backgroundColor: '#A9A9A9',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10
    },
    personalInfoCont: {
        flexDirection: 'row',
        marginBottom: 10

    },
    personalInfoLabels: {
        fontSize: 13,
        color: '#328230',
        marginBottom: 4,
        fontWeight: 'bold',
        marginLeft: 20,

    },
    personalInfo: {
        fontSize: 13,
        color: '#328230',
        marginBottom: 4,
        marginLeft: 20,

    },
    Lesionimage: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
    imageContainer: {
        backgroundColor: '#FFFFFF90',
        borderColor: '#328230',
        borderWidth: 1,
        width: '40%',
    },
    insightContainer: {
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
        borderColor: '#328230',
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        height: '21%',
        marginBottom: 5
    },
    insightText: {
        fontSize: 13,
        marginHorizontal: 7,
        marginVertical: 8,
        textAlign: 'justify'
    },
    noData: {
        fontSize: 16,
        color: '#328230',
        textAlign: 'center'
    },
    screenshotView: {
        backgroundColor: 'white',
        paddingTop: 20,
        marginBottom: -50
    },
    rightsText: {
        textAlign: 'center',
        color: 'gray',
    }
})