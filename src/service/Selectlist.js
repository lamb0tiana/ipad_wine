import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
    FlatList,
    Alert
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DataManager from './DataManager';
    
let _ = require('lodash')
let dm = DataManager.getInstance();
export default class Selectlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mySelectionCount: 0,
            FlatListSelected:[],
            data:{}
        }


        

        var ids = global.Selected.reduce(function(a,r){
            if(a == '') {
                  return String(r.id);
            }else{
                  return a + ',' + r.id;
            }
        
        }, '');

        this.deleteAllSelected = this.deleteAllSelected.bind(this);

        //global.Selected.push({id:'32',type:'price3',count:1});
        dm.wineOfIdsIn(ids.split(',')).then(temp => {
            global.Selected.map(function(selected){
                var c = _.find(temp, o => o.id == selected.id );
                if (c && !selected.data){
                        selected.data =  c;
                }
                });

                this.state.FlatListSelected = global.Selected
                
        });          
        //ajouter 





    }


    getPrice(item){
        var type = item.type;
        if(type == 'byglass'){
            return item.data.price;
        }else{
            return item.data[type];
        }
    }


    componentDidMount() {
        this.computeSelectionCount();
        this.props.navigation.setParams({
            ct: global.SelectionCount,
            deleteAllSelected: this.deleteAllSelected,
        });
    }

    deleteAllSelected(){
        Alert.alert(
            'Delete Confirm',
            'Do you really want to clear all selection',
            [
              {
                text: 'Cancel',
                onPress: () => {return;},
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {
                global.Selected =[];
                this.setState({
                    mySelectionCount: this.state.mySelectionCount + 1,
                    FlatListSelected: []
                });
                global.SelectionCount = 0;
                this.props.navigation.setParams({
                    ct: 0
                });  
              }},
            ],
            {cancelable: true},
          );

    }

    computeSelectionCount(){
        var sel = global.Selected.reduce(function(a,r){
            return a+ r.count;
            }, 0);
            
            global.SelectionCount = sel;
            this.state.mySelectionCount =  sel;

            this.props.navigation.setParams({
                ct: sel
            });

            this.setState({
                mySelectionCount: this.state.mySelectionCount + 1
            })
    }


    getDb(id, obj){
        return obj.filter(el => (el.id == id && el.type == type))[0];
    }

    getSelected(id, type="byglass"){
        return global.Selected.filter(el => (el.id == id && el.type == type))[0];
    }


    onPressPlus = (id, type) => {
        var selected = this.getSelected(id, type);
         if(selected != undefined){
      //mise a jour selected plus
         selected.count = selected.count + 1;
 
         }else{
     //insertion nouveau selected
             var itemToInsert = {};
             itemToInsert.id = id;
             itemToInsert.type = type;
             itemToInsert.count = 1;
             global.Selected.push(itemToInsert);
         }
         this.computeSelectionCount();
 
     }
 
     onPressMoin = (id, type) => {
         var selected = this.getSelected(id, type);
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
 
         
     onPressMoinPlus = (id, type="byglass") => {
 
         if (this.getSelected(id,type) != undefined) {
            return <TouchableOpacity onPress={this.onPressPlus.bind(this, id, type)} >
            <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.8%'),width:wp('2.5%')}}>
            </ImageBackground>
        </TouchableOpacity>
    }
    else return <TouchableOpacity  onPress={this.onPressPlus.bind(this, id, type)}>
        <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.8%'),width:wp('2.5%'), marginLeft: 45}}>
        </ImageBackground>
    </TouchableOpacity>;
        }
 
     onPressMoinPlus2 = (id, type="byglass") => {
         var sel = this.getSelected(id,type);
         if (sel && sel.count>0) {
             return <TouchableOpacity onPress={this.onPressMoin.bind(this, id,type)}>
                 <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('1.8%'),width:wp('2.6%'), marginLeft: 10}}>
                 </ImageBackground>
             </TouchableOpacity>
         }
         
     }


    static navigationOptions = ({navigation}) => ({
        headerLeft:
          <View style={{flexDirection: 'row'}}>
            <ImageBackground source={require('../img/fond.png')} style={{ position:"absolute", height: 0.15* wp('94%') ,width:wp('94%'), left: wp("3%"), top:-40}}>
            </ImageBackground>          
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems:"center", marginLeft: 35,  top:-10}}>
                <View style={{marginLeft:30,marginRight:10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('6%')}} onPress={() => {navigation.navigate(global.Referer)}}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:15,marginRight:10}} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground source={require('../img/cercle-moin-grand.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('6%')}} onPress={() => navigation.state.params.deleteAllSelected()}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between', top:-10}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:70,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={{width:wp('25.5%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:8, width:wp('19%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"American Typewriter", fontSize: 22}}>My Selection</Text>
                        <View
                        style={{width:wp('6%'),paddingTop:8, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22}}>{navigation.getParam('ct')}</Text>
                        </View>
                    </View>
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
                <View style={styles.container}>
                    <View style={{marginTop:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{marginLeft: 15,marginBottom:10, marginTop:10, marginRight: 15}}>     
                            <FlatList
                            data={ this.state.FlatListSelected }
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            renderItem={({ item }) => (
                            <View key={item.data.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                        JSON_ListView_Clicked_Item: this.state.count, item: item.data
                                    })}>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                            <View style={{
                                                    backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('12.2%'),marginBottom:2, flexDirection:'row'
                                                }}>
                                                <View style={{paddingTop: 9, marginRight:1}}>
                                                    <ImageBackground source={dm.resolveIconSourceForType(item.data.type)} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                    </ImageBackground>
                                                    <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 18, fontFamily: "Helvetica Neue", fontWeight:'500'}}>
                                                    {item.data.name.length >= 55 ? item.data.name.substring(0,55)+'...':item.data.name}
                                                    </Text>
                                                    <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:16, fontFamily: "Helvetica Neue", fontWeight:'500'}}>
                                                    {item.data.region} {item.data.vintage}
                                                    </Text>
                                                </View>

                            {item.type === 'byglass' ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('75.5%'), position:"absolute"}}>
                                                    <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.1%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                    </ImageBackground>
                                                </View>:null}
                            {item.type === 'price2' ? <View style={styles.glassContainer}>
                                                
                                                    <Text style={styles.glassVolume}>
                                                    7CL
                                                    </Text>
                                                    <ImageBackground source={require('../img/new-glass.png')} style={styles.glassIcon}>
                                                    </ImageBackground>
                                                </View>:null}
                            {item.type === 'price3' ? <View style={styles.glassContainer}>
                                                
                                                <Text style={styles.glassVolume}>
                                                15CL
                                                </Text>
                                                <ImageBackground source={require('../img/new-glass.png')} style={styles.glassIcon}>
                                                </ImageBackground>
                                            </View>:null}
                            {item.type === 'price4' ? <View style={styles.glassContainer}>
                                                
                                                <Text style={styles.glassVolume}>
                                                25CL
                                                </Text>
                                                <ImageBackground source={require('../img/new-glass.png')} style={styles.glassIcon}>
                                                </ImageBackground>
                                            </View>:null}
                            {item.type === 'price1' ? <View style={styles.glassContainer}>
                                                

                                                <ImageBackground source={require('../img/new-glass.png')} style={styles.glassIcon}>
                                                </ImageBackground>
                                            </View>:null}
                                        </View>
                                            
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('12.2%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                    
                                    <View style={{flexDirection: 'row',height:40, marginTop:10}}>
                                            <Text style={{color:'#FFFFFF', marginLeft:15,marginTop:4, fontSize: 18}}>
                                                {this.getPrice(item)}
                                            </Text>
                                            <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                            </ImageBackground>
                                    </View>

                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('18%'),height:wp('8.5%'),paddingRight:wp('6.5%'),paddingTop:10}}>
                        
                                            
                                        {this.onPressMoinPlus2(item.id,item.type)}
                                                { this.getSelected(item.id,item.type) != undefined ?
                                                <Text 
                                                    style={[styles.countText]}>
                                                {this.getSelected(item.id,item.type).count}
                                                </Text>: null}
                                        {this.onPressMoinPlus(item.id,item.type)}
                                        

                                        </View>

                                    </View>
                                </View>
                            </View>
                        )}
                        />
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
        width:wp('97%'),
        marginLeft:wp('1.5%'),
    },
    countText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: -3
    },
    glassVolume:{
        color:'#f1592a',
        textAlign:"right",
        marginTop: 26,
        fontSize: 18,
        width:50 
    },
    glassIcon:{
        height: hp('3.2%'), 
        width:wp('2%'),
        marginLeft:wp('1%'),
        marginTop: 12,
        resizeMode: 'contain'
          },
    glassContainer: {
        flexDirection:'row',
        marginTop:46,
        marginLeft:wp('69.5%'),
        position:"absolute"
    }
    
  });

