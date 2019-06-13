import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";


export default class Start extends Component {

    constructor(props) {
        super(props);//w =1004, h =181
    }




    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:'#fff',fontSize: 38,fontFamily:"American Typewriter"}}>
                CHAMPAGNE
                </Text>
            </View>
        );
    }



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('94%'),
        marginLeft:wp('3%'),
        marginTop: 20
    }});