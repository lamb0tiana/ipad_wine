import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,ImageBackground
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";


export default class CountryTitle extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <View style={styles.container}>
                         <Text style={{color:'#808080', fontSize: 40,fontFamily:"American Typewriter", marginBottom:3}}>
                            {this.props.country}
                        </Text>   
                     <ImageBackground source={require('../img/point-line-long.png')} style={{height: hp('1%'), width:wp('97%'),resizeMode: 'contain'}}>
                        </ImageBackground>
                       
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
        marginTop:23,
        marginBottom:10
    }});