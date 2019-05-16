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


export default class CountryTitle extends Component {

    constructor(props) {
        super(props);
    }



onLayout = event => {
  
    let {width, height} = event.nativeEvent.layout;
    console.log('wsee'+width + 'hsee'+height);
}

    render() {
        return (
            <View style={styles.container}>
                         <Text style={{color:'#808080', fontSize: 44,fontFamily:"American Typewriter"}}>
                            France
                        </Text>   
                        <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />            
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