import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import Button from '../Components/button'
import Head from '../Components/header'
import Screentitle from '../Components/screenTitle'
import Globalstyles from '../Components/globalstyles'
import database from '@react-native-firebase/database';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import ResultIcon from '../Components/resultIcon'
import ContIcon from '../Components/ContIcon'

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

    // const {patient, User} = route.params

    return (

        <View style={styles.container}>
            <Head name='arrow-back' onPress={() => navigation.navigate('Profile', { User })}></Head>

            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View>
                        <Screentitle title='Patient Report' />

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
                                <Text style={styles.personalInfo}>Patient ID:</Text>
                                <Text style={styles.personalInfo}>Patient Name:</Text>
                                <Text style={styles.personalInfo}>Contact:</Text>
                                <Text style={styles.personalInfo}>Gender:</Text>
                                <Text style={styles.personalInfo}>Date:</Text>
                            </View>
                        </View>


                        <Bar icon='image' title='Lesion Image'></Bar>
                        <View style={styles.separator}></View>

                        <View style={styles.iconContainer}>
                            <View style={styles.iconsubContainer}>
                                <ResultIcon probability={'%'} lesion='Vasc'></ResultIcon>
                                <View style={styles.imageContainer}>
                                    <Image
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
        fontSize: 16,
        color: '#328230',
        marginBottom: 4,
        fontWeight: 'bold',
        marginLeft: 20,

    },
    personalInfo: {
        fontSize: 16,
        color: '#328230',
        marginBottom: 4,
        marginLeft: 20,

    },
    Lesionimage: {
        flex: 1,
        height: '90%',
        width: '90%',
        alignSelf: 'center',
    },
    imageContainer: {
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
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
    }
})