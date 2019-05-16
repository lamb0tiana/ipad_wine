/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import DataManager  from './DataManager';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

let dm = DataManager.getInstance();

global.CountryIds = [];
global.Countries =[];

dm.organizeData();
dm.setGlobals();


export default class MenuHeader extends React.Component {
    constructor(args) {
        super(args);
    
    }

    render() {
        return (
    <View style={styles.container}>
    <View style={{marginTop:8,flexDirection: 'row',justifyContent: 'space-between'}}>
        <View style={{marginLeft:8,color:'#ee4723'}}>
            <View style={{paddingBottom: 8}}>
                <View style={{borderColor:'#bd1e2c',borderLeftWidth: 10}}>
                    <Text style={{fontSize: 38, fontFamily:"American Typewriter", color:'#bd1e2c',marginLeft:10}}>
                        RED
                    </Text>
                </View>
            </View>

        { dm.countryNamesIn('RED').map((country, i) => {
            return       <TouchableOpacity key={i}>
                   <Text style={styles.listPaysPremier}>
                           {country}
                   </Text>
               </TouchableOpacity>
        })}

        </View>

        <View style={{marginBottom:10, marginLeft:8,color:'#ee4723'}}>
            <View style={{paddingBottom: 8}}>
                <View style={{borderColor:'#fff9c6',borderLeftWidth: 10}}>
                    <Text style={{color:'#fff9c6', fontSize: 38, fontFamily:"American Typewriter" ,marginLeft:10}}>
                        WHITE
                    </Text>
                </View>
            </View>

            { dm.countryNamesIn('WHITE').map((country, i) => {
            return       <TouchableOpacity key={i} >
                   <Text style={styles.listPaysPremier}>
                           {country}
                   </Text>
               </TouchableOpacity>
                 })}                       
                 
         </View>
        <View style={{marginBottom:8,marginLeft:10,marginRight: 10}}>
            <View>
                <View style={{paddingBottom: 8}}>
                    <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                        <Text style={{color:'#fff',marginLeft:10, fontSize: 38, fontFamily:"American Typewriter"}}>
                            CHAMPAGNE
                        </Text>
                    </View>
                </View>

                { dm.countryNamesIn('CHAMPAGNE').map((country, i) => {
                        return       <TouchableOpacity key={i} >
                            <Text style={styles.listPaysPremier}>
                                    {country}
                            </Text>
                        </TouchableOpacity>
                 })} 


            </View>
            <View style={{marginBottom:8}}>
                <View style={{paddingBottom: 8}}>
                    <View style={{borderColor:'#f2778b',borderLeftWidth: 10}}>
                        <Text style={{color:'#C4698F',fontSize: 38, fontFamily:"American Typewriter",marginLeft:10}}>
                            ROSE
                        </Text>
                    </View>
                </View>

                { dm.countryNamesIn('ROSE').map((country, i) => {
                        return       <TouchableOpacity key={i} >
                            <Text style={styles.listPaysPremier}>
                                    {country}
                            </Text>
                        </TouchableOpacity>
                 })} 




            </View>
            <View style={{marginBottom:8}}>
                <View style={{paddingBottom: 8}}>
                    <View style={{borderColor:'#f68a58',borderLeftWidth: 10}}>
                        <Text style={{color:'#f68a58',fontSize: 38, fontFamily:"American Typewriter",marginLeft:10}}>
                            SWEET
                        </Text>
                    </View>
                </View>
                { dm.countryNamesIn('SWEET').map((country, i) => {
                        return       <TouchableOpacity key={i} >
                            <Text style={styles.listPaysPremier}>
                                    {country}
                            </Text>
                        </TouchableOpacity>
                 })} 

            </View>
            <View style={{color:'#00ADEF',borderTopWidth: 4,borderColor:'#00ADEF',marginTop:30}}>
                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:13,marginTop:16}}>
                    <Text style={{color:'#00ADEF',marginLeft:10, fontSize: 30, fontFamily:"American Typewriter"}} onPress={() => this.props.navigation.navigate('Sommelier')}>
                        BY GLASS
                    </Text>
                </View>
                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:10,marginTop:6}}>
                    <Text style={{color:'#00ADEF',marginLeft:10, fontSize: 30, fontFamily:"American Typewriter"}}>
                        B1G1
                    </Text>
                </View>
                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:10, marginTop:6}}>
                    <Text style={{color:'#00ADEF',marginLeft:10, fontSize: 30, fontFamily:"American Typewriter"}}>
                        BEST OF
                    </Text>
                </View>
                </View>
            </View>
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
    },
    listPaysPremier:{
        color:'#ee4723',
        backgroundColor:'#1c1c1c',
        opacity:1,
        width:wp('26%'),
        marginBottom:15,
        marginTop:0,
        paddingLeft:20,
        padding:6,
        fontSize:28,
    }
});