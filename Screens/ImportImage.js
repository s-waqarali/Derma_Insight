import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import Globalstyles from '../Components/globalstyles'

const background = require('../images/background.png')

export default function ImportImage({ navigation }) {
    const [imageURI, setimageURI] = useState('')

    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
                mediaType: 'photo'
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else {
                setimageURI(response.assets[0].uri) 
            }
        });
    }


    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                mediaType: 'photo'
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response.assets);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else {
                setimageURI(response.assets[0].uri) 
            }
        });
    }

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera()
            } else {
                alert("Camera permission denied!");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={chooseImage}>
                        <View style={Globalstyles.card}>
                            <Image
                                source={require('../images/Icon.png')}
                                style={styles.icon}
                            ></Image>
                            <Text style={styles.text}>UPLOAD PHOTO</Text>
                            <Text style={styles.para}>Select a mole or skin lesion picture from your gallery.</Text>
                        </View>
                    </TouchableOpacity>

                    <Image
                        source={{uri: imageURI}}
                        style={styles.icon}
                    ></Image>

                    <TouchableOpacity onPress={requestCameraPermission}>
                        <View style={Globalstyles.card}>
                            <Image
                                source={require('../images/Icon_1.png')}
                                style={styles.icon}
                            ></Image>
                            <Text style={styles.text}>TAKE PHOTO</Text>
                            <Text style={styles.para}>Rapidly take a photo of the skin region for analysis.</Text>
                        </View>
                    </TouchableOpacity>
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
    text: {
        fontSize: 25,
        fontFamily: 'century-gothic',
        color: '#338230',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    para: {
        fontSize: 17,
        fontFamily: 'century-gothic',
        color: '#338230',
        textAlign: 'center'
    },
    icon: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        //backgroundColor: 'white'
    }
})