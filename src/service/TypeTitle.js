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


export default class TypeTitle extends Component {

    constructor(props) {
        super(props);
    }





    render() {
        return (
        <View style={styles.container}>
            <View style={{marginLeft: 10,marginBottom:10, marginTop:30, marginRight: 10}} >
                <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                    {this.props.type}
                </Text>
            </View>
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