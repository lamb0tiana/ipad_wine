import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,ImageBackground
} from 'react-native';
import DataManager  from './DataManager';


import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

let dm = DataManager.getInstance();

export default class CountryTitle extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <View style={styles.container}>
                         <Text style={{color:'#808080', fontSize: 32,fontFamily:"American Typewriter", marginBottom:3}}>
                            {dm.compoundCountry(this.props.country)}
                        </Text>   
                     <ImageBackground source={require('../img/rsz_1rsz_point-line-long.png')} style={{height: 6,resizeMode: 'cover'}}>
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
    }});