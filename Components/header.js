import React from 'react'
import { StyleSheet, View,Text } from 'react-native';
import { Header } from 'react-native-elements';
export default function Head(props) {
    return (
        <View>
           <Header
                leftComponent={{ icon: 'arrow-back', color: '#338230', iconStyle: { color: '#338230' } }}
                centerComponent={<Text style={styles.title}>{props.title}</Text>}
                containerStyle={{
                    borderBottomWidth: 2,
                    backgroundColor:'white',
                    paddingTop: -10
                }}
                statusBarProps={{barStyle: 'dark-content', backgroundColor: 'white', hidden: false, showHideTransition: 'slide'}}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        color: '#338230',
        fontSize: 18,
        fontFamily: 'century-gothic'
    }
})
