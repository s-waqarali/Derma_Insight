import React, { useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View, Text } from 'react-native'
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
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>

                        <Bar icon='image' title='Lesion Image'></Bar>
                        <View style={styles.separator}></View>
                        
                        <View style={styles.iconContainer}>
                            <View style={styles.iconsubContainer}>
                                <ResultIcon probability={'%'} lesion='Vasc'></ResultIcon>
                                <ContIcon></ContIcon>
                            </View>
                        </View>

                        <Bar icon='insights' title='Lesion Insights'></Bar>
                        <View style={styles.separator}></View>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>
                        <Text>aaaa</Text>

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
    separator: {
        height: 2,
        backgroundColor: 'lightgray',
        width: '90%',
        alignSelf: 'center'
    },
    iconContainer: {
        marginTop: 10,
        justifyContent: 'center'
    },
    iconsubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
})