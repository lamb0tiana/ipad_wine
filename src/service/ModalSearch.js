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

import CheckBox from 'react-native-check-box';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import DataManager  from './DataManager';

let dm = DataManager.getInstance();
let _ = require('lodash');


export default class ModalSearch extends Component {

    constructor(props) {
        super(props);

        let checkboxState = {};
        let types = ['RED','WHITE','SWEET','ROSE','CHAMPAGNE'];
        types.forEach(type =>{
            checkboxState[type] = this.props.req.type.indexOf(type) > -1;
        })

        dm.country.forEach(country => {
            checkboxState[country.name.replace(/ /g, "")] = this.props.req.country_id.indexOf(country.id) > -1;            
        })

        let priceRanges = ['priceRangeA','priceRangeB','priceRangeC','priceRangeD'];
        priceRanges.forEach(priceRange =>{
            checkboxState[priceRange] = this.props.req.price.indexOf(priceRange) > -1;
        })

        global.Regions.forEach( e =>{
            checkboxState[e.name.replace(/ /g, "")] = this.props.req.region_id.indexOf(e.id) > -1;
        });

        global.Grapes.forEach( e =>{
            checkboxState[e] = this.props.req.grapes.indexOf(e) > -1;
        });

        this.state = {
            //Filter
            //country
            checkbox: checkboxState, 

            req : this.props.req,

            count:0,
            modalVisible: false,

            statusA:false,
            statusB:false,
            statusC:true,

            recordCount: 0,

            keyWordSearch: this.props.req.name,

            btnSelected: 0,

            filterGrapeCount: this.props.req.grapes.length,
            filterRegionCount:this.props.req.region_id.length,
            hideCountryList: false,

            //Data value
            name:'',
            region:'',
            price:0,
            icon:'',
        }; 



    }

    toggle(type, value){
        console.log('toggle sx');
        if(type == 'name'){
            this.state.req.name = value;
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

    onReset(){
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

        this.setState({ 
             req : {type:[],country_id:[],region_id:[], grapes:[], price:[], name:''},
             checkbox: checkboxState,
             keyWordSearch: '',
        });


    }

    render() {
        return(
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.show}
            onRequestClose={() => {
                this.props.toggle();
            }}
            >
            <TouchableOpacity 
                onPress={() => {this.props.toggle()}} 
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
                                isChecked={this.state.checkbox.RED }
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
                                isChecked={this.state.checkbox.SWEET }
                                onClick={this.toggle.bind(this,'type','SWEET')} 
                                />
                                <Text style={styles.wineTypeText}>SWEET</Text>
                        </View>
                        <View style={styles.wineType3}>
                            <CheckBox
                                isChecked={this.state.checkbox.ROSE }
                                onClick={this.toggle.bind(this,'type','ROSE')} 
                                />
                                <Text style={styles.wineTypeText}>ROSE</Text>
                        </View>
                        <View style={styles.wineType4}>
                            <CheckBox
                                isChecked={this.state.checkbox.CHAMPAGNE }
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
                { this.state.hideCountryList ? null :
                    <View style={{flexDirection: 'row',justifyContent: 'flex-start', flexWrap:'wrap'}}>
                        {
                            dm.country.map(( country, i ) =>
                            (
                            <View key={i} style={styles['country0']}>
                                <CheckBox
                                    isChecked={this.state.checkbox[country.name.replace(/ /g, "")] }
                                    onClick={this.toggle.bind(this,'country_id',country.name.replace(/ /g, ""))} 
                                    />
                                    <Text style={styles.countryText}>{country.name}</Text>
                            </View>
                            ))
                        }
                    </View>
                }
               
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
                                isChecked={this.state.checkbox[grape] }
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
                                    isChecked={this.state.checkbox[region.name.replace(/ /g, "")] }
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
                                        onFocus ={ () => {
                                            this.setState({hideCountryList:true});
                                        }}
                                        onBlur = { () => {
                                            this.setState({hideCountryList:false});
                                        }}
                                        />
                                </View>
                            <View style={styles.search1}>
                            </View>
                            <View style={styles.search2}>
                                <TouchableHighlight onPress={() => {
                                            this.toggle('name', this.state.keyWordSearch); 
                                            this.props.search(this.state.req);
                                            
                                            }}
                                            style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:2,marginRight:2,marginBottom:10,padding:2, width:wp('26%'), height:wp('10%')}}>
                                    <Text style={{fontSize:34, textAlign: 'center',color:'#fff',backgroundColor:'#54b84a',padding:3, paddingTop: 16, height:wp('9.65%')}}>SEARCH</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.resetFilter}>
                                <TouchableHighlight onPress={() => {
                                            this.onReset()
                                            }}
                                            style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:5,marginRight:2,marginBottom:10,padding:2, width:wp('13%'), height:40}}>
                                    <Text style={{textAlign: 'center',color:'#fff',backgroundColor:'#ed4622',padding:2, paddingTop:8, height:35, fontSize:18}}>RESET</Text>
                                </TouchableHighlight>
                        </View>
                    </View> : null
                    }
                </View>
            </Modal>

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