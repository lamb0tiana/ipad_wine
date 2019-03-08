import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
    View,
    Image, ImageBackground,
    Button, ScrollView
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

export default class FullwinelistDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
        };
    }


    static navigationOptions = ({navigation}) => ({
        headerLeft:
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{marginLeft:2,paddingLeft:2,marginTop: 12,marginBottom: 10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('6%'),width:wp('10.5%')}}>
                        <TouchableOpacity style={{ height: hp('10%')}} onPress={() => navigation.navigate('Fullwinelist')}>

                        </TouchableOpacity>
                    </ImageBackground>

                </View>
            </View>,
        headerRight:
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{backgroundColor:'#CECECE',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight: 5,backgroundColor:'#009343',padding:3}}>My Selection</Text>
                    <View
                        style={{width:wp('10%'),backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{color:'#fff',textAlign: 'center',padding:3}}>31</Text>
                    </View>
                </View>
            </View>,
        headerStyle: {
            backgroundColor: '#333130',
        },
    });
    plus_onPressButton(){

        this.setState({
           isHidden:true,
       })
    }
    render() {
        const show = () => {
            if (!this.state.isHidden) {

                return <View><Text>2</Text></View>;

            }
        }

        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%')}}>
                <View style={styles.container}>
                    <View
                        style={{
                            marginTop:20,
                            marginBottom: 20,
                            marginLeft:5,
                            marginRight:10,
                            borderColor: '#ffffff',
                            flex: 1,
                            borderBottomStyle: 'dotted',
                            borderBottomWidth:2
                        }}
                    >
                        <Text style={{color:'#ffffff',fontSize: 20}}>
                            BERECHE Le cran Premier Cru
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.border_one}>
                            <ImageBackground source={require('../img/icon1.png')} style={{ height: hp('20%'),marginTop: 20,paddingTop: 20}}>

                            </ImageBackground>
                        </View>
                        <View style={styles.border_two}>
                            <View style={styles.border}>
                                <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <View style={{ borderWidth: 2, borderColor:'gray',marginRight:0, backgroundColor:'#f1592a',paddingRight:0}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>N.V</Text>
                                    </View>
                                    <View style={{ borderWidth: 2, borderColor:'gray',marginRight:0,paddingRight:0,marginLeft:2, backgroundColor:'black'}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>CHAMPAGNE</Text>
                                    </View>

                                    <View style={{marginRight:0,paddingRight:0,marginLeft:2, backgroundColor:'black'}}>
                                        <Text style={{ color:'#ffffff',paddingTop: 7, paddingLeft: 5, paddingRight:5}}>{ this.props.navigation.state.params.JSON_ListView_Clicked_Item !== 0 ? this.props.navigation.state.params.JSON_ListView_Clicked_Item: null}</Text>
                                    </View>
                                    <View style={{ width:wp('5%'),marginLeft:0, height:hp('5%'),padding:7}}>
                                        <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2.8%'),width:wp('5%')}}>
                                            <TouchableOpacity style={{ height: hp('5%')}} onPress={this.plus_onPressButton}>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                </View>
                                <View style={{marginTop:6,flexDirection: 'row',justifyContent: 'space-between' }}>
                                    <View style={{ borderWidth: 2, borderColor:'gray',marginRight:0, backgroundColor:'#f1592a',paddingRight:0}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>N/A</Text>
                                    </View>
                                    <View style={{ borderWidth: 2, borderColor:'gray',marginRight:0,marginLeft:2, backgroundColor:'#f1592a',paddingRight:0}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>0.75L</Text>
                                    </View>
                                    <View style={{ borderWidth: 2, borderColor:'gray',marginRight:0,paddingRight:0,marginLeft:5, backgroundColor:'black'}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>RMB 1630</Text>
                                    </View>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#ffffff'}}>
                                        France
                                    </Text>
                                    <Text style={{color:'#ffffff'}}>
                                        Reims, Champagne
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#ffffff'}}>
                                        GRAPS
                                    </Text>
                                    <Text style={{color:'#ffffff'}}>
                                        Chardonnay, Pinot Noir
                                    </Text>
                                </View>
                                <View style={{ width:wp('5%'),marginLeft:2, height:hp('5%'),padding:7,borderWidth:1,borderColor:'red'}}>
                                    <ImageBackground source={require('../img/new-glass.png')} style={{ height: hp('2.8%'),width:wp('5%')}}>
                                    </ImageBackground>
                                </View>
                                <View style={{ width:wp('5%'),marginLeft:2, height:hp('5%'),padding:7}}>
                                    <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2.8%'),width:wp('5%')}}>
                                        <TouchableOpacity style={{ height: hp('5%')}} onPress={this.plus_onPressButton.bind(this)}>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    {show()}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:'#f1592a',marginBottom:10}}>
                            DESCRIPTION
                        </Text>
                        <Text style={{color:'#ffffff'}}>
                            Simple HTML5-compliant drag'n'drop zone for files built with React.js. ... Warning: On most recent browsers versions, the files given by onDrop won't have ... was aborted'); reader.onerror = () => console.log
                        </Text>
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
    icon: {
        borderWidth:2,
        borderColor:'red',
        width:wp('15%'),
    },
    row: {
        marginBottom: 50,
        marginRight:5,
        marginLeft:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    border: {
        width: wp('37%'),
        borderWidth:2,
    },
    border_one: {
        marginRight:0,
        width: wp('40%'),
        height: hp('40%'),
        borderColor:'#f1592a',
        borderWidth:2,
        color:'#f1592a',

    },
    border_two:{
        width: wp('60%'),
        color:'#f1592a',
        marginLeft:5,
        marginRight:20,
        paddingRight:20,
    },
    countText: {
        color: '#ffffff'
    }

});
