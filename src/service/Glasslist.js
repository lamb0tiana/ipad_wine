import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
    Modal,
    TouchableHighlight,
    TextInput,
    FlatList,
    Linking,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PlusMoins from './PlusMoins';

    
let _ = require('lodash')
let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name:'mmb_ipad.db', createFromLocation:'~/database/mmb_ipad.db'})
export default class Glasslist extends Component {
    constructor(props) {
        super(props)
        let checkboxState = {  
            RED: false,
            WHITE: false,
            SWEET: false,
            ROSE: false,
            CHAMPAGNE: false,

            France: false,
            Chile: false,
            China: false,
            Argentina: false,
            Austria: false,
            Australia: false,
            NewZealand: false,
            Italy: false,
            Spain: false,
            USA: false,
            SouthAfrica: false,
            Switzerland: false,
            Germany: false,
            Israel: false,
            Canada: false,
            Serbia: false,
	        Switzerland: false,
            Hungray: false,

            priceRangeA: false,
            priceRangeB: false,
            priceRangeC: false,
            priceRangeD: false
        };

        global.Regions.forEach( e =>{
            checkboxState[e.name.replace(/ /g, "")] = false;
        });

        global.Grapes.forEach( e =>{
            checkboxState[e] = false;
        });

        this.state = {
            //Filter
            //country
            checkbox: checkboxState, 

            req : {type:[],country_id:[],region_id:[], grapes:[], price:[], name:''},

            count:0,
            modalVisible: false,

            statusA:false,
            statusB:false,
            statusC:true,
            keyWordSearch: '',

            btnSelected: 0,

            filterGrapeCount: 0,
            filterRegionCount:0,
            filterResultCount: 0,
            recordCount: 0,
            refreshing: false,
            FlatListAllWine: [],
            //Champagn
            FlatListChampagneFrance: [],
            //Red
            FlatListRedArgentina: [],
            FlatListRedAustralia: [],
            FlatListRedChina: [],
            FlatListRedChile: [],
            FlatListRedFrance: [],
            FlatListRedIsrael: [],
            FlatListRedItaly: [],
            FlatListRedNewZealand: [],
            FlatListRedSouthAfrica: [],
            FlatListRedSpain: [],
            FlatListRedUSA: [],
            //WHITE 
            FlatListWhiteAustralia: [],
            FlatListWhiteArgentina: [],
            FlatListWhiteAustria: [],
            FlatListWhiteCanada: [],
            FlatListWhiteChile: [],
            FlatListWhiteChina: [],
            FlatListWhiteFrance: [],
            FlatListWhiteGermany: [],
            FlatListWhiteItaly: [],
            FlatListWhiteJapan: [],
            FlatListWhiteNewZealand: [],
            FlatListWhiteSpain: [],
            FlatListWhiteUSA: [],
            //ROSE
            FlatListRoseFrance: [],
            //SWEET
            FlatListSweetAustralia: [],
            FlatListSweetFrance: [],
            FlatListSweetHungray: [],
            FlatListSweetItaly: [],

            //Data value
            name:'',
            region:'',
            price:0,
            icon:'',
            mySelectionCount: 0
        }; 

        this.computeSelectionCount = this.computeSelectionCount.bind(this);
        this.refresh = this.refresh.bind(this);
        
        //all wine byglass available
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ipad_wines WHERE available= ? AND byglass = ?', [1,1], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              this.setState({
                //All
                FlatListAllWine: temp,
                //Champange
                FlatListChampagneFrance: _.filter(temp, o => o.country_id === global.CountryIds['France'] && o.type === 'CHAMPAGNE'),
                //Red
                FlatListRedArgentina: _.filter(temp, o => o.country_id === global.CountryIds['Argentina'] && o.type === 'RED'),
                FlatListRedAustralia: _.filter(temp, o => o.country_id === global.CountryIds['Australia'] && o.type === 'RED'),
                FlatListRedChina: _.filter(temp, o => o.country_id === global.CountryIds['China'] && o.type === 'RED'),
                FlatListRedChile: _.filter(temp, o => o.country_id === global.CountryIds['Chile'] && o.type === 'RED'),
                FlatListRedFrance: _.filter(temp, o => o.country_id === global.CountryIds['France'] && o.type === 'RED'),
                FlatListRedIsrael: _.filter(temp, o => o.country_id === global.CountryIds['Israel'] && o.type === 'RED'),
                FlatListRedItaly: _.filter(temp, o => o.country_id === global.CountryIds['Italy'] && o.type === 'RED'),
                FlatListRedNewZealand: _.filter(temp, o => o.country_id === global.CountryIds['New Zealand'] && o.type === 'RED'),       
                FlatListRedSouthAfrica: _.filter(temp, o => o.country_id === global.CountryIds['South Africa'] && o.type === 'RED'),                       
                FlatListRedSpain: _.filter(temp, o => o.country_id === global.CountryIds['Spain'] && o.type === 'RED'),
                FlatListRedUSA: _.filter(temp, o => o.country_id === global.CountryIds['USA'] && o.type === 'RED'),
                //White 
                FlatListWhiteAustralia: _.filter(temp, o => o.country_id === global.CountryIds['Australia'] && o.type === 'WHITE'),
                FlatListWhiteArgentina: _.filter(temp, o => o.country_id === global.CountryIds['Argentina'] && o.type === 'WHITE'),
                FlatListWhiteAustria: _.filter(temp, o => o.country_id === global.CountryIds['Austria'] && o.type === 'WHITE'),
                FlatListWhiteCanada: _.filter(temp, o => o.country_id === global.CountryIds['Canada'] && o.type === 'WHITE'),
                FlatListWhiteChile: _.filter(temp, o => o.country_id === global.CountryIds['Chile'] && o.type === 'WHITE'),
                FlatListWhiteChina: _.filter(temp, o => o.country_id === global.CountryIds['China'] && o.type === 'WHITE'),  
                FlatListRedFrance: _.filter(temp, o => o.country_id === global.CountryIds['France'] && o.type === 'WHITE'),
                FlatListWhiteGermany: _.filter(temp, o => o.country_id === global.CountryIds['Germany'] && o.type === 'WHITE'),
                FlatListWhiteItaly: _.filter(temp, o => o.country_id === global.CountryIds['Italy'] && o.type === 'WHITE'),
                FlatListWhiteJapan: _.filter(temp, o => o.country_id === global.CountryIds['Japan'] && o.type === 'WHITE'),
                FlatListWhiteNewZealand: _.filter(temp, o => o.country_id === global.CountryIds['New Zealand'] && o.type === 'WHITE'),
                FlatListWhiteSpain: _.filter(temp, o => o.country_id === global.CountryIds['Spain'] && o.type === 'WHITE'),
                FlatListWhiteUSA: _.filter(temp, o => o.country_id === global.CountryIds['USA'] && o.type === 'WHITE'),
                //ROSE
                FlatListRoseFrance: _.filter(temp, o => o.country_id === global.CountryIds['France'] && o.type === 'ROSE'),
                //SWEET
                FlatListSweetAustralia: _.filter(temp, o => o.country_id === global.CountryIds['Australia'] && o.type === 'SWEET'),
                FlatListSweetFrance: _.filter(temp, o => o.country_id === global.CountryIds['France'] && o.type === 'SWEET'),
                FlatListSweetHungray: _.filter(temp, o => o.country_id === global.CountryIds['Hungray'] && o.type === 'SWEET'),
                FlatListSweetItaly: _.filter(temp, o => o.country_id === global.CountryIds['Italy'] && o.type === 'SWEET'),    
               
                recordCount: temp.length                
              }, () => {
                this.props.navigation.setParams({
                    filterCount: temp.length
                    })
              });
            });
          }); 
    }
    //change header navigationOptions
    //binding computeselectioncount
    refresh = () => {
        // console.log('refreshing');
        this.setState({count: this.state.count +1}, () => {
             console.log('refresh count = '+this.state.count+' this refresh '+this.state.refreshMe)
        });
    }
 
    computeSelectionCount(){
        var sel = global.Selected.reduce(function(a,r){
            return a+ r.count;
            }, 0);

        this.props.navigation.setParams({
            ct: sel
        });
    }

    computeResultCount(){
        this.props.navigation.setParams({
            filterCount: this.filter(this.state.FlatListAllWine, this.state.req).length
        });
    }

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />
        );
    };

    componentDidMount() {
        this.props.navigation.setParams({
            handleThis: this.refreshHandler,
            ct: this.state.mySelectionCount,
            refresh: this.refresh,
        });
    }
    
    refreshHandler = () => {
        this.setState({modalVisible: true})
    }


    filterByName(inputWord, data){
        var inputWord = inputWord.toLowerCase();
        var tab = inputWord.split(' ');
        var res =[];
    
        for(var i=0; i< tab.length; i++){
            for(var j=0; j< data.length; j++)
            {
                var w = tab[i];
                var dt = data[j].name.toLowerCase();
                var region_id = data[j].region_id;
                var regionName = _.filter(global.Regions, r => r.id === region_id)[0].name.toLocaleLowerCase();
                var grapes = data[j].grapes.toLowerCase();
                
                if((dt.indexOf(w)> -1 || (regionName && regionName.indexOf(w)> -1) 
                || (grapes.length>0 && grapes.indexOf(w)> -1))
                 && res.indexOf(dt)== -1){
                    res.push(data[j]);
                }
            }
        }
        // if(res.length>0) console.log(res);
        return res;
    }

    ShowHideComponentA = () =>{
        if(this.state.statusA == false)
        {
          this.setState({
            statusA: true,
            statusB: false,
            statusC: false,
            btnSelected: 1
          })
        }
        else
        {
          this.setState({
            statusA: false,
            statusC: true,
            btnSelected: 0
          })
        }
      }
    
      ShowHideComponentB = () =>{
        if(this.state.statusB == false)
        {
          this.setState({
            statusB: true,
            statusA: false,
            statusC: false,
            btnSelected: 2
          })
        }
        else
        {
          this.setState({
            statusB: false,
            statusC: true,
            btnSelected: 0
          })
        }
    }
  
    toggle(type, value){
        console.log('appel toggle');
        if(type == 'name'){
            this.state.req.name = value;
            console.log(this.state.req); 
            return;
        }
        var n = undefined;
        var isOnId = type =='country_id' || type == 'region_id';

        if(isOnId) { 
            if(type == 'country_id')         
                 n = global.CountryIds[value]; 
            if(type == 'region_id')
                 n = global.RegionIds[value];
        }

        if(n == undefined && isOnId) {
            alert(type+' not found in database id '+value);
            return;
        };

        if(!this.state.req[type]) {
            alert('no key '+type+ ' for request');
            return;
        }

        var index = isOnId ? this.state.req[type].indexOf(n) : this.state.req[type].indexOf(value) ;

        var clone = _.clone(this.state.checkbox);
        if(index == -1){
            isOnId ? this.state.req[type].push(n): this.state.req[type].push(value);
            if(type == 'region_id') this.state.filterRegionCount = this.state.filterRegionCount +1;
            if(type == 'grapes') this.state.filterGrapeCount = this.state.filterGrapeCount + 1;
        }else{
            this.state.req[type].splice(index, 1);   
            if(type == 'region_id') this.state.filterRegionCount = this.state.filterRegionCount - 1;
            if(type == 'grapes') this.state.filterGrapeCount = this.state.filterGrapeCount - 1;
        }

        clone[value] = !clone[value];
        this.setState({
            checkbox: clone
        });
        console.log(this.state.req);       
    }

    filterFieldEqual(field,arrayValues,data){
        var result = [];
        if(!_.isString(field) || !_.isArray(arrayValues) )
            throw "invalid param ";

        var temp = _.filter(data, o => arrayValues.indexOf(o[field]) > -1);
        if(temp && temp.length != 0){
            temp.forEach(element => {
                if(result.indexOf(element) == -1)
                    result.push(element); 
            });
            return result;
        }
        return [];
    }

    filterPriceBetween(types, data){
        var min = 0;
        var max = 0;
        if(!_.isArray(types)) throw 'not an array';
        var result = [];
        var temp = [];
    
        types.forEach( type =>{
    
                if(type == 'priceRangeA'){
                    min = 0; max= 500;
                }
                if(type == 'priceRangeB'){
                    min = 501; max= 1000;
                }
                if(type == 'priceRangeC'){
                    min = 1001; max= 4000;
                }
                if(type == 'priceRangeD'){
                    min = 4001; max= Infinity;
                }            
    
                temp = _.filter(data, o => o.price>min && o.price<max);
                temp.forEach( res =>{
                    if(result.indexOf(res) == -1)
                        result.push(res);
                } );
        });
        return result;
    }

    filter(data, filter){
        //cherch equality
        var search = data;
        var result = [];
        var keys = Object.getOwnPropertyNames(filter);
        for(var i=0; i<keys.length ; i++ ){
            var key = keys[i];
                if(filter[key].length > 0){
                    //   console.log("type ==== and result below" +key);
                    if(key == 'price'){
                        result = this.filterPriceBetween(key, filter[key], search);
                    }else if(key == 'name'){
                        result = this.filterByName(filter[key], search);
                    }else{
                        result = this.filterFieldEqual(key, filter[key], search);
                    }

                    if(result.length == 0){
                        return result;
                    }
                    search = result;
                    // console.log('result === ');
                    //   console.log(result); 
                }
        }
        return result;
    }

    filterPass(data){
        if(this.state.req.type.length == 0 &&  this.state.req.country_id.length == 0 
            && this.state.req.region_id.length == 0 && this.state.req.grapes.length == 0
                && this.state.req.price.length == 0 && this.state.req.name == '')
            return data;
        else 
            return this.filter(data, this.state.req);
        //return data;
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }



    _onPressButtonReset = () => {
        this.props.navigation.setParams({
            filterCount: this.state.recordCount
            });
        return this.setState({
            req : {type:[],country_id:[],region_id:[],grapes:[],price:[], name:''},
            filterGrapeCount: 0,
            filterRegionCount: 0,
            filterResultCount: 0
        });
    }
    
    onPressPlus = (id) => {
       var selected = this.getSelected(id);
        if(selected != undefined){
     //mise a jour selected plus
        selected.count = selected.count + 1;

        }else{
    //insertion nouveau selected
            var itemToInsert = {};
            itemToInsert.id = id;
            itemToInsert.type = "byglass";
            itemToInsert.count = 1;
            global.Selected.push(itemToInsert);
        }
        this.computeSelectionCount();
    }

    onPressMoin = (id) => {
        var selected = this.getSelected(id);
        if(!selected) alert('erreur apli 1');
        if(selected.count <= 0) return;
        //mise a jour count moins 
        selected.count = selected.count - 1;
        //enlever le selectionner
        if(selected.count == 0){
        var index = global.Selected.indexOf(selected);
        global.Selected.splice(index, 1);
        }
        this.computeSelectionCount();
    }

    onPressMoinPlus = (id) => {

        if (this.getSelected(id) != undefined) {
            return <TouchableOpacity onPress={this.onPressPlus.bind(this, id)} >
                <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2%'),width:wp('2.6%')}}>
                </ImageBackground>
            </TouchableOpacity>
        }
        else return <TouchableOpacity style={{ paddingLeft: wp('6%')}} onPress={this.onPressPlus.bind(this, id)}>
            <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('2%'),width:wp('2.6%')}}>
            </ImageBackground>
        </TouchableOpacity>;
    }

    onPressMoinPlus2 = (id) => {
        var sel = this.getSelected(id);
        if (sel && sel.count>0) {
            return <TouchableOpacity onPress={this.onPressMoin.bind(this, id)}>
                <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2%'),width:wp('2.6%'), marginLeft: 18}}>
                </ImageBackground>
            </TouchableOpacity>
        }
        
    }

    getSelected(id){
        return global.Selected.filter(el => (el.id == id && el.type == 'byglass'))[0];
    }
  static navigationOptions = ({navigation}) => ({
        headerLeft:
          <View style={{flexDirection: 'row'}}>
            <ImageBackground source={require('../img/fond.png')} style={{ position:"absolute", height: 0.15* wp('94%') ,width:wp('94%'), left: wp("3%"), top:-50}}>
            </ImageBackground>          
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems:"center", marginLeft: 35}}>
                <View style={{marginLeft:30,marginRight:10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('100%')}} onPress={() => navigation.navigate('Home')}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:15,marginRight:10}} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground source={require('../img/home.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('100%')}} onPress={() => navigation.navigate('Home')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:40,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => navigation.state.params.handleThis() }>
                    <View style={{width:wp('18%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:11, width:wp('12.5%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"american-typewriter", fontSize: 23}}>Filter</Text>
                        <View
                        style={{width:wp('5%'),paddingTop:10, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22}}>{navigation.getParam('filterCount')}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#c3c3c4',marginRight:70,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Selectlist', {onGoBack: () => navigation.state.params.refresh()})}>
                    <View style={{width:wp('23%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:11, width:wp('17.5%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"american-typewriter", fontSize: 23}}>My Selection</Text>
                        <View
                        style={{width:wp('5%'),paddingTop:10, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22}}>{navigation.getParam('ct')}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
            </View>
        </View>
            ,
        headerStyle: {
            backgroundColor: 'black',
            height:wp('11.5%'),
        },
    });

    render() {
        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%')}}>
               
               <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}
                        >
                        <TouchableOpacity 
                            onPress={() => {this.setModalVisible(!this.state.modalVisible)}} 
                            style={{height:120, width:wp('100%'), backgroundColor:'transparent'}}>
                        </TouchableOpacity>
                        <View style={styles.modalContainer}>
                            <ImageBackground source={require('../img/icon-point-top.png')} style={{position:'absolute', marginLeft:wp('57%'), height: hp('8%'), width:wp('8%'),resizeMode: 'contain',marginTop: -50, marginRight:20}}>
                                    </ImageBackground>
                            <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-11, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: 11, marginRight:20}}>
                                    </ImageBackground>
                            <Text style={{color: '#333333',fontFamily:"american-typewriter", marginLeft:20, paddingTop: 20, fontSize: 30}}>Wine Type</Text>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', paddingTop:16}}>
                                    <View style={styles.wineType0}>
                                        <CheckBox
                                            style={{Size: 47}}
                                            isChecked={this.state.checkbox.RED}
                                            onClick={this.toggle.bind(this,'type','RED')} 
                                            />
                                            <Text style={styles.wineTypeText}>RED</Text>
                                    </View>
                                    <View style={styles.wineType1}>
                                        <CheckBox
                                            isChecked={this.state.checkbox.WHITE}
                                            onClick={this.toggle.bind(this,'type','WHITE')} 
                                            />
                                            <Text style={styles.wineTypeText}>WHITE</Text>
                                    </View>
                                    <View style={styles.wineType2}>
                                        <CheckBox
                                            isChecked={this.state.checkbox.SWEET}
                                            onClick={this.toggle.bind(this,'type','SWEET')} 
                                            />
                                            <Text style={styles.wineTypeText}>SWEET</Text>
                                    </View>
                                    <View style={styles.wineType3}>
                                        <CheckBox
                                            isChecked={this.state.checkbox.ROSE}
                                            onClick={this.toggle.bind(this,'type','ROSE')} 
                                            />
                                            <Text style={styles.wineTypeText}>ROSE</Text>
                                    </View>
                                    <View style={styles.wineType4}>
                                        <CheckBox
                                            isChecked={this.state.checkbox.CHAMPAGNE}
                                            onClick={this.toggle.bind(this,'type','CHAMPAGNE')} 
                                            />
                                            <Text style={styles.wineTypeText}>CHAMPAGNE</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30}}>
                                    <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-31, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                                    </ImageBackground>
                                    <Text style={{color: '#333333',fontFamily:"american-typewriter", marginLeft:20,fontSize: 30}}>Country</Text>
                                    <ImageBackground source={require('../img/point-noir-long.png')} style={{ height: hp('1%'),width:wp('78%'),resizeMode: 'contain',marginTop: 14, marginLeft:15, marginRight:30}}>
                                    </ImageBackground>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: 'flex-start', flexWrap:'wrap'}}>
                                    {
                                        global.Countries.map(( country, key ) =>
                                        (
                                        <View style={styles['country0']}>
                                            <CheckBox
                                                isChecked={this.state.checkbox[country.name.replace(/ /g, "")]}
                                                onClick={this.toggle.bind(this,'country_id',country.name.replace(/ /g, ""))} 
                                                />
                                                <Text style={styles.countryText}>{country.name}</Text>
                                        </View>
                                        ))
                                    }
                                </View>
                           
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('3%')}}>
                                    <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-31, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                                    </ImageBackground>
                                    <Text style={{color: '#333333',fontFamily:"american-typewriter", marginLeft:20,fontSize: 30}}>Grapes & Region</Text>
                                    <ImageBackground source={require('../img/point-noir-long.png')} style={{ height: hp('1%'),width:wp('78%'),resizeMode: 'contain',marginTop: 14, marginLeft:15, marginRight:30}}>
                                    </ImageBackground>
                                </View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('1%')}}>
                                        <View style={styles.grapeRegion}>
                                            <View style={{backgroundColor:'#c3c3c4',marginRight: wp('15%'), marginTop:10,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <TouchableOpacity onPress={this.ShowHideComponentA} style={(this.state.btnSelected== 1)?styles.btnSelected:styles.notSelected}>
                                                    <Text style={{fontSize:20, color:'#c3c3c4',marginRight:3,paddingLeft:20, paddingRight:20, padding:8,fontFamily:"american-typewriter"}}>Grapes</Text>
                                                </TouchableOpacity>
                                                <View
                                                    style={{width:wp('4%'),backgroundColor:'#f1592a',color:'#fff'}}
                                                >
                                                    <Text style={{fontSize:20, color:'#fff',textAlign: 'center',padding:8}}>{this.state.filterGrapeCount}</Text>
                                                </View>
                                            </View>
                                            <View style={{backgroundColor:'#c3c3c4',marginLeft: 10,marginTop:10,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <TouchableOpacity onPress={this.ShowHideComponentB} style={(this.state.btnSelected== 2)?styles.btnSelected:styles.notSelected}>
                                                    <Text style={{fontSize:20, color:'#c3c3c4',marginRight:3,paddingLeft:20, paddingRight:20,padding:8,fontFamily:"american-typewriter"}}>Regions</Text>
                                                </TouchableOpacity>
                                                <View
                                                    style={{width:wp('4%'),backgroundColor:'#f1592a',color:'#fff'}}
                                                >
                                                    <Text style={{fontSize:20, color:'#c3c3c4',textAlign: 'center',padding:8}}>
                                                    {this.state.filterRegionCount}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>          

        {
        this.state.statusA ? <ScrollView style={{backgroundColor:'#444444', width:wp('94%'), marginTop:wp('2%')}}>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', flexWrap:'wrap'}}>
                                {                              
                                    global.Grapes.map(( grape, key ) =>
                                    (
                                    <View style={styles.grape}>
                                        <CheckBox
                                            isChecked={this.state.checkbox[grape]}
                                            onClick={this.toggle.bind(this,'grapes',grape)} 
                                            />
                                            <Text style={styles.GrapeText}>{grape}</Text>
                                    </View>
                                    ))
                                }
                                </View>
                            </ScrollView> : null
        }
        {
          this.state.statusB ? <ScrollView style={{backgroundColor:'#444444', width:wp('94%'), marginTop:wp('2%')}}>
                                    <View style={{flexDirection: 'row',justifyContent: 'flex-start', flexWrap:'wrap', width:wp('94%')}}>
                                    {                      
                                        global.Regions.map(( region, key ) =>
                                        (
                                        <View style={styles.region}>
                                            <CheckBox
                                                isChecked={this.state.checkbox[region.name.replace(/ /g, "")]}
                                                onClick={this.toggle.bind(this,'region_id',region.name.replace(/ /g, ""))} 
                                                />
                                                <Text style={styles.RegionText}>{region.name}</Text>
                                            </View>
                                        ))
                                    }
                                    </View> 
                                </ScrollView> : null
        }
        {
          this.state.statusC ? <View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('3%')}}>
                                        <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-31, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                                        </ImageBackground>
                                        <Text style={{color: '#333333',fontFamily:"american-typewriter", marginLeft:20,fontSize: 30}}>Price Range</Text>
                                        <ImageBackground source={require('../img/point-noir-long.png')} style={{ height: hp('1%'),width:wp('78%'),resizeMode: 'contain',marginTop: 14, marginLeft:15, marginRight:30}}>
                                    </ImageBackground>
                                    </View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('3%')}}>
                                        <View style={styles.PriceRange0}>
                                            <CheckBox
                                                isChecked={this.state.checkbox['priceRangeA']}
                                                onClick={this.toggle.bind(this,'price','priceRangeA')}
                                                />
                                                <Text style={styles.PriceRangeText}>500</Text>
                                        </View>
                                        <View style={styles.PriceRange1}>
                                            <CheckBox
                                                isChecked={this.state.checkbox['priceRangeB']}
                                                onClick={this.toggle.bind(this,'price','priceRangeB')}
                                                />
                                                <Text style={styles.PriceRangeText}>500-1000</Text>
                                        </View>
                                        <View style={styles.PriceRange2}>
                                            <CheckBox
                                                isChecked={this.state.checkbox['priceRangeC']}
                                                onClick={this.toggle.bind(this,'price','priceRangeC')}
                                                />
                                                <Text style={styles.PriceRangeText}>1000-4000</Text>
                                        </View>
                                        <View style={styles.PriceRange3}>
                                            <CheckBox
                                                isChecked={this.state.checkbox['priceRangeD']}
                                                onClick={this.toggle.bind(this,'price','priceRangeD')}
                                                />
                                                <Text style={styles.PriceRangeText}>PREMIUM</Text>
                                        </View>
                                    </View>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', height: hp('5%'),  marginTop:wp('3%')}}>
                                          <ImageBackground source={require('../img/point-noir-short.png')} style={{ height: hp('1%'),width:wp('40%'),resizeMode: 'contain',marginTop: 4, paddingRight:100}}>
                                          </ImageBackground>
                                          <ImageBackground source={require('../img/point-noir-short.png')} style={{ height: hp('1%'),width:wp('40%'),resizeMode: 'contain',marginTop: 4, paddingRight:100}}>
                                          </ImageBackground>
                                          <ImageBackground source={require('../img/point-noir-short.png')} style={{ height: hp('1%'),width:wp('40%'),resizeMode: 'contain',marginTop: 4, marginRight:30}}>
                                          </ImageBackground>
                                        </View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('3%')}}>
                                        <View style={styles.search0}>
                                                <Text style={styles.searchText}>NAME,REGION OR GRAPES</Text>
                                                <TextInput
                                                    style={{height: 44, width:wp('52%'), backgroundColor:'#333333'}} 
                                                    onChangeText={(word) => this.setState({keyWordSearch: word})}
                                                    value={this.state.keyWordSearch}
                                                    />
                                            </View>
                                        <View style={styles.search1}>
                                        </View>
                                        <View style={styles.search2}>
                                            <TouchableHighlight onPress={() => {
                                                        this.toggle('name', this.state.keyWordSearch);                                              
                                                        this.setModalVisible(!this.state.modalVisible);
                                                        this.computeResultCount();
                                                        }}
                                                        style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:2,marginRight:2,marginBottom:10,padding:2, width:wp('26%'), height:wp('10%')}}>
                                                <Text style={{fontSize:34, textAlign: 'center',color:'#fff',backgroundColor:'#54b84a',padding:3, paddingTop: 26, height:wp('9.65%')}}>SEARCH</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={styles.resetFilter}>
                                            <TouchableHighlight onPress={() => {
                                                        this._onPressButtonReset();
                                                        this.setModalVisible(!this.state.modalVisible);
                                                        }}
                                                        style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:10,marginRight:2,marginBottom:10,padding:2, width:wp('10%'), height:44}}>
                                                <Text style={{textAlign: 'center',color:'#fff',backgroundColor:'#ed4622',padding:2, paddingTop:7, height:40, fontSize:20}}>RESET</Text>
                                            </TouchableHighlight>
                                    </View>
                                </View> : null
                                }
                            </View>
                        </Modal>


           <View style={styles.container}>
                    <View style={{marginTop:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{marginLeft:10,color:'#ee4723'}}>
                            <View style={{borderColor:'#bd1e2c',borderLeftWidth: 10}}>
                                <Text style={{fontSize: 38, fontFamily:"american-typewriter", color:'#bd1e2c',marginLeft:10}}>
                                    RED
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
                            <Text style={styles.listPays} onPress={() => Linking.openURL('http://google.com')}>
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
                                <Text style={{color:'#fff9c6', fontSize: 38, fontFamily:"american-typewriter" ,marginLeft:10}}>
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
                                    <Text style={{color:'#fff',marginLeft:10, fontSize: 38, fontFamily:"american-typewriter"}}>
                                        CHAMPAGNE
                                    </Text>
                                </View>
                                <Text style={styles.listPaysPremier}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#f2778b',borderLeftWidth: 10}}>
                                    <Text style={{color:'#C4698F',fontSize: 38, fontFamily:"american-typewriter",marginLeft:10}}>
                                        ROSE
                                    </Text>
                                </View>
                                <Text style={styles.listPaysPremier}>
                                    France
                                </Text>
                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{borderColor:'#f68a58',borderLeftWidth: 10}}>
                                    <Text style={{color:'#f68a58',fontSize: 38, fontFamily:"american-typewriter",marginLeft:10}}>
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
                            <View style={{color:'#00ADEF',borderTopWidth: 4,borderColor:'#00ADEF',marginTop:30}}>
                                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:13,marginTop:16}}>
                                    <Text style={{color:'#00ADEF',marginLeft:10, fontSize: 34, fontFamily:"american-typewriter"}} onPress={() => this.props.navigation.navigate('Sommelier')}>
                                        BY GLASS
                                    </Text>
                                </View>
                                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:10,marginTop:6}}>
                                    <Text style={{color:'#00ADEF',marginLeft:10, fontSize: 34, fontFamily:"american-typewriter"}}>
                                        B1G1
                                    </Text>
                                </View>
                                <View style={{borderColor:'#00ADEF',borderLeftWidth: 10,marginBottom:10, marginTop:6}}>
                                    <Text style={{color:'#00ADEF',marginLeft:10, fontSize: 34, fontFamily:"american-typewriter"}}>
                                        BEST OF
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 230 ,marginLeft: 10,marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"american-typewriter"}}>
                            CHAMPAGNE
                        </Text>
                        <Text style={{marginTop: 6, color:'#FF0000',fontSize: 22.5,fontFamily:"american-typewriter"}}>
                            Mr & Mrs Bund celebrate the weekend with their incredible Moet & Chandon Special!
                        </Text>
                        <Text style={{marginTop: 4, color:'#008000',fontSize: 18,fontFamily:"american-typewriter"}}>
                            Every Thursday,Friday and Sarturday, from 11 Pm,
                        </Text>
                        <Text style={{marginTop: 4, color:'#008000',fontSize: 18,fontFamily:"american-typewriter"}}>
                            Buy one bottle or Moet & Chandon Brut Imperial and enjoy an additional bottle offered by Mr $ Mrs Bund!
                        </Text>
                        <Text style={{marginTop: 4, color:'#fff',fontSize: 16,fontFamily:"american-typewriter"}}>
                            (Not available During Special Events)
                        </Text>


                        {this.filterPass(this.state.FlatListChampagneFrance).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    France
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListChampagneFrance)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh() 
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-champagne.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        Champagne, {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage} 
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>                                            
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}
                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:40, marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"american-typewriter"}}>
                            RED
                        </Text>
                        
                        {this.filterPass(this.state.FlatListRedArgentina).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:15, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Argentina
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedArgentina)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListRedAustralia).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Australia
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedAustralia)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                        <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                        </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListRedChina).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    China
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedChina)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListRedChile).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Chile
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedChile)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListRedFrance).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    France
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedFrance)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}


                        {this.filterPass(this.state.FlatListRedIsrael).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Israel
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedIsrael)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        
                        {this.filterPass(this.state.FlatListRedItaly).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Italy
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedItaly)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        
                        {this.filterPass(this.state.FlatListRedNewZealand).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    New Zealand
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedNewZealand)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        
                        {this.filterPass(this.state.FlatListRedSouthAfrica).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    South Africa
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedSouthAfrica)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

<PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

</View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        
                        {this.filterPass(this.state.FlatListRedSpain).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Spain
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedSpain)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        
                        {this.filterPass(this.state.FlatListRedUSA).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    USA
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRedUSA)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-red.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}
                    </View>
                

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:40, marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"american-typewriter"}}>
                            WHITE
                        </Text>
                        {this.filterPass(this.state.FlatListWhiteAustralia).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:15, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Australia
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteAustralia)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}
                        {this.filterPass(this.state.FlatListWhiteArgentina).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Argentina
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteArgentina)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteCanada).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Canada
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteCanada)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteChile).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Chile
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteChile)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteChina).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Chine
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteChina)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteFrance).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    France
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteFrance)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteGermany).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Germany
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteGermany)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteItaly).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Italy
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteItaly)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteNewZealand).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    New Zealand
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteNewZealand)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteSpain).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Spain
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteSpain)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListWhiteUSA).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    USA
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListWhiteUSA)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-white.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}
                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:40, marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"american-typewriter"}}>
                            ROSE
                        </Text>
                        {this.filterPass(this.state.FlatListRoseFrance).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:15, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    France
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListRoseFrance)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-rose.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}
                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:40, marginRight: 10}}>
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"american-typewriter"}}>
                            SWEET
                        </Text>
                        {this.filterPass(this.state.FlatListSweetAustralia).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:15, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Australia
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListSweetAustralia)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-sweet.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListSweetFrance).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    France
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListSweetFrance)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-sweet.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListSweetHungray).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Hungray
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListSweetHungray)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-sweet.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}

                        {this.filterPass(this.state.FlatListSweetItaly).length === 0 ? null:
                        <View style={{marginTop: 20}}>
                            <View
                                style={{
                                    marginBottom: 30,
                                    flex: 1,
                                }}>
                                <Text style={{color:'#808080',marginTop:35, fontSize: 44,fontFamily:"american-typewriter"}}>
                                    Italy
                                </Text>
                                <ImageBackground source={require('../img/point-line-long.png')} style={{ height: hp('1%'),width:wp('93%'),resizeMode: 'contain',marginTop: 10}}>
                                        </ImageBackground>
                            </View>
                            <View>
                                <FlatList
                                data={this.filterPass(this.state.FlatListSweetItaly)}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({ item }) => (
                                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                            JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.id, onGoBack: () => this.refresh()
                                        })}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <View style={{
                                                        backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                    }}>
                                                    <View style={{paddingTop: 9, marginRight:1}}>
                                                        <ImageBackground source={require('../img/cone-sweet.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {item.name}
                                                        </Text>
                                                        <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                        {_.find(global.Regions, o=> o.id === item.region_id).name} {item.vintage}
                                                        </Text>
                                                    </View>

                                {item.best === 1 ?<View style={{paddingLeft:wp('71.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.promotion === 1 ?<View style={{paddingTop: 9, paddingLeft:wp('75%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                {item.byglass === 1 ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('55%'), position:"absolute"}}>
                                                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1.4%'),marginLeft:1, marginTop: 34, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 28, fontSize: 18}}>
                                                            :
                                                        </Text>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price1}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 26, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price2}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.8%'), width:wp('2%'),marginLeft:1, marginTop: 16, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price3}
                                                        </Text>
                                                        <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                        <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 28, fontSize: 18, width:30}}>
                                                        {item.price4}
                                                        </Text>
                                                        <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.7%'), width:wp('3%'),marginLeft:1, marginTop: 0, resizeMode: 'contain'}}>
                                                        </ImageBackground>
                                                    </View>:null}
                                                </View>
                                                
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%')}}>

                                            <PlusMoins id={item.id} computeSelectionCount = {this.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                                            </View>
                                            <View style={{flexDirection: 'row',height:40, marginTop:-30}}>
                                            <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.6%'), width:wp('2.1%'),marginLeft:20,marginTop:-7, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                                <Text style={{color:'#FFFFFF', marginLeft:1,marginTop:4, fontSize: 22}}>
                                                    {item.price}
                                                </Text>
                                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        </View>
                        </View>}
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
        width:wp('97%'),
        marginLeft:wp('1.5%'),
        marginTop:wp('2%')
    },
    modalContainer: {
        marginLeft:wp('2%'),
        paddingLeft:wp('2%'),
        marginRight:wp('2%'),
        paddingRight:wp('2%'),
        flex: 1,
        width:wp('96%'),
        backgroundColor:'#444444'
    },
    btnSelected: {
        backgroundColor:'#54b84a',
     },
     notSelected : {
         backgroundColor:'#57585b',
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
        width:wp('28%'),
        marginBottom:15,
        paddingLeft:20,
        padding:6,
        fontSize:28,
    },
    listPaysPremier:{
        color:'#ee4723',
        backgroundColor:'#1c1c1c',
        opacity:1,
        width:wp('28%'),
        marginBottom:15,
        marginTop:18,
        paddingLeft:20,
        padding:6,
        fontSize:28,
    },
    wineType0:{
        flexDirection: 'row',
        width:wp('16%'),
    },
    wineType1:{
        flexDirection: 'row',
        width:wp('18%'),
    },
    wineType2:{
        flexDirection: 'row',
        width:wp('18'),
    },
    wineType3:{
        flexDirection: 'row',
        width:wp('16%'),
    },
    wineType4:{
        flexDirection: 'row',
        width:wp('30%'),
    },
    wineTypeText:{
        marginTop: -6,
        marginLeft: 7,
        color: '#ed4622',
        fontSize: 26
    },
    country0:{
        paddingTop:40,
        flexDirection: 'row',
        width:wp('17%'),
    },
    country1:{
        paddingTop:40,
        flexDirection: 'row',
        width:wp('17%'),
    },
    country2:{
        paddingTop:40,
        flexDirection: 'row',
        width:wp('17'),
    },
    country3:{
        paddingTop:40,
        flexDirection: 'row',
        width:wp('17%'),
    },
    country4:{
        paddingTop:40,
        flexDirection: 'row',
        width:wp('32%'),
    },
    countryText:{
        marginTop: -6,
        color: '#ed4622',
        fontSize: 22,
        marginLeft: 7
    },
    region:{
        flexDirection: 'row',
        width:wp('31%'),
    },
    RegionText:{
        color: '#ed4622',
        fontSize: 22,
        marginLeft: 7
    },
    grape:{
        flexDirection: 'row',
        width:wp('31%'),
    },
    GrapeText: {
        color: '#ed4622',
        fontSize: 22,
        marginLeft: 7
    },
    grapeRegion:{
        paddingTop:20,
        flexDirection: 'row',
        width:wp('100%'),
        justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PriceRange0:{
        flexDirection: 'row',
        width:wp('16%'),
    },
    PriceRange1:{
        flexDirection: 'row',
        width:wp('22%'),
    },
    PriceRange2:{
        flexDirection: 'row',
        width:wp('24%'),
    },
    PriceRange3:{
        flexDirection: 'row',
        width:wp('28%'),
    },
    PriceRangeText:{
        marginTop: -6,
        color: '#ed4622',
        fontSize: 22,
        marginLeft: 7
    },
    search0:{
        marginLeft:8,
        width:wp('56%'),
    },
    search1:{
        width:wp('6%'),
    },
    search2:{
        width:wp('38%'),
    },
    resetFilter:{
        marginLeft:8,
    },
    searchText:{
        marginBottom: 5,
        color:'#ed4622',
        fontSize: 20,
    }
  });