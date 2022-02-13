import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';

export const LeftComponent = (props) => {
  return(
      <TouchableOpacity onPress={props.onPress}>
          <Icon color='#338230' name={props.name}></Icon>
      </TouchableOpacity>
  )
};

export default function Head(props) {
    return (
        <View>
            <Header
                leftComponent={<LeftComponent name={props.name} onPress={props.onPress}></LeftComponent>}
                centerComponent={<Text style={styles.title}>Derma Insight</Text>}
                containerStyle={{
                    borderBottomWidth: 2,
                    backgroundColor: 'white',
                    paddingTop: 15
                }}
                statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white', hidden: false, showHideTransition: 'slide' }}
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
