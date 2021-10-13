import React from 'react'
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import Button from '../Components/button'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import Head from '../Components/header'
import Logo from '../Components/logo'
import Screentitle from '../Components/screenTitle'
import Textfield from '../Components/textfield'
import Globalstyles from '../Components/globalstyles'

const background = require('../images/background.png')
const DATA = [
    {
        id: "1",
        title: "First Item",
    },
    {
        id: "2",
        title: "Second Item",
    },
    {
        id: "3",
        title: "Third Item",
    },
    {
        id: "1",
        title: "First Item",
    },
    {
        id: "2",
        title: "Second Item",
    },
    {
        id: "3",
        title: "Third Item",
    },
    {
        id: "1",
        title: "First Item",
    },
    {
        id: "2",
        title: "Second Item",
    },
    {
        id: "3",
        title: "Third Item",
    },
    {
        id: "1",
        title: "First Item",
    },
    {
        id: "2",
        title: "Second Item",
    },
    {
        id: "3",
        title: "Third Item",
    },

];

const Item = ({ title }) => (
    <View style={styles.patient}>
      <Text style={styles.patientDetails}>{title}</Text>
    </View>
  );
export default function Profile({ navigation }) {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View style={styles.profileinfo}>
                        <View style={styles.profilepic}>

                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.title}>Patients</Text>
                            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Patient details')}>
                                <Icon name='add-circle' color='#338230'></Icon>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator = {true}
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
    profileinfo: {
        backgroundColor: '#338230',
        width: '80%',
        height: '25%',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 40,
    },
    profilepic: {
        height: '85%',
        width: '45%',
        backgroundColor: 'yellow',
        marginTop: -40,
        marginLeft: 20,
        borderRadius: 20
    },
    card: {
        backgroundColor: '#FFFFFF90',
        borderRadius: 20,
        width: '80%',
        height: '64%',
        alignSelf: 'center',
        paddingVertical: 20,
        marginTop: 10
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
        marginRight: 10
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
    patientDetails: {
        fontSize: 16,
        color: '#328230'
    }
})