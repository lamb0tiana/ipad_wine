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

    var SQLite = require('react-native-sqlite-storage')
    var db = SQLite.openDatabase({name:'test.db', createFromLocation:'~/db/db_wine.db'})
export default class Glass extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            count:0,
            label:""
         };

         db.transaction((tx)=>{
             tx.executeSql('SELECT label FROM wine', [], (tx, results)=> {
                 console.log("Query completed");

                 //Get rows with web SQL Database spec compliance.

                 var len = results.rows.length;
                 if(len > 0){
                    for(let i = 0; i < len; i++){
                        let row = results.rows.item(i);
                        console.log('Record: ${row.label}');
                        this.setState({label: row.label});
                    }
                 }
                 
             })
         })
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
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('5.5%'),width:wp('10.5%')}}>
                        <TouchableOpacity style={{ height: hp('10%')}} onPress={() => navigation.navigate('Home')}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:2,marginTop:10,marginRight:10,marginBottom:10,padding:5}} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground source={require('../img/home.png')} style={{ height: hp('5.5%'),width:wp('10.5%')}}>
                        <TouchableOpacity style={{ height: hp('10%')}} onPress={() => navigation.navigate('Home')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>,
        headerRight:
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <View style={{backgroundColor:'#CECECE',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight:3,backgroundColor:'#009343',padding:3,fontFamily:"american-typewriter"}}>Filter</Text>
                    <View
                        style={{width:wp('10%'),backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{color:'#fff',textAlign: 'center',padding:3}}>31</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#CECECE',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{color:'#fff',marginRight: 3,backgroundColor:'#009343',padding:3, fontFamily:"american-typewriter"}}>My Selection</Text>
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
                return <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2.8%'),width:wp('5.5%')}}>
                            <TouchableOpacity style={{ height: hp('5.5%')}} onPress={this.onPressMoin}>
                            </TouchableOpacity>
                        </ImageBackground>;
            }
        }

        const onPressMoinPlus = () => {
            if (this.state.count !== 0) {
                return <TouchableOpacity style={{ height: hp('5.5%')}} onPress={this.onPressPlus}>
                    <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2.8%'),width:wp('5.5%')}}>
                    </ImageBackground>
                </TouchableOpacity>
            }
            else return <TouchableOpacity style={{ height: hp('5.5%'), paddingRight: wp('5%')}} onPress={this.onPressPlus}>
                <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2.8%'),width:wp('5.5%')}}>
                </ImageBackground>
            </TouchableOpacity>;
        }
        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%')}}>
                <View style={styles.container}>
                    <View style={{marginTop:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{marginLeft:10,color:'#ee4723'}}>
                            <View style={{borderColor:'#bd1e2c',borderLeftWidth: 10}}>
                                <Text style={{fontSize: 17, fontFamily:"american-typewriter", color:'#bd1e2c',marginLeft:3}}>
                                    RED {'mety io e'+this.state.label}
                                </Text>
                            </View>
                            <Text style={styles.listPaysPremier}>
                                    Argentina
                            </Text>
                            <Text style={styles.listPays}>
                                    Australia
                            </Text>
                            <Text style={styles.listPays}>
                                    China
                            </Text>
                            <Text style={styles.listPays}>
                                    Chile
                            </Text>
                            <Text style={styles.listPays}>
                                    France
                            </Text>
                            <Text style={styles.listPays}>
                                    Israel
                            </Text>
                            <Text style={styles.listPays}>
                                    Italy
                            </Text>
                            <Text style={styles.listPays}>
                                    New Zealand
                            </Text>
                            <Text style={styles.listPays}>
                                    South Africa
                            </Text>
                            <Text style={styles.listPays}>
                                    Spain
                            </Text>
                            <Text style={styles.listPays}>
                                    USA
                            </Text>
                        </View>
                        <View style={{marginLeft:10,color:'#ee4723'}}>
                            <View style={{borderColor:'#fff9c6',borderLeftWidth: 10}}>
                                <Text style={{color:'#fff9c6', fontSize: 17, fontFamily:"american-typewriter" ,marginLeft:3}}>
                                    WHITE
                                </Text>
                            </View>
                                <Text style={styles.listPaysPremier}>
                                    Australia
                            </Text>
                            <Text style={styles.listPays}>
                                    Argentina
                            </Text>
                            <Text style={styles.listPays}>
                                    China
                            </Text>
                            <Text style={styles.listPays}>
                                    Austria
                            </Text>
                            <Text style={styles.listPays}>
                                    Canada
                            </Text>
                            <Text style={styles.listPays}>
                                    Chile
                            </Text>
                            <Text style={styles.listPays}>
                                    China
                            </Text>
                            <Text style={styles.listPays}>
                                    France
                            </Text>
                            <Text style={styles.listPays}>
                                    Germany
                            </Text>
                            <Text style={styles.listPays}>
                                    Italy
                            </Text>
                            <Text style={styles.listPays}>
                                    Japan
                            </Text>
                            <Text style={styles.listPays}>
                                    New Zealand
                            </Text>
                            <Text style={styles.listPays}>
                                    Spain
                            </Text>
                            <Text style={styles.listPays}>
                                    USA
                            </Text>
                        </View>
                        <View style={{marginBottom:10,marginLeft:10,marginRight: 10}}>
                            <View>
                                <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                    <Text style={{color:'#fff',marginLeft:3, fontSize: 17, fontFamily:"american-typewriter"}}>
                                        CHAMPAGNE
                                    </Text>
                                </View>
                                <Text style={styles.listPaysPremier}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#f2778b',borderLeftWidth: 10}}>
                                    <Text style={{color:'#C4698F',fontSize: 17, fontFamily:"american-typewriter",marginLeft:3}}>
                                        ROSE
                                    </Text>
                                </View>
                                <Text style={styles.listPaysPremier}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#f68a58',borderLeftWidth: 10}}>
                                    <Text style={{color:'#f68a58',fontSize: 17, fontFamily:"american-typewriter",marginLeft:3}}>
                                        SWEET
                                    </Text>
                                </View>
                                <Text style={styles.listPaysPremier}>
                                    Australia
                                </Text>
                                <Text style={styles.listPays}>
                                    France
                                </Text>
                                <Text style={styles.listPays}>
                                Hungray
                                </Text>
                                <Text style={styles.listPays}>
                                Italy
                                </Text>
                            </View>
                            <View style={{color:'#00ADEF',borderTopWidth: 4,borderColor:'#00ADEF',fontSize: 17}}>
                                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:3,marginTop:4}}>
                                    <Text style={{color:'#00ADEF',marginLeft:3, fontSize: 17, fontFamily:"american-typewriter"}}>
                                        BY GLASS
                                    </Text>
                                </View>
                                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:3}}>
                                    <Text style={{color:'#00ADEF',marginLeft:3, fontSize: 17, fontFamily:"american-typewriter"}}>
                                        B1G1
                                    </Text>
                                </View>
                                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:3}}>
                                    <Text style={{color:'#00ADEF',marginLeft:3, fontSize: 17, fontFamily:"american-typewriter"}}>
                                        BEST OF
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 20,marginLeft: 10,marginBottom:20,marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 30,fontFamily:"american-typewriter"}}>
                            CHAMPAGNE
                        </Text>
                        <Text style={{color:'#FF0000',fontSize: 14,fontFamily:"american-typewriter"}}>
                            Mr & Mrs Bund celebrate the weekend with their incredible Moet & Chandon Special!
                        </Text>
                        <Text style={{color:'#008000',fontSize: 11,fontFamily:"american-typewriter"}}>
                            Every Thursday,Friday and Sarturday, from 11 Pm,
                        </Text>
                        <Text style={{color:'#008000',fontSize: 11,fontFamily:"american-typewriter"}}>
                            Buy one bottle or Moet & Chandon Brut Imperial and enjoy an additional bottle offered by Mr $ Mrs Bund!
                        </Text>
                        <Text style={{color:'#fff',fontSize: 10,fontFamily:"american-typewriter"}}>
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
                                }}>
                                <Text style={{color:'#808080',fontSize: 20,fontFamily:"american-typewriter"}}>
                                    France
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('GlassDetail', {
                                    JSON_ListView_Clicked_Item: this.state.count,
                                })}>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom:10}}>
                                        <View
                                            style={{
                                                backgroundColor:'#0D0D0D',
                                                opacity:0.8,
                                                marginRight:1,
                                                width:wp('80%'),
                                                height:wp('15%'),
                                                paddingTop: 9
                                            }}>
                                            <Text style={{color:'#f1592a',paddingLeft: 10,fontSize: 11, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                ARMANDE DE BRIGNAC Bruit Gold
                                            </Text>
                                            <Text style={{color:'#ffffff',paddingLeft: 10,fontSize: 11, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                Champagne,Raims NV
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.8,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),paddingRight:wp('4%'), height:hp('5.5%'),padding:7, marginTop: wp('-1.5%')}}>
                                            {onPressMoinButton()}
                                            <Text value={this.state.count}
                                                  onChangeText={count => this.setState({ count })}
                                                  style={[styles.countText]}>
                                                { this.state.count !== 0 ? this.state.count: null}
                                            </Text>
                                            {onPressMoinPlus()}
                                        </View>
                                    <Text style={{color:'#FFFFFF',paddingLeft: wp('4%'), marginTop: wp('-1.5%'), fontSize: 11}}>
                                        500$
                                    </Text>
                                </View>
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
                                                height:wp('15%'),
                                                paddingTop: 9
                                            }}>
                                            <Text style={{color:'#f1592a',paddingLeft: 10,fontSize: 11, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                ARMANDE DE BRIGNAC Bruit Gold 2
                                            </Text>
                                            <Text style={{color:'#ffffff',paddingLeft: 10,fontSize: 11, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                Champagne,Raims NV 2
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{backgroundColor:'#0D0D0D',opacity:0.8,width:wp('20%'),marginLeft:1,marginRight: 10}}>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),paddingRight:wp('4%'), height:hp('5.5%'),padding:7, marginTop: wp('-1.5%')}}>
                                            {onPressMoinButton()}
                                            <Text value={this.state.count}
                                                  onChangeText={count => this.setState({ count })}
                                                  style={[styles.countText]}>
                                                { this.state.count !== 0 ? this.state.count: null}
                                            </Text>
                                            {onPressMoinPlus()}
                                        </View>
                                    <Text style={{color:'#FFFFFF',paddingLeft: wp('4%'), marginTop: wp('-1.5%'), fontSize: 11}}>
                                        500$
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
    },
    listPays:{
        color:'#ee4723',
        backgroundColor:'#1c1c1c',
        opacity:1,
        width:wp('25%'),
        marginBottom:10,
        paddingLeft:5
    },
    listPaysPremier:{
        color:'#ee4723',
        backgroundColor:'#1c1c1c',
        opacity:1,
        width:wp('25%'),
        marginBottom:10,
        marginTop:10,
        paddingLeft:5
    }
});
