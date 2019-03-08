import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image, ImageBackground,
    Button, ScrollView, TextInput
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

export default class Fullwinelist extends Component {

    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }

    onPressPlus = () => {
        this.setState({
            count: this.state.count+1
        })
    }

    onPressMoin = () => {
        this.setState({
            count: this.state.count-1
        })
    }

    static navigationOptions = ({navigation}) => ({
        headerLeft:
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{marginLeft:2,paddingLeft:2,marginTop: 13,marginBottom: 8}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('6%'),width:wp('10.5%')}}>
                        <TouchableOpacity style={{ height: hp('10%')}} onPress={() => navigation.navigate('Home')}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:2,marginTop:10,marginRight:10,marginBottom:10,padding:5}} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground source={require('../img/home.png')} style={{ height: hp('6%'),width:wp('10.5%')}}>
                        <TouchableOpacity style={{ height: hp('10%')}} onPress={() => navigation.navigate('Home')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>,
        headerRight:
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{backgroundColor:'#CECECE',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight:3,backgroundColor:'#009343',padding:3}}>Filter</Text>
                    <View
                        style={{width:wp('10%'),backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{color:'#fff',textAlign: 'center',padding:3}}>31</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#CECECE',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight: 3,backgroundColor:'#009343',padding:3}}>My Selection</Text>
                    <View
                        style={{width:wp('10%'),backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{color:'#fff',textAlign: 'center',padding:3}}>
                                23
                        </Text>
                    </View>
                </View>
            </View>,
        headerStyle: {
            backgroundColor: '#333130',
        },
    });

    render() {
        const onPressMoinButton = () => {
            if (this.state.count !== 0) {
                return <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2.8%'),width:wp('5%')}}>
                            <TouchableOpacity style={{ height: hp('5%')}} onPress={this.onPressMoin}>
                            </TouchableOpacity>
                        </ImageBackground>;
            }
        }

        const onPressMoinPlus = () => {
            if (this.state.count !== 0) {
                return <TouchableOpacity style={{ height: hp('5%')}} onPress={this.onPressPlus}>
                    <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2.8%'),width:wp('5%')}}>
                    </ImageBackground>
                </TouchableOpacity>
            }
            else return <TouchableOpacity style={{ height: hp('5%'), paddingRight: wp('5%')}} onPress={this.onPressPlus}>
                <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2.8%'),width:wp('5%')}}>
                </ImageBackground>
            </TouchableOpacity>;
        }

        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%')}}>
                <View style={styles.container}>
                    <View style={{marginTop:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{marginLeft:10,color:'#f1592a'}}>
                            <View style={{borderColor:'#f1592a',borderLeftWidth: 10}}>
                                <Text style={{fontSize: 17,color:'#f1592a',marginLeft:3}}>
                                    RED
                                </Text>
                            </View>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,marginTop:10,paddingLeft:5}}>
                                Argentina
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Australia
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                China
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Chile
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                France
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Israel
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Italy
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                New Zealand
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                South Africa
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Spain
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                USA
                            </Text>
                        </View>
                        <View style={{marginLeft:10,color:'#f1592a'}}>
                            <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                <Text style={{color:'#fff',fontSize: 17,marginLeft:3}}>
                                    WHITE
                                </Text>
                            </View>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,marginTop:10,paddingLeft:5}}>
                                Australia
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Argentina
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                China
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Austria
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Canada
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Chile
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                China
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                France
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Germany
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Italy
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Japan
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                New Zealand
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                Spain
                            </Text>
                            <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                USA
                            </Text>
                        </View>
                        <View style={{marginBottom:10,marginLeft:10,marginRight: 10}}>
                            <View>
                                <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                    <Text style={{color:'#fff',fontSize: 17,marginLeft:3}}>
                                        CHAMPAGNE
                                    </Text>
                                </View>
                                <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,marginTop:10,paddingLeft:5}}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#C4698F',borderLeftWidth: 10}}>
                                    <Text style={{color:'#C4698F',fontSize: 17,marginLeft:3}}>
                                        ROSE
                                    </Text>
                                </View>
                                <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,marginTop:10,paddingLeft:5}}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                    <Text style={{color:'#fff',fontSize: 17,marginLeft:3}}>
                                        SWEET
                                    </Text>
                                </View>
                                <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,marginTop:10,paddingLeft:5}}>
                                    Australia
                                </Text>
                                <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                    France
                                </Text>
                                <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                    Hungray
                                </Text>
                                <Text style={{color:'#f1592a',backgroundColor:'#0D0D0D',opacity:1,width:wp('25%'),marginBottom:10,paddingLeft:5}}>
                                    Italy
                                </Text>
                            </View>
                            <View style={{color:'blue',borderTopWidth: 4,borderColor:'blue',fontSize: 17}}>
                                <View style={{borderColor:'blue',borderLeftWidth: 10,marginBottom:3,marginTop:4}}>
                                    <Text style={{color:'blue',marginLeft:3}}>
                                        BY GLASS
                                    </Text>
                                </View>
                                <View style={{borderColor:'blue',borderLeftWidth: 10,marginBottom:3}}>
                                    <Text style={{color:'blue',marginLeft:3}}>
                                        B1G1
                                    </Text>
                                </View>
                                <View style={{borderColor:'blue',borderLeftWidth: 10,marginBottom:3}}>
                                    <Text style={{color:'blue',marginLeft:3}}>
                                        BEST OF
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 20,marginLeft: 10,marginBottom:20,marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 30}}>
                            CHAMPAGNE
                        </Text>
                        <Text style={{color:'#FF0000'}}>
                            Mr & Mrs Bund celebrate the weekend with their incredible Moet & Chandon Special!
                        </Text>
                        <Text style={{color:'#008000'}}>
                            Every Thursday,Friday and Sarturday, from 11 Pm,
                        </Text>
                        <Text style={{color:'#008000'}}>
                            Buy one bottle or Moet & Chandon Brut Imperial and enjoy an additional bottle offered by Mr $ Mrs Bund!
                        </Text>
                        <Text style={{color:'#fff'}}>
                            (Not available During Special Events)
                        </Text>
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 10,
                                    borderColor: '#808080',
                                    flex: 1,
                                    borderBottomStyle: 'dotted',
                                    borderBottomWidth:2
                                }}
                            >
                                <Text style={{color:'#808080',fontSize: 20}}>
                                    France
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FullwinelistDetail', {
                                    JSON_ListView_Clicked_Item: this.state.count,
                                })}>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                        <View
                                            style={{
                                                backgroundColor:'#0D0D0D',
                                                opacity:0.8,
                                                marginRight:1,
                                                width:wp('80%'),
                                            }}>
                                            <Text style={{color:'#f1592a',paddingLeft: 10}}>
                                                Armande de brignac bruit gold
                                            </Text>
                                            <Text style={{color:'#ffffff',paddingLeft: 10}}>
                                                Champagne,Raims N.V
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.8,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),paddingRight:wp('4%'), height:hp('5%'),padding:7, marginTop: wp('-1.5%')}}>
                                            {onPressMoinButton()}
                                            <Text value={this.state.count}
                                                  onChangeText={count => this.setState({ count })}
                                                  style={[styles.countText]}>
                                                { this.state.count !== 0 ? this.state.count: null}
                                            </Text>
                                            {onPressMoinPlus()}
                                        </View>
                                    <Text style={{color:'#FFFFFF',paddingLeft: wp('4%'), marginTop: wp('-1.5%')}}>
                                        500$
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <View
                                    style={{
                                        backgroundColor:'#0D0D0D',
                                        opacity:0.8,
                                        marginRight:1,
                                        width:wp('80%'),
                                    }}>
                                    <Text style={{color:'#f1592a',paddingLeft: 10}}>
                                        Armande de brignac bruit gold
                                    </Text>
                                    <Text style={{color:'#ffffff',paddingLeft: 10}}>
                                        Champagne,Raims N.V
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.8,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                    <Text style={{color:'#f1592a',paddingLeft: wp('4%')}}>
                                        500V
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <View
                                    style={{
                                        backgroundColor:'#0D0D0D',
                                        opacity:0.8,
                                        marginRight:1,
                                        width:wp('80%'),
                                    }}>
                                    <Text style={{color:'#f1592a',paddingLeft: 10}}>
                                        Armande de brignac bruit gold
                                    </Text>
                                    <Text style={{color:'#ffffff',paddingLeft: 10}}>
                                        Champagne,Raims N.V
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.8,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                    <Text style={{color:'#f1592a',paddingLeft: wp('4%')}}>
                                        500V
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <View
                                    style={{
                                        backgroundColor:'#0D0D0D',
                                        opacity:0.8,
                                        marginRight:1,
                                        width:wp('80%'),
                                    }}>
                                    <Text style={{color:'#f1592a',paddingLeft: 10}}>
                                        Armande de brignac bruit gold
                                    </Text>
                                    <Text style={{color:'#ffffff',paddingLeft: 10}}>
                                        Champagne,Raims N.V
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.8,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                    <Text style={{color:'#f1592a',paddingLeft: wp('4%')}}>
                                        500V
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('100%'),

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    countText: {
        color: '#ffffff'
    }

});
