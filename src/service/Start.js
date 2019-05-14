import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground
} from 'react-native';
import DataManager  from './DataManager';
let dm = DataManager.getInstance();
import RNFetchBlob from 'rn-fetch-blob';

import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";



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
        global.Referer = '';

         dm.organizeData();
         dm.setGlobals();
         dm.filterDataViewByGlass();
         dm.filterDataViewHalfOff();
         dm.filterDataViewBestOf();
      
    }
    static navigationOptions =
    {
        header:null
    }
  
  



    render() {
        return (
                <View style={styles.container}>
                    <ImageBackground source={require('../img/Entete.png')} style={{ width: wp('34.77%'),height: 0.60* wp('34.77%')}}></ImageBackground>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Accueil', { transition: 'collapseExpand' })} onLongPress= {() => this.props.navigation.navigate('Update') }>
                         <ImageBackground source={require('../img/start.png')} style={{ width: wp('20%'),height: 0.62* wp('40%'), marginTop: wp('5%')}}></ImageBackground>
                    </TouchableOpacity>
                </View>

        );
    }

    componentWillUnmount(){

      dm = null;
      _ = null;
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
