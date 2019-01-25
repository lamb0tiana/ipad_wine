import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image, ImageBackground,
    Button, ScrollView
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

export default class ChampagneBest extends Component {

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
                <View style={{backgroundColor:'#009343',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight: 5}}>Filter</Text>
                    <View
                        style={{width:wp('10%'),backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{color:'#fff',textAlign: 'center'}}>31</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#009343',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight: 5}}>My Selection</Text>
                    <View
                        style={{width:wp('10%'),backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{color:'#fff',textAlign: 'center'}}>31</Text>
                    </View>
                </View>
            </View>,
        headerStyle: {
            backgroundColor: '#333130',
        },
    });

    render() {
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
                            <Text style={{color:'#f1592a'}}>
                                Argentina
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Australia
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                China
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                France
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Italy
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Israel
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Chile
                            </Text>
                        </View>
                        <View style={{marginLeft:10,color:'#f1592a'}}>
                            <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                <Text style={{color:'#fff',fontSize: 17,marginLeft:3}}>
                                    WHITE
                                </Text>
                            </View>
                            <Text style={{color:'#f1592a'}}>
                                Argentina
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Australia
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                China
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                France
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Italy
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Israel
                            </Text>
                            <Text style={{color:'#f1592a'}}>
                                Chile
                            </Text>
                        </View>
                        <View style={{marginBottom:10,marginLeft:10,marginRight: 10}}>
                            <View>
                                <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                    <Text style={{color:'#fff',fontSize: 17,marginLeft:3}}>
                                        CHAMPAGNE
                                    </Text>
                                </View>
                                <Text style={{color:'#f1592a'}}>
                                    Argentina
                                </Text>
                                <Text style={{color:'#f1592a'}}>
                                    Australia
                                </Text>
                                <Text style={{color:'#f1592a'}}>
                                    China
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#C4698F',borderLeftWidth: 10}}>
                                    <Text style={{color:'#C4698F',fontSize: 17,marginLeft:3}}>
                                        ROSE
                                    </Text>
                                </View>
                                <Text style={{color:'#f1592a'}}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                    <Text style={{color:'#fff',fontSize: 17,marginLeft:3}}>
                                        SWEET
                                    </Text>
                                </View>
                                <Text style={{color:'#f1592a'}}>
                                    France
                                </Text>
                                <Text style={{color:'#f1592a'}}>
                                    Australie
                                </Text>
                                <Text style={{color:'#f1592a'}}>
                                    Hun#808080
                                </Text>
                                <Text style={{color:'#f1592a'}}>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('GlassDetail')}>
                                    <View
                                        style={{
                                            backgroundColor:'#0D0D0D',
                                            opacity:0.3,
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
                                </TouchableOpacity>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.3,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                    <Text style={{color:'#f1592a',paddingLeft: wp('4%')}}>
                                        500V
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <View
                                    style={{
                                        backgroundColor:'#0D0D0D',
                                        opacity:0.3,
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
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.3,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                    <Text style={{color:'#f1592a',paddingLeft: wp('4%')}}>
                                        500V
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <View
                                    style={{
                                        backgroundColor:'#0D0D0D',
                                        opacity:0.3,
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
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.3,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                    <Text style={{color:'#f1592a',paddingLeft: wp('4%')}}>
                                        500V
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <View
                                    style={{
                                        backgroundColor:'#0D0D0D',
                                        opacity:0.3,
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
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.3,width:wp('20%'),marginLeft:1,marginRight: 10}}>
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

});
