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
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import CheckBox from 'react-native-check-box'
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Wineflatlist from './Wineflatlist';
import DataManager from './DataManager';

let dm = DataManager.getInstance();

    
let _ = require('lodash')
export default class Bestoflist extends Component {




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


        this.scrollViewRef = null;
        this.testRef = null;
        this.offSets = {};

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

            recordCount: 0,

            keyWordSearch: '',

            btnSelected: 0,

            filterGrapeCount: 0,
            filterRegionCount:0,
            filterResultCount: 0,

            //Data value
            name:'',
            region:'',
            price:0,
            icon:'',
            mySelectionCount: 0
        }; 
        this.dataChampagne = [];
        this.dataRed = [];
        this.dataWhite = [];
        this.dataRose =[];
        this.dataSweet = [];

        this.firstFocus = true;

        this.filterCount = dm.bestDataLength;

        this.keyWordSearch ='';
        this.computeSelectionCount = this.computeSelectionCount.bind(this);

        //all wine available
        global.Referer = 'Bestoflist';

        this.props.navigation.setParams({
            filterCount: dm.bestDataLength,
            });

    }


    refresh = () => {
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

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />
        );
    };

    setScrollViewRef = (element) => {
        this.scrollViewRef = element;
    };

    setDataType = () => {
        this.dataChampagne = dm.filterDataTypeForView('best', 'CHAMPAGNE');
        this.dataRed = dm.filterDataTypeForView('best', 'RED');
        this.dataWhite = dm.filterDataTypeForView('best', 'WHITE');
        this.dataRose = dm.filterDataTypeForView('best', 'ROSE');
       this.dataSweet = dm.filterDataTypeForView('best', 'SWEET');       
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleThis: this.refreshHandler,
            ct: this.state.mySelectionCount,
            refresh: this.refresh,
            filterCount: this.filterCount
        });

        this.setDataType();
    }
    
    componentWillUnmount(){
            this.dataChampagne = null;
            this.dataRed = null;
            this.dataRose = null;
            this.dataSweet = null;
            this.dataWhite = null;
            this.scrollViewRef = null;
            this.testRef = null;
            this.offSets = null;
            this.state.checkboxState = null;

      }


    refreshHandler = () => {
        this.setState({modalVisible: true})
    }

    scrollToTypeCountry(type,country){
        this.scrollViewRef.scrollTo({x: 0,
            y: this.offSets[type][country] && this.offSets[type]['parent']  ?
             this.offSets[type][country] + this.offSets[type]['parent']   : 0, 
               animated: true})
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
        console.log('appel toggle value ='+value);
  
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
            checkbox: clone,
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


    filterGrapeNameResolvedEqual(arrayValues,data){
        var result = [];
        if(!_.isArray(arrayValues) )
            throw "invalid param filterGrapeNameResolvedEqual";

        var temp = _.filter(data, o => arrayValues.indexOf(dm.resolveGrapeForWineId(o.id)) > -1);
        if(temp && temp.length != 0){
            temp.forEach(element => {
                if(result.indexOf(element) == -1)
                    result.push(element); 
            });
            return result;
        }
        return [];
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

    filterPriceBetween(types, data){
        var min = 0;
        var max = 0;
        if(!_.isArray(types)) {
            console.log('type = ');
            console.log(types);
            // throw 'not an array';
            return;

        }
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
                        result = this.filterPriceBetween(filter[key], search);
                    }else if(key == 'name'){
                        result = this.filterByName(filter[key], search);
                    }else if(key == 'grapes'){
                        result = this.filterGrapeNameResolvedEqual(filter[key], search);
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
    }

    search(){
        var resultCount = 0;
        this.setDataType(); 
        this.dataChampagne = _.mapValues(this.dataChampagne, e =>  { var res = this.filterPass(e); resultCount = resultCount + res.length; return res;});
        this.dataRose = _.mapValues(this.dataRose, e =>  { var res = this.filterPass(e); resultCount = resultCount + res.length; return res;}); 
        this.dataRed = _.mapValues(this.dataRed, e =>  { var res = this.filterPass(e); resultCount = resultCount + res.length; return res;}); 
        this.dataSweet = _.mapValues(this.dataSweet, e =>  { var res = this.filterPass(e); resultCount = resultCount + res.length; return res;}); 
        this.dataWhite = _.mapValues(this.dataWhite, e =>  { var res = this.filterPass(e); resultCount = resultCount + res.length; return res;}); 


        this.props.navigation.setParams({
            filterCount: resultCount
            });       
    }

    recordLayout(type, country, y){

        if(!this.offSets[type])
             this.offSets[type]= {};
        this.offSets[type][country] = y;
    }


    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    incrementFilterCount = (increment) => {
        this.filterCount = this.filterCount + increment;
        this.props.navigation.setParams({
            filterCount: this.filterCount
            });       
    }

    _onPressButtonReset = () => {
        this.filterCount = dm.bestDataLength;
        this.props.navigation.setParams({
            filterCount: dm.bestDataLength
            });
        this.setDataType();
        return this.setState({
            req : {type:[],country_id:[],region_id:[],grapes:[],price:[], name:''},
            filterGrapeCount: 0,
            filterRegionCount: 0,
            filterResultCount: 0,
            keyWordSearch: ''
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

    didFocus(){
        if(this.firstFocus){
            this.firstFocus = false;
        }else{
            this.refresh();
        }
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
            <ImageBackground source={require('../img/fond.png')} style={{ position:"absolute", height: 0.15* wp('94%') ,width:wp('94%'), left: wp("3%"), top:-40}}>
            </ImageBackground>          
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems:"center", marginLeft: 35, top:-10}}>
                <View style={{marginLeft:30,marginRight:10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('100%')}} onPress={() => navigation.navigate('Accueil')}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:15,marginRight:10}} onPress={() => navigation.navigate('Accueil')}>
                    <ImageBackground source={require('../img/home.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('100%')}} onPress={() => navigation.navigate('Accueil')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between', top:-10}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:35,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => navigation.state.params.handleThis() }>
                    <View style={{width:wp('20%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:8, width:wp('12.5%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"American Typewriter", fontSize: 22}}>Filter</Text>
                        <View
                        style={{width:wp('7%'),paddingTop:8, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22}}>{navigation.getParam('filterCount') == null ? dm.bestDataLength : navigation.getParam('filterCount')}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#c3c3c4',marginRight:60,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Selectlist', {onGoBack: () => navigation.state.params.refresh()})}>
                    <View style={{width:wp('25.5%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:8, width:wp('19%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"American Typewriter", fontSize: 22}}>My Selection</Text>
                        <View
                        style={{width:wp('6%'),paddingTop:8, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22}}>{navigation.getParam('ct') == null ? 0 : navigation.getParam('ct')}</Text>
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


            <ScrollView style={{backgroundColor:'black',width:wp('100%')}} ref={this.setScrollViewRef}>
             <NavigationEvents onDidFocus = {playload => {this.didFocus()}}/>
           
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
                            <ImageBackground source={require('../img/icon-point-top.png')} style={{position:'absolute', marginLeft:wp('51%'), height: hp('8%'), width:wp('8%'),resizeMode: 'contain',marginTop: -40, marginRight:20}}>
                                    </ImageBackground>
                            <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-8, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: 11, marginRight:20}}>
                                    </ImageBackground>
                            <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20, paddingTop: 20, fontSize: 30}}>Wine Type</Text>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', paddingTop:16}}>
                                    <View style={styles.wineType0}>
                                        <CheckBox
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
                                    <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-22, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -4, marginRight:20}}>
                                    </ImageBackground>
                                    <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20,fontSize: 30}}>Country</Text>
                                    <ImageBackground source={require('../img/point-noir-long.png')} style={{ height: hp('1%'),width:wp('78%'),resizeMode: 'contain',marginTop: 14, marginLeft:15, marginRight:30}}>
                                    </ImageBackground>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: 'flex-start', flexWrap:'wrap'}}>
                                    {
                                        dm.country.map(( country, i) =>
                                        (
                                        <View key={i} style={styles['country0']}>
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
                                    <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-22, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                                    </ImageBackground>
                                    <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20,fontSize: 30}}>Grapes & Region</Text>
                                    <ImageBackground source={require('../img/point-noir-long.png')} style={{ height: hp('1%'),width:wp('78%'),resizeMode: 'contain',marginTop: 14, marginLeft:15, marginRight:30}}>
                                    </ImageBackground>
                                </View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('1%')}}>
                                        <View style={styles.grapeRegion}>
                                            <View style={{backgroundColor:'#c3c3c4',marginRight: wp('20%'), marginTop:10,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <TouchableOpacity onPress={this.ShowHideComponentA} style={(this.state.btnSelected== 1)?styles.btnSelected:styles.notSelected}>
                                                    <Text style={{fontSize:20, color:'#c3c3c4',marginRight:3,paddingLeft:20, paddingRight:20, padding:8,fontFamily:"American Typewriter"}}>Grapes</Text>
                                                </TouchableOpacity>
                                                <View
                                                    style={{width:wp('4%'),backgroundColor:'#f1592a',color:'#fff'}}
                                                >
                                                    <Text style={{fontSize:20, color:'#fff',textAlign: 'center',padding:8}}>{this.state.filterGrapeCount}</Text>
                                                </View>
                                            </View>
                                            <View style={{backgroundColor:'#c3c3c4',marginRight: wp('1ss0%'), marginLeft: 5,marginTop:10,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                                                <TouchableOpacity onPress={this.ShowHideComponentB} style={(this.state.btnSelected== 2)?styles.btnSelected:styles.notSelected}>
                                                    <Text style={{fontSize:20, color:'#c3c3c4',marginRight:3,paddingLeft:20, paddingRight:20,padding:8,fontFamily:"American Typewriter"}}>Regions</Text>
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
        this.state.statusA ? <ScrollView style={{backgroundColor:'#444444', width:wp('92%'), marginTop:wp('2%')}}>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', flexWrap:'wrap'}}>
                                {                              
                                    global.Grapes.map(( grape, i ) =>
                                    (
                                    <View key={i} style={styles.grape}>
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
          this.state.statusB ? <ScrollView style={{backgroundColor:'#444444', width:wp('92%'), marginTop:wp('2%')}}>
                                    <View style={{flexDirection: 'row',justifyContent: 'flex-start', flexWrap:'wrap', width:wp('94%')}}>
                                    {                      
                                        global.Regions.map(( region, i ) =>
                                        (
                                        <View key={i} style={styles.region}>
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
                                        <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-22, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                                        </ImageBackground>
                                        <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20,fontSize: 30}}>Price Range</Text>
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
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('2%')}}>
                                        <View style={styles.search0}>
                                                <Text style={styles.searchText}>NAME,REGION OR GRAPES</Text>
                                                <TextInput
                                                    style={{height: 40, width:wp('50%'), backgroundColor:'#333333'}} 
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
                                                        this.search();
                                                        }}
                                                        style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:2,marginRight:2,marginBottom:10,padding:2, width:wp('26%'), height:wp('10%')}}>
                                                <Text style={{fontSize:34, textAlign: 'center',color:'#fff',backgroundColor:'#54b84a',padding:3, paddingTop: 16, height:wp('9.65%')}}>SEARCH</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={styles.resetFilter}>
                                            <TouchableHighlight onPress={() => {
                                                        this._onPressButtonReset();
                                                        this.setModalVisible(!this.state.modalVisible);
                                                        }}
                                                        style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:5,marginRight:2,marginBottom:10,padding:2, width:wp('13%'), height:40}}>
                                                <Text style={{textAlign: 'center',color:'#fff',backgroundColor:'#ed4622',padding:2, paddingTop:8, height:35, fontSize:18}}>RESET</Text>
                                            </TouchableHighlight>
                                    </View>
                                </View> : null
                                }
                            </View>
                        </Modal>

                <View style={styles.container}>
                    <View style={{marginTop:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{marginLeft:10,color:'#ee4723'}}>
                            <View style={{paddingBottom: 8}}>
                                <View style={{borderColor:'#bd1e2c',borderLeftWidth: 10}}>
                                    <Text style={{fontSize: 38, fontFamily:"American Typewriter", color:'#bd1e2c',marginLeft:10}}>
                                        RED
                                    </Text>
                                </View>
                            </View>

                        { dm.countryNamesIn('RED').map((country, i)=> {
                            return       <TouchableOpacity key={i} onPress = {() => this.scrollViewRef.scrollTo({x: 0,
                                y: this.offSets['RED'][country] && this.offSets['RED'][country]  ? this.offSets['RED'][country] + this.offSets['RED']['parent']   : 0, 
                                   animated: true})}>
                                   <Text style={styles.listPaysPremier}>
                                           {country}
                                   </Text>
                               </TouchableOpacity>
                        })}

                        </View>

                        <View style={{marginLeft:10,color:'#ee4723'}}>
                            <View style={{paddingBottom: 8}}>
                                <View style={{borderColor:'#fff9c6',borderLeftWidth: 10}}>
                                    <Text style={{color:'#fff9c6', fontSize: 38, fontFamily:"American Typewriter" ,marginLeft:10}}>
                                        WHITE
                                    </Text>
                                </View>
                            </View>

                            { dm.countryNamesIn('WHITE').map((country, i) => {
                            return       <TouchableOpacity key={i} onPress = {() => this.scrollViewRef.scrollTo({x: 0,
                                y: this.offSets['WHITE'][country] && this.offSets['WHITE'][country]  ? this.offSets['WHITE'][country] + this.offSets['WHITE']['parent']   : 0, 
                                   animated: true})}>
                                   <Text style={styles.listPaysPremier}>
                                           {country}
                                   </Text>
                               </TouchableOpacity>
                                 })}                       
                                 
                         </View>
                        <View style={{marginBottom:10,marginLeft:10,marginRight: 10}}>
                            <View>
                                <View style={{paddingBottom: 8}}>
                                    <View style={{borderColor:'#fff',borderLeftWidth: 10}}>
                                        <Text style={{color:'#fff',marginLeft:10, fontSize: 38, fontFamily:"American Typewriter"}}>
                                            CHAMPAGNE
                                        </Text>
                                    </View>
                                </View>

                                { dm.countryNamesIn('CHAMPAGNE').map((country, i)=> {
                                        return       <TouchableOpacity key={i} onPress = {() => this.scrollViewRef.scrollTo({x: 0,
                                            y: this.offSets['CHAMPAGNE'][country] && this.offSets['CHAMPAGNE'][country]  ? this.offSets['CHAMPAGNE'][country] + this.offSets['CHAMPAGNE']['parent']   : 0, 
                                            animated: true})}>
                                            <Text style={styles.listPaysPremier}>
                                                    {country}
                                            </Text>
                                        </TouchableOpacity>
                                 })} 


                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{paddingBottom: 8}}>
                                    <View style={{borderColor:'#f2778b',borderLeftWidth: 10}}>
                                        <Text style={{color:'#C4698F',fontSize: 38, fontFamily:"American Typewriter",marginLeft:10}}>
                                            ROSE
                                        </Text>
                                    </View>
                                </View>

                                { dm.countryNamesIn('ROSE').map((country, i) => {
                                        return       <TouchableOpacity key={i} onPress = {() => this.scrollViewRef.scrollTo({x: 0,
                                            y: this.offSets['ROSE'][country] && this.offSets['ROSE'][country]  ? this.offSets['ROSE'][country] + this.offSets['ROSE']['parent']   : 0, 
                                            animated: true})}>
                                            <Text style={styles.listPaysPremier}>
                                                    {country}
                                            </Text>
                                        </TouchableOpacity>
                                 })} 




                            </View>
                            <View style={{marginBottom:10}}>
                                <View style={{paddingBottom: 8}}>
                                    <View style={{borderColor:'#f68a58',borderLeftWidth: 10}}>
                                        <Text style={{color:'#f68a58',fontSize: 38, fontFamily:"American Typewriter",marginLeft:10}}>
                                            SWEET
                                        </Text>
                                    </View>
                                </View>
                                { dm.countryNamesIn('SWEET').map((country, i) => {
                                        return       <TouchableOpacity key={i} onPress = {() => this.scrollViewRef.scrollTo({x: 0,
                                            y: this.offSets['SWEET'][country] && this.offSets['SWEET'][country]  ? this.offSets['SWEET'][country] + this.offSets['SWEET']['parent']   : 0, 
                                            animated: true})}>
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
                    <View style={{marginTop: 230 ,marginLeft: 10,marginRight: 10}} 
                                                        onLayout =  { (e) => this.recordLayout('CHAMPAGNE','parent',e.nativeEvent.layout.y)}

                    >
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                            CHAMPAGNE
                        </Text>
                        <Text style={{marginTop: 6, color:'#FF0000',fontSize: 22.5,fontFamily:"American Typewriter"}}>
                            Mr & Mrs Bund celebrate the weekend with their incredible Moet & Chandon Special!
                        </Text>
                        <Text style={{marginTop: 4, color:'#008000',fontSize: 18,fontFamily:"American Typewriter"}}>
                            Every Thursday,Friday and Sarturday, from 11 Pm,
                        </Text>
                        <Text style={{marginTop: 4, color:'#008000',fontSize: 18,fontFamily:"American Typewriter"}}>
                            Buy one bottle or Moet & Chandon Brut Imperial and enjoy an additional bottle offered by Mr $ Mrs Bund!
                        </Text>
                        <Text style={{marginTop: 4, color:'#fff',fontSize: 16,fontFamily:"American Typewriter"}}>
                            (Not available During Special Events)
                        </Text>

                    {dm.countryNamesIn('CHAMPAGNE').map((item, i) => {
                        return       <Wineflatlist key={i} data={this.dataChampagne[dm.countryByName(item)]} 
                        computeSelectionCount = {this.computeSelectionCount.bind(this)}
                        navigation = {this.props.navigation}
                        country = {item}
                        type ={'CHAMPAGNE'}
                        count = {this.state.count}
                        infoLayout = {this.recordLayout.bind(this)}
                        > </Wineflatlist>
                    })}

                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:30, marginRight: 10}} onLayout =
                    { (e) => this.recordLayout('RED','parent',e.nativeEvent.layout.y)}
                    >
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                            RED
                        </Text>
                        
                        { dm.countryNamesIn('RED').map((item, i) => {
                            return       <Wineflatlist key={i} data={this.dataRed[dm.countryByName(item)]} 
                            computeSelectionCount = {this.computeSelectionCount.bind(this)}
                            navigation = {this.props.navigation}
                            country = {item}
                            type ={'RED'}
                            count = {this.state.count}
                            infoLayout = {this.recordLayout.bind(this)}
                                > </Wineflatlist>
                        })}
                        
                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:30, marginRight: 10}}
                                    onLayout =    { (e) => this.recordLayout('WHITE','parent',e.nativeEvent.layout.y)}

                    >
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                            WHITE
                        </Text>

                      {
                        dm.countryNamesIn('WHITE').map((item, i) => {
                            return       <Wineflatlist key={i} data={this.dataWhite[dm.countryByName(item)]} 
                            computeSelectionCount = {this.computeSelectionCount.bind(this)}
                            navigation = {this.props.navigation}
                            country = {item}
                            type ={'WHITE'}
                            count = {this.state.count}
                            infoLayout = {this.recordLayout.bind(this)}                            
                            > </Wineflatlist>
                        })}
                        
                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:30, marginRight: 10}}
                                                        onLayout =    { (e) => this.recordLayout('ROSE','parent',e.nativeEvent.layout.y)}

                    >
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                            ROSE
                        </Text>
                        
                        { dm.countryNamesIn('ROSE').map((item, i) => {
                            return       <Wineflatlist key={i} data={this.dataRose[dm.countryByName(item)]} 
                            computeSelectionCount = {this.computeSelectionCount.bind(this)}
                            navigation = {this.props.navigation}
                            country = {item}
                            type ={'ROSE'}
                            count = {this.state.count}
                            infoLayout = {this.recordLayout.bind(this)}                              
                            > </Wineflatlist>
                        })}
                        
                    </View>

                    <View style={{marginLeft: 10,marginBottom:10, marginTop:30, marginRight: 10}}  
                                                        onLayout =    { (e) => this.recordLayout('SWEET','parent',e.nativeEvent.layout.y)}
                                                        >
                        <Text style={{color:'#fff',fontSize: 46,fontFamily:"American Typewriter"}}>
                            SWEET
                        </Text>
                        
                        { dm.countryNamesIn('SWEET').map((item, i) => {
                            return       <Wineflatlist key={i} data={this.dataSweet[dm.countryByName(item)]} 
                            computeSelectionCount = {this.computeSelectionCount.bind(this)}
                            navigation = {this.props.navigation}
                            country = {item}
                            type ={'SWEET'}
                            count = {this.state.count}
                            infoLayout = {this.recordLayout.bind(this)}
                            > </Wineflatlist>
                        })}
                       
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
        marginTop: wp('-1.8%'),
        marginLeft:wp('3%'),
        paddingLeft:wp('2%'),
        marginRight:wp('3%'),
        paddingRight:wp('2%'),
        flex: 1,
        width:wp('94%'),
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
        width:wp('26%'),
        marginBottom:15,
        marginTop:0,
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
        marginTop: -4,
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
        marginTop: -4,
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
