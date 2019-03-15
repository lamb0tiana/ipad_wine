import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
    Image
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

    export default class Glass extends Component {
        constructor(props) {
            super(props)
        }

        static navigationOptions =
        {
            header:null
        }

        render() {
          return (
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 27, fontFamily:"american-typewriter", color:'#bd1e2c',marginLeft:3}}>
                     MMBe The Sommelier
                </Text>
                <Image source={require('../img/somme.jpg')} style={styles.image} resizeMode="contain">
                </Image>
                <Text style={styles.text} >
                Life's too short to drink wine you don't like and wine lists can be intimidating, we get that
                </Text>
                <Text style={styles.text}>
                That's why Mr & Mrs Bund offers 32 lovingly picked wines "by the glass" - each in four sizes - so you can sip, savour, enjoy (and switch) as you please, when you please. 
                </Text>
                <Text style={styles.text}>
                You could simply order from our "wine pad" and we'll take it from here, or ask our staff for your wine card, we will bring you on a tour on how you can really be the sommelier!
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Image source={require('../img/retour.png')} style={styles.imageicon} resizeMode="contain"></Image>
                </TouchableOpacity>

            </ScrollView>
          )
        };


    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
            width:wp('100%'),
            padding: 10
        },
        text: {
            color:"white",
            marginBottom: hp("3%")
        },
        image:{
            flex:1, height: hp("35%"), width: wp("95%"),
        },
        imageicon:{
             height: hp("7%"), width: wp("10%"), alignSelf: 'flex-end'
        }
    });
    