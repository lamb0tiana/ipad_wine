import React, { Component } from 'react';
import {
    Alert,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Accueil extends Component {

    constructor(props) {
        super(props);
        global.Referer = '';
    }
    second_onPressButton() {
        Alert.alert('wine22')
    }
    third_onPressButton() {
        Alert.alert('wine3')
    }

    static navigationOptions =
        {
            header:null
        }
    render() {

        return (
            <ScrollView
                horizontal={true}
                vertical={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <ImageBackground source={require('../img/Entete.png')} style={{ width: wp('30,53%'),height: 0.6*wp('30,53%')}}>

                        </ImageBackground>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.first}>
                            <View style={styles.firstButton}>
                                <ImageBackground source={require('../img/icon1.png')} style={{ height: 1.05*wp('40,38%'),marginTop: 5,paddingTop: 1}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={() => this.props.navigation.navigate('Fullwinelist')}>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={styles.secondButton}>
                                <ImageBackground source={require('../img/icon2.png')} style={{ height: 1.05*wp('40,38%'),marginTop: 5,paddingTop: 1}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={() => this.props.navigation.navigate('Byglasslist')}>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={styles.second}>
                            <View style={styles.thirdButton}>
                                <ImageBackground source={require('../img/icon3.png')} style={{ height: 1.06*wp('40,38%'), marginTop: 5,paddingTop: 1}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={() => this.props.navigation.navigate('Halfofflist')}>
                                        <Text>wine3</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={styles.fourthButton}>
                                <ImageBackground source={require('../img/icon4.png')} style={{ height: 1.06*wp('40,38%'),marginTop: 5,paddingTop: 1}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={() => this.props.navigation.navigate('Bestoflist')}>
                                        <Text>wine4</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#000000',
        width:wp('100%'),
    },
    icon: {
        marginTop:hp("3,8%"),
        marginBottom:wp("5,46"),
        alignItems: 'center'
    },
    row:{
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    first: {
        marginBottom: hp("2,8%"),
        marginRight:20,
        marginLeft:20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstButton: {
        marginRight: wp("2,75%"),
        width: wp('42,38%'),
        height: 1.08*wp('42,38%'),
        borderColor:'#00a54f',
        borderWidth: wp('1,40%'),
        color:'#f1592a',

    },
    secondButton:{
        width: wp('42,38%'),
        height: 1.08*wp('42,38%'),
        borderColor:'#00a54f',
        borderWidth: wp('1,40%'),
        color:'#f1592a',
    },
    second:{
        marginRight:20,
        marginLeft:20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thirdButton:{
        marginRight: wp("2,75%"),
        width: wp('42,38%'),
        height: 1.09*wp('42,38%'),
        borderColor:'#00a54f',
        borderWidth: wp('1,40%'),
        color:'#f1592a',
    },
    fourthButton:{
        width: wp('42,38%'),
        height: 1.09*wp('42,38%'),
        borderColor:'#dbbb6a',
        borderWidth: wp('1,40%'),
        color:'white',
    }

});