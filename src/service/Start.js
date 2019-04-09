import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';

import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

    let SQLite = require('react-native-sqlite-storage')
    let db = SQLite.openDatabase({name:'mmb_ipad.db', createFromLocation:'~/database/mmb_ipad.db'})
    let _ = require('lodash')

export default class Start extends Component {

    constructor(props) {
        super(props);
        global.Selected = [];

        global.CountryIds = [];
        global.Countries =[];
        global.RegionIds = [];
        global.Regions = [];
        global.Grapes = [];
        global.All = [];


        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ipad_countries where id in (select country_id from ipad_wines where available =1)', [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                  var name = results.rows.item(i).name.replace(/ /g, "");
                global.CountryIds[name] = results.rows.item(i).id;
                global.Countries.push(results.rows.item(i));
              }
                // console.log(global.CountryIds);
            });
          });

        
          
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ipad_regions where id in (select region_id from ipad_wines where available =1)', [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                var name = results.rows.item(i).name.replace(/ /g, "");                 
                global.RegionIds[name] = results.rows.item(i).id;
                global.Regions.push(results.rows.item(i));
              }

            });
        });
        
        db.transaction(tx => {
            tx.executeSql('SELECT DISTINCT grapes FROM ipad_wines where available =1', [], (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                if(results.rows.item(i).grapes.length > 0)                
                     global.Grapes.push(results.rows.item(i).grapes);
              }
            });
        });




    }
    static navigationOptions =
    {
        header:null
    }
  
    render() {
        return (
                <View style={styles.container}>
                    <ImageBackground source={require('../img/Entete.png')} style={{ width: wp('34.77%'),height: 0.60* wp('34.77%')}}></ImageBackground>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')} onLongPress= {() => this.props.navigation.navigate('Update') }>
                         <ImageBackground source={require('../img/start.png')} style={{ width: wp('38.41%'),height: 0.62* wp('38.41%'), marginTop: wp('5%')}}></ImageBackground>
                    </TouchableOpacity>
                </View>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('100%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: wp('2.02%'),
        borderColor: '#999999'
    }

});
