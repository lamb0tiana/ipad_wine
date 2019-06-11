import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ImageBackground
} from 'react-native';





export default class Os extends Component {

    constructor(props) {
        super(props); 
        console.log('constructor OS'); 
    }

    static navigationOptions =
    {
        header:null
    }
  

    render() {
        console.log('render OS');
        return (
                <View >
                    <Text>OS bonjour</Text>
                </View>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#999999'
    }

});
