import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,ImageBackground
} from 'react-native';
import DataManager  from './DataManager';
import Dash from 'react-native-dash';


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
                        <Dash style={{width:wp('97%'), height:15}} 
                        dashGap={8}
                        dashColor={'#686767'}
                        dashThickness={7}
                        dashLength={7}
                        dashStyle={{borderRadius: 100, overflow: 'hidden'}}/>
                       
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