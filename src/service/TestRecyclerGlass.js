/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity,ImageBackground } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import MenuHeader from './MenuHeader';
import Row from './Row';
import TypeTitle from './TypeTitle';
import ChampagneHeader from './ChampagneHeader';
import CountryTitle from './CountryTitle';
import End from './End';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import DataManager  from './DataManager';
import ModalSearch from "./ModalSearch";
import { NavigationEvents } from 'react-navigation';
let _ = require('lodash');


let dm = DataManager.getInstance();


/***
 * To test out just copy this component and render in you root component
 */
export default class TestRecyclerGlass extends React.Component {
    constructor(args) {
        super(args);

        this.scrollViewRef = null;

        //custom parmeter for each view
        global.Referer ='Byglasslist';   
        this.view = 'glass';

        this.renderNumber = 10;
        this.state = {showModal:false};
        this.req = {type:[],country_id:[],region_id:[], grapes:[], price:[], name:''};
        this.firstFocus = true;
        this.props.navigation.setParams({
            filterCount: dm._total[this.view],
            });
        this.computeSelectionCount();
        this.onSearch = this.onSearch.bind(this);
        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        this._layoutProvider = new LayoutProvider(
            index => {
                return this.state.dataProvider.getDataForIndex(index).type;
            },
            (type, dim) => {
                switch (type) {
                    case 'ChampagneHeader':
                        dim.width = 1024;
                        dim.height = 70;
                        break;
                    case 'CountryTitle':
                        dim.width = 1024;
                        dim.height = 85;
                        break;
                    case 'Row':
                        dim.width = 1024;
                        dim.height = 100.334;
                        break;
                    case 'TypeTitle':
                        dim.width = 1024;
                        dim.height = 101.33;
                        break;
                    case 'End':
                        dim.width = 1024;
                        dim.height = 150.33;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        this.state = {
            dataProvider: dataProvider.cloneWithRows(dm._data[this.view])
        };

        
    }


    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    onSearch(req){
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        this.req = req;
        let result = dm._search(this.view, req);
        this.setState({dataProvider: dataProvider.cloneWithRows(result[0])});
        this.props.navigation.setParams({
            filterCount: result[1],
            });

        this.toggleModal();
    }


    computeSelectionCount(){
        var sel = global.Selected.reduce(function(a,r){
            return a+ r.count;
            }, 0);

        this.props.navigation.setParams({
            ct: sel
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            modalCom: this.toggleModal.bind(this),
        });
        this.renderNumber = 90000;
    }

    componentWillUnmount(){
        dm._plusMoinsList = null;
        dm._plusMoinsList = []; 
      }


    setScrollViewRef = (element) => {
        this.scrollViewRef = element;
    };
    //Given type and data return the view component
    _rowRenderer(type, data) {
        //You can return any view here, CellContainer has no special significance
        switch (type) {
            case 'MenuHeader':
                return (
                    null
                );
            case 'ChampagneHeader':
                return (
                    <ChampagneHeader type={this.view}>  </ChampagneHeader>   
                );
            case 'CountryTitle':
                return (
                    <CountryTitle country = {data.data}></CountryTitle>   
                );
            case 'Row':
                return (
                    <Row  item = {data.data} navigation={this.props.navigation} 
                    updateCount = {this.computeSelectionCount.bind(this)}
                    view = {this.view}
                    ></Row>   
                );
            case 'TypeTitle' || 'ChampagneHeader':
                return (
                    <TypeTitle type={data.data}></TypeTitle>   
                );
            case 'End':
                return (
                    <End></End>   
                );
            default:
                return null;
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerLeft:
          <View style={{flexDirection: 'row'}}>
            <ImageBackground source={require('../img/fond.png')} style={{ position:"absolute", height: 0.15* wp('94%') ,width:wp('94%'), left: wp("3%"), top:-40}}>
            </ImageBackground>          
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems:"center", marginLeft: 35, top:-10}}>
                <View style={{marginLeft:30,marginRight:10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('6%')}} onPress={() => navigation.navigate('Accueil')}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:15,marginRight:10}} onPress={() => navigation.navigate('Accueil')}>
                    <ImageBackground source={require('../img/home.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('6%')}} onPress={() => navigation.navigate('Accueil')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between', top:-10}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:35,padding:4,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => navigation.state.params.modalCom() }>
                    <View style={{width:wp('20%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:8, width:wp('12.5%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"American Typewriter", fontSize: 22}}>Filter</Text>
                        <View
                        style={{width:wp('7%'),paddingTop:8, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 20}}>{navigation.getParam('filterCount')}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#c3c3c4',marginRight:60,padding:4,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Selectlist')}>
                    <View style={{width:wp('25.5%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:8, width:wp('19%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"American Typewriter", fontSize: 22}}>My Selection</Text>
                        <View
                        style={{width:wp('6%'),paddingTop:8, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 20}}>{navigation.getParam('ct')}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
            </View>
        </View>
            ,
        headerStyle: {
            backgroundColor: 'black',
            height:wp('15%'),
            borderBottomColor:'transparent',borderBottomWidth: 0, shadowColor: 'transparent'
        },
    });

    onFocus = (ld) => {
        if(!this.firstFocus){
            dm._updatePlusMoins();
            this.computeSelectionCount();
        }
        this.firstFocus = false;
    }


    render() {
        return (
           
     
            <View style={{height: hp('100%'), width: wp('100%'), backgroundColor:'black'}}>
                <NavigationEvents  onDidFocus={this.onFocus} />
            { this.state.showModal ?
                    <ModalSearch show= {this.state.showModal} toggle = {this.toggleModal.bind(this)}
                    search= {this.onSearch} req={this.req} type ={this.view}>
                    
                    </ModalSearch>
            : null}
                    <RecyclerListView  layoutProvider={this._layoutProvider} 
                    dataProvider={this.state.dataProvider} 
                    rowRenderer={this._rowRenderer} 
                    renderAheadOffset= {750}
                    decelerationRate={'fast'}
                    ref={this.setScrollViewRef}/>
            </View>
        )
       
    }
}
const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
};