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

export default class Home extends Component {

    second_onPressButton() {
        Alert.alert('wine2')
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
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <ImageBackground source={require('../img/Entete.png')} style={{ width: wp('30%'),height: hp('10%')}}>

                        </ImageBackground>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.first}>
                            <View style={styles.firstButton}>
                                <ImageBackground source={require('../img/icon1.png')} style={{ height: hp('20%'),marginTop: 20,paddingTop: 20}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={this.second_onPressButton}>

                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={styles.secondButton}>
                                <ImageBackground source={require('../img/icon2.png')} style={{ height: hp('20%'),marginTop: 20,paddingTop: 20}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={() => this.props.navigation.navigate('Glass')}>
                                        <Text>wine2</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={styles.second}>
                            <View style={styles.thirdButton}>
                                <ImageBackground source={require('../img/icon3.png')} style={{ height: hp('20%'), marginTop: 20,paddingTop: 20}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={this.third_onPressButton}>
                                        <Text>wine3</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={styles.fourthButton}>
                                <ImageBackground source={require('../img/icon4.png')} style={{ height: hp('20%'),marginTop: 20,paddingTop: 20}}>
                                    <TouchableOpacity style={{ height: hp('30%')}} onPress={() => this.props.navigation.navigate('ChampagneBest')}>
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
    },
    icon: {
        width:wp('35%'),
        marginTop:50,
        marginBottom:10,
        marginLeft:wp('40%'),
    },
    row:{
        borderWidth: 5,
    },
    first: {
        marginBottom: 3,
        marginRight:20,
        marginLeft:20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstButton: {
        marginRight: 3,
        width: wp('45%'),
        height: hp('30%'),
        borderColor:'#009343',
        borderWidth: 5,
        color:'#f1592a',

    },
    secondButton:{
        width: wp('45%'),
        height: hp('30%'),
        borderColor:'#009343',
        borderWidth: 5,
        color:'#f1592a',
    },
    second:{
        marginRight:20,
        marginLeft:20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thirdButton:{
        marginRight: 3,
        width: wp('45%'),
        height: hp('30%'),
        borderColor:'#009343',
        borderWidth: 5,
        color:'#f1592a',
    },
    fourthButton:{
        width: wp('45%'),
        height: hp('30%'),
        borderColor:'#009343',
        borderWidth: 5,
        color:'white',
    }

});