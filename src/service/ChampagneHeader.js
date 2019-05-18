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
                <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                CHAMPAGNE
                </Text>
                <Text style={{marginTop: 6, color:'#FF0000',fontSize: 22.5,fontFamily:"American Typewriter"}}>
                Mr & Mrs Bund celebrate the weekend with their incredible Moet & Chandon Special!
                </Text>
                <Text style={{marginTop: 4, color:'#008000',fontSize: 18,fontFamily:"American Typewriter"}}>
                Every Thursday,Friday and Sarturday, from 11 Pm,
                </Text>
                <Text style={{marginTop: 4, color:'#008000',fontSize: 18,fontFamily:"American Typewriter"}}>
                Buy one bottle or Moet & Chandon Brut Imperial and enjoy an additional bottle offered by Mr $ Mrs Bund!
                </Text>
                <Text style={{marginTop: 4, color:'#fff',fontSize: 16,fontFamily:"American Typewriter"}}>
                (Not available During Special Events)
                </Text>
            </View>
        );
    }



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('97%'),
        marginLeft:wp('1.5%'),
    }});