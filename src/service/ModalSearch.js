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
    TextInput,Image, Button
} from 'react-native';

import Dash from 'react-native-dash';

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
        
        dm._regionList['all'].forEach( e =>{
            checkboxState[e.name.replace(/ /g, "")] = this.props.req.region_id.indexOf(e.id) > -1;
        });

        dm._grapeList['all'].forEach( e =>{
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

    isRegionDisabled = (region) =>{

        if(this.state.req.country_id.length == 0) return false;

        if(this.state.req.country_id.indexOf(region.countryId) == -1) return true;

        return false;
    }

    onReset(){
        let checkboxState = {};
        let types = ['RED','WHITE','SWEET','ROSE','CHAMPAGNE'];
        types.forEach(type =>{
            checkboxState[type] = false;
        })

        dm.country.forEach(country => {
            checkboxState[country.name.replace(/ /g, "")] = false;            
        })

        let priceRanges = ['priceRangeA','priceRangeB','priceRangeC','priceRangeD'];
        priceRanges.forEach(priceRange =>{
            checkboxState[priceRange] = false;
        })


        dm._regionList['all'].forEach( e =>{
            checkboxState[e.name.replace(/ /g, "")] = false;
        });

        dm._grapeList['all'].forEach( e =>{
            checkboxState[e] = false;
        });

        this.setState({ 
             req : {type:[],country_id:[],region_id:[], grapes:[], price:[], name:''},
             checkbox: checkboxState,
             keyWordSearch: '',
             filterGrapeCount: 0,
             filterRegionCount:0,
 
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
                <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20, paddingTop: 20, fontSize: 22}}>Wine Type</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', paddingTop:16}}>
                        <View style={styles.wineType0}>
                            <CheckBox
                                isChecked={this.state.checkbox.RED }
                                onClick={this.toggle.bind(this,'type','RED')}
                                                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:32,height:32}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:32,height:32}}/>}
 
                                />
                                <Text style={styles.wineTypeText}>RED</Text>
                        </View>
                        <View style={styles.wineType1}>
                            <CheckBox
                                isChecked={this.state.checkbox.WHITE}
                                onClick={this.toggle.bind(this,'type','WHITE')}
                                                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:32,height:32}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:32,height:32}}/>}
 
                                />
                                <Text style={styles.wineTypeText}>WHITE</Text>
                        </View>
                        <View style={styles.wineType2}>
                            <CheckBox
                                isChecked={this.state.checkbox.SWEET }
                                onClick={this.toggle.bind(this,'type','SWEET')}
                                                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:32,height:32}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:32,height:32}}/>}
 
                                />
                                <Text style={styles.wineTypeText}>SWEET</Text>
                        </View>
                        <View style={styles.wineType3}>
                            <CheckBox
                                isChecked={this.state.checkbox.ROSE }
                                onClick={this.toggle.bind(this,'type','ROSE')} 
                                                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:32,height:32}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:32,height:32}}/>}

                                />
                                <Text style={styles.wineTypeText}>ROSE</Text>
                        </View>
                        <View style={styles.wineType4}>
                            <CheckBox
                                isChecked={this.state.checkbox.CHAMPAGNE }
                                onClick={this.toggle.bind(this,'type','CHAMPAGNE')} 
                                                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:32,height:32}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:32,height:32}}/>}

                                />
                                <Text style={styles.wineTypeText}>CHAMPAGNE</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30}}>
                        <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-22, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -4, marginRight:20}}>
                        </ImageBackground>
                        <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20,fontSize: 22}}>Country</Text>


                        <Dash style={{width:wp('78%'), height:15,marginTop: 12, marginLeft:15, marginRight:30}} 
                        dashGap={8.5}
                        dashColor={'black'}
                        dashThickness={4}
                        dashLength={4}
                        dashStyle={{borderRadius: 100, overflow: 'hidden'}}/>
                        
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
                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}
                                    />
                                    <Text style={styles.countryText}>{dm.compoundCountry(country.name)}</Text>
                            </View>
                            ))
                        }
                    </View>
                }
               
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('3%')}}>
                        <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-22, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                        </ImageBackground>
                        <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20,fontSize: 22}}>Grapes & Region</Text>
                        
                        <Dash style={{width:wp('78%'), height:15,marginTop: 12, marginLeft:15, marginRight:30}} 
                        dashGap={8.5}
                        dashColor={'black'}
                        dashThickness={4}
                        dashLength={4}
                        dashStyle={{borderRadius: 100, overflow: 'hidden'}}/>                  


                       
                    </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:0.5*wp('1%')}}>
                            <View style={styles.grapeRegion}>



                                <View style={{backgroundColor:'#808080',marginRight: wp('20%'), marginTop:10,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={this.ShowHideComponentA} style={(this.state.btnSelected== 1)?styles.btnSelected:styles.notSelected}>
                                            <Text style={{fontSize:15, color:'#808080',fontFamily:"Helvetica Neue",fontWeight:'400',
                                            marginLeft:16, marginTop:6}}>
                                            Grapes</Text>
                                        </TouchableOpacity>
                                        <View
                                            style={{width:wp('4%'),backgroundColor:'#f1592a',color:'#fff'}}
                                        >
                                            <Text style={{fontSize:15, color:'#fff',textAlign: 'center',
                                            marginTop:7
                                        }}>{this.state.filterGrapeCount}</Text>
                                        </View>
                                </View>
 
                                <View style={{backgroundColor:'#808080',marginRight: wp('1ss0%'), marginTop:10,marginBottom:10,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={this.ShowHideComponentB} style={(this.state.btnSelected== 2)?styles.btnSelected:styles.notSelected}>
                                    <Text style={{fontSize:15, color:'#808080',fontFamily:"Helvetica Neue",fontWeight:'400',
             marginLeft:16, marginTop:6}}>   
                                        Regions</Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{width:wp('4%'),backgroundColor:'#f1592a',color:'#fff'}}
                                    >
                                        <Text style={{fontSize:15, color:'#808080',textAlign: 'center',  marginTop:7}}>
                                        {this.state.filterRegionCount}
                                        </Text>
                                    </View>
                                </View>


                  </View>







                        </View>          

{
this.state.statusA ? <ScrollView style={{backgroundColor:'#444444', width:wp('92%'), marginTop:wp('2%')}}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-start', flexWrap:'wrap', width:wp('94%')}}>
                    {                              
                        dm._grapeList['all'].map(( grape, i ) =>
                        (
                        <View key={i} style={styles.grape}>
                            <CheckBox
                                isChecked={this.state.checkbox[grape] }
                                onClick={this.toggle.bind(this,'grapes',grape)}
                                                                    checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}
 
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
                            dm._regionList['all'].map(( region, i ) =>
                            (
                            <View key={i} style={styles.region}>
                                <CheckBox
                                    isChecked={this.state.checkbox[region.name.replace(/ /g, "")] }
                                    onClick={this.toggle.bind(this,'region_id',region.name.replace(/ /g, ""))} 
                                    disabled = {this.isRegionDisabled(region)}                                 checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}
                                    style={{opacity: this.isRegionDisabled(region)?0.1:1}}
                                    />
                                    <Text style={[styles.RegionText, {opacity: this.isRegionDisabled(region)?0.1:1}]}>{dm.lineBreak(region.name)}</Text>
                                </View>
                            ))
                        }
                        </View> 
                    </ScrollView> : null
}
{
this.state.statusC ? <View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:0.59*wp('3%')}}>
                            <ImageBackground source={require('../img/icon-point-left.png')} style={{position:'absolute', marginLeft:-22, height: hp('4%'), width:wp('4%'),resizeMode: 'contain',marginTop: -6, marginRight:20}}>
                            </ImageBackground>
                            <Text style={{color: '#333333',fontFamily:"American Typewriter", marginLeft:20,fontSize: 22}}>Price Range</Text>

                        <Dash style={{width:wp('78%'), height:15,marginTop: 12, marginLeft:15, marginRight:30}} 
                        dashGap={8.5}
                        dashColor={'black'}
                        dashThickness={4}
                        dashLength={4}
                        dashStyle={{borderRadius: 100, overflow: 'hidden'}}/>

                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('3%')}}>
                            <View style={styles.PriceRange0}>
                                <CheckBox
                                    isChecked={this.state.checkbox['priceRangeA']}
                                    onClick={this.toggle.bind(this,'price','priceRangeA')}
                                                                        checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}

                                    />
                                    <Text style={styles.PriceRangeText}>{'<500'}</Text>
                            </View>
                            <View style={styles.PriceRange1}>
                                <CheckBox
                                    isChecked={this.state.checkbox['priceRangeB']}
                                    onClick={this.toggle.bind(this,'price','priceRangeB')}
                                                                        checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}

                                    />
                                    <Text style={styles.PriceRangeText}>500-1000</Text>
                            </View>
                            <View style={styles.PriceRange2}>
                                <CheckBox
                                    isChecked={this.state.checkbox['priceRangeC']}
                                    onClick={this.toggle.bind(this,'price','priceRangeC')}
                                                                        checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}

                                    />
                                    <Text style={styles.PriceRangeText}>1000-4000</Text>
                            </View>
                            <View style={styles.PriceRange3}>
                                <CheckBox
                                    isChecked={this.state.checkbox['priceRangeD']}
                                    onClick={this.toggle.bind(this,'price','priceRangeD')}
                                                                        checkedImage={<Image source={require('../img/selected.png')} style={{width:20,height:20}} />}
                                    unCheckedImage={<Image source={require('../img/notselected.png')} style={{width:20,height:20}}/>}

                                    />
                                    <Text style={styles.PriceRangeText}>PREMIUM</Text>
                            </View>
                        </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', height: hp('5%'),  marginTop:wp('3%')}}>
                           
                            <Dash style={{width:wp('92%'), height:15,marginTop: 12, marginLeft:-5}} 
                        dashGap={8.5}
                        dashColor={'black'}
                        dashThickness={4}
                        dashLength={4}
                        dashStyle={{borderRadius: 100, overflow: 'hidden'}}/>

                            </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop:wp('2%')}}>
                            <View style={styles.search0}>
                                    <Text style={styles.searchText}>NAME,REGION OR GRAPES</Text>
                                    <TextInput
                                        style={{height: 30, width:wp('50%'), backgroundColor:'#333333'}} 
                                        onChangeText={(word) => this.setState({keyWordSearch: word})}
                                        value={this.state.keyWordSearch}
                                        placeholder = ' input wine name/country/grape ..'
                                        placeholderTextColor ='#D3D3D3'
                                        onFocus ={ () => {
                                            this.setState({hideCountryList:true});
                                        }}
                                        onBlur = { () => {
                                            this.setState({hideCountryList:false});
                                        }}
                                        />
                            </View>

                            <Dash style={{width:wp('10,6%'), height:15,transform: [{ rotate: '-90deg'}], 
                            left:wp('49%'),
                        position:'absolute',top:28
                        }} 
                        dashGap={8}
                        dashColor={'black'}
                        dashThickness={4}
                        dashLength={4}
                        dashStyle={{borderRadius: 100, overflow: 'hidden'}}/>





                            <View style={styles.search1}>
                            </View>
                            <View style={styles.search2}>
                                <TouchableHighlight onPress={() => {
                                            this.toggle('name', this.state.keyWordSearch); 
                                            this.props.search(this.state.req);

                                            }}
                                            style={{backgroundColor:'#808080',marginLeft:2,marginTop:2,marginRight:6,marginBottom:10,padding:2, width:wp('22%'), height:wp('10%')}}>
                                    <Text style={{fontSize:28, textAlign: 'center',color:'#fff',backgroundColor:'#54b84a',padding:3, paddingTop: 16, height:wp('9.65%')}}>SEARCH</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.resetFilter}>
                                <TouchableHighlight onPress={() => {
                                            this.onReset()
                                            }}
                                            style={{borderWidth:2, borderColor:'#808080',marginLeft:2,marginTop:5,
                                            backgroundColor:'#ed4622',marginRight:2,marginBottom:10, width:0.82*wp('13%'), height:31}}>
                                    <Text style={{textAlign: 'center',color:'#fff', height:35, fontSize:13, marginTop:5}}>RESET</Text>
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
        width:wp('94%'),
        marginLeft:wp('3%'),
        marginTop:wp('2%')
    },
    modalContainer: {
        marginTop: -8,
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
        height: 33,
        width:81
     },
     notSelected : {
         backgroundColor:'#57585b',
         height: 33,
         width:81
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
        marginTop: 5,
        marginLeft: 7,
        color: '#ed4622',
        fontSize: 18,
        fontFamily:'Helvetica Neue'
    },
    country0:{
        paddingTop:20,
        flexDirection: 'row',
        width:wp('22%'),
        alignItems: 'flex-end',
        marginBottom:10
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
        fontSize: 16,
        marginLeft: 7,
        fontFamily:'Helvetica Neue',
        fontWeight:'400'
    },
    region:{
        flexDirection: 'row',
        width:wp('31%'),
        marginBottom:17
    },
    RegionText:{
        color: '#ed4622',
        fontSize: 13,
        marginLeft: 7,
        fontFamily:'Helvetica Neue',
       
    },
    grape:{
        flexDirection: 'row',
        width:wp('31%'),
        marginBottom:17
    },
    GrapeText: {
        color: '#ed4622',
        fontSize: 13,
        marginLeft: 7,
        fontFamily:'Helvetica Neue'
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
        color: '#ed4622',
        fontSize: 16,
        marginLeft: 7,
        fontFamily:'Helvetica Neue'
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
        fontSize: 13,
        fontFamily:'Helvetica Neue'
    }
  });