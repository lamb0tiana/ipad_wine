import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

export default class FullwinelistDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
            count: this.props.navigation.state.params.JSON_ListView_Clicked_Item
        };
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
                <View style={{marginLeft:3,paddingLeft:3,marginTop: 12,marginBottom: 10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('5.5%'),width:wp('10%')}}>
                        <TouchableOpacity style={{ height: hp('10%')}} onPress={() => navigation.navigate('Fullwinelist')}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>,
        headerRight:
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{backgroundColor:'#CECECE',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight: 5,backgroundColor:'#54b84a',padding:3}}>My Selection</Text>
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
        const onPressMoinButton = () => {
            if (this.state.count !== 0) {
                return <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('3%'),width:wp('5.2%')}}>
                            <TouchableOpacity style={{ height: hp('5%')}} onPress={this.onPressMoin}>
                            </TouchableOpacity>
                        </ImageBackground>;
            }
        }

        const onPressMoinPlus = () => {
            if (this.state.count !== 0) {
                return <TouchableOpacity style={{ height: hp('5%')}} onPress={this.onPressPlus}>
                    <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('3%'),width:wp('5.2%')}}>
                    </ImageBackground>
                </TouchableOpacity>
            }
            else return <TouchableOpacity style={{ height: hp('5%'), paddingRight: wp('5%')}} onPress={this.onPressPlus}>
                <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('3%'),width:wp('5.2%')}}>
                </ImageBackground>
            </TouchableOpacity>;
        }

        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%')}}>
                <View style={styles.container}>
                    <View style={{
                            marginTop:20,
                            marginBottom: 20,
                            marginLeft:5,
                            marginRight:10,
                            flex: 1,
                            borderBottomWidth:2
                        }}
                    >
                        <Text style={{color:'#ffffff',fontSize: 20, fontFamily:"american-typewriter"}}>
                            LAURENT-PIERRET Brut
                        </Text>
                        <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('100%'),resizeMode: 'contain',}}>
                        </ImageBackground>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.border_one}>
                            <ImageBackground source={require('../img/icon1.png')} style={{ height: hp('20%'),marginTop: 20,paddingTop: 20}}>
                            </ImageBackground>
                        </View>
                        <View style={styles.border_two}>
                            
                                <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <View style={{ borderWidth: 2, borderColor:'#808080',marginRight:0, backgroundColor:'#ed4622',paddingRight:0}}>
                                        <Text style={{ color:'#ffffff',padding: 4}}>N V</Text>
                                    </View>
                                    <View style={{ borderWidth: 2, borderColor:'#808080',marginRight:0,paddingRight:0,marginLeft:1, backgroundColor:'black', }}>
                                        <Text style={{ fontSize: 12, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", color:'#ffffff',padding:4, paddingTop: 7}}>CHAMPAGNE</Text>
                                    </View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),paddingRight:wp('4%'), height:hp('5%'),padding:7}}>
                                            {onPressMoinButton()}
                                            <Text value={this.state.count}
                                                  onChangeText={count => this.setState({ count })}
                                                  style={[styles.countText]}>
                                                {this.state.count !== 0 ? this.state.count: null}
                                            </Text>
                                            {onPressMoinPlus()}
                                    </View>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#ffffff', fontSize: 12, fontFamily: "american-typewriter"}}>
                                        France
                                    </Text>
                                    <Text style={styles.descVine}>
                                        Reims, Champagne
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#ffffff', fontSize: 12, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                        GRAPES
                                    </Text>
                                    <Text style={styles.descVine}>
                                        Chardonnay, Pinot Noir
                                    </Text>
                                </View>
                                <View style={{marginTop:12,flexDirection: 'row',justifyContent: 'space-between' }}>
                                    <View style={{ borderWidth: 2, borderColor:'#808080',marginRight:0, backgroundColor:'#ed4622',paddingRight:0}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>N/A</Text>
                                    </View>
                                    <View style={{ borderWidth: 2, borderColor:'#808080',marginRight:0,marginLeft:2, backgroundColor:'#ed4622',paddingRight:0}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>0.75L</Text>
                                    </View>
                                    <View style={{ borderWidth: 2, borderColor:'#808080',marginRight:0,paddingRight:0,marginLeft:5, backgroundColor:'#4d4e4e'}}>
                                        <Text style={{ color:'#ffffff',padding: 5}}>RMB 1630</Text>
                                    </View>
                                </View>
                        </View>
                    </View>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:'#f1592a', fontFamily: "american-typewriter", fontSize:20}}>
                            DESCRIPTION
                        </Text>
                        <Text style={{alignSelf: 'flex-end', color:'#ffffff', fontFamily: "Nimbus-Sans-D-OT-Bold_32747",fontSize: 10, justifyContent:'space-between', lineHeight:15, textAlign:'auto'}}>
                        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
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
        width:wp('100%')
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
        marginBottom: 20,
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
    },
    descVine: {
        color:'#bbbebf', 
        fontSize: 10, 
        fontFamily:"AvrileSans-Regular"
    }
});
