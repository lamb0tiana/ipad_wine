import React, { Component } from 'react';
import {
    StyleSheet,
    View,Text
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";


export default class End extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <View style={styles.containerEnd}>
            <Text>enddddddddd</Text>
            </View>
        );
    }



}


const styles = StyleSheet.create({
    containerEnd: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('100%'),
        height:hp('50%')
    }});