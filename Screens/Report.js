import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Screentitle from '../Components/screenTitle'
import database from '@react-native-firebase/database';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import ResultIcon from '../Components/resultIcon'
import storage from '@react-native-firebase/storage';

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

    const { patient, User } = route.params
    let todayDate = new Date().toISOString().slice(0, 10)

    const [isLoading, setLoading] = useState(true);
    const [patientData, setpatientData] = useState([])
    const [imageUrl, setImageUrl] = useState(undefined);


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
            <Head name='arrow-back' onPress={() => navigation.navigate('Profile', { User })}></Head>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View>
                        <Screentitle title='Patient Report' />
                        {isLoading && <Text style={styles.noData}>Loading...</Text>}
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
                                    hello ye app bht achi hai aap isy use karain ham bhe isy use krty hain main McDonalds sy khana leny jaraha hun tum jb tk lesion check kro,
                                </Text>
                            </View>
                        </View>)}


                        <Button
                            title='Download Report'
                            icon='file-download'
                        />
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
        height: 2,
        backgroundColor: '#A9A9A9',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 15
    },
    personalInfoCont: {
        flexDirection: 'row',
        marginBottom: 15

    },
    personalInfoLabels: {
        fontSize: 15,
        color: '#328230',
        marginBottom: 4,
        fontWeight: 'bold',
        marginLeft: 20,

    },
    personalInfo: {
        fontSize: 15,
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
        height: '17%'
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
    }
})