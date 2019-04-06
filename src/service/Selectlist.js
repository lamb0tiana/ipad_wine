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
    
let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name:'mmb_ipad.db', createFromLocation:'~/database/mmb_ipad.db'})
let _ = require('lodash')
export default class Selectlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mySelectionCount: 0,
            FlatListSelected:[],
            data:{}
        }
        this.computeSelectionCount();

        var ids = global.Selected.reduce(function(a,r){
            if(a == '') {
                  return String(r.id);
            }else{
                  return a + ',' + r.id;
            }
        
        }, '');

        this.deleteAllSelected = this.deleteAllSelected.bind(this);
        

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ipad_wines where id in ('+ ids +')', [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              
              
              //ajouter 

              global.Selected.map(function(selected){
                var c = _.find(temp, o => o.id == selected.id );
                if (c && !selected.data){
                     selected.data =  c;
                }
                });

              this.setState({
                FlatListSelected: global.Selected
              });

            });
          });

    }

    refresh = () => {
        console.log('refreshing');
       this.setState({count: this.state.count +1}, () => {
            console.log('refresh count = '+this.state.count+' this refresh '+this.state.refreshMe)
       });
   }


    componentDidMount() {
        this.computeSelectionCount();
        this.props.navigation.setParams({
            ct: global.SelectionCount,
            refresh: this.props.navigation.state.params.onGoBack,
            deleteAllSelected: this.deleteAllSelected
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
            <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.9%'),width:wp('2.5%'), marginLeft: 15}}>
            </ImageBackground>
        </TouchableOpacity>
    }
    else return <TouchableOpacity  onPress={this.onPressPlus.bind(this, id, type)}>
        <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.9%'),width:wp('2.5%'), marginLeft: 45}}>
        </ImageBackground>
    </TouchableOpacity>;
        }
 
     onPressMoinPlus2 = (id, type="byglass") => {
         var sel = this.getSelected(id,type);
         if (sel && sel.count>0) {
             return <TouchableOpacity onPress={this.onPressMoin.bind(this, id,type)}>
                 <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2%'),width:wp('2.6%'), marginLeft: 10}}>
                 </ImageBackground>
             </TouchableOpacity>
         }
         
     }




    static navigationOptions = ({navigation}) => ({
        headerLeft:
          <View style={{flexDirection: 'row'}}>
            <ImageBackground source={require('../img/fond.png')} style={{ position:"absolute", height: 0.15* wp('94%') ,width:wp('94%'), left: wp("3%"), top:-50}}>
            </ImageBackground>          
            <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems:"center", marginLeft: 35}}>
                <View style={{marginLeft:30,marginRight:10}}>
                    <ImageBackground source={require('../img/retour.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('100%')}} onPress={() => {navigation.state.params.refresh();navigation.goBack()}}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{marginLeft:15,marginRight:10}} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground source={require('../img/cercle-moin-grand.png')} style={{ height: hp('4.2%'),width:wp('5.4%')}}>
                        <TouchableOpacity style={{ height: hp('100%')}} onPress={() => navigation.state.params.deleteAllSelected()}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:70,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={{width:wp('23%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:10, width:wp('17.5%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#009343',padding:4,fontFamily:"american-typewriter", fontSize: 22}}>My Selection</Text>
                        <View
                        style={{width:wp('5%'),paddingTop:10, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22}}>{global.SelectionCount}</Text>
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
                            data={this.state.FlatListSelected}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            renderItem={({ item }) => (
                            <View key={item.data.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                                        JSON_ListView_Clicked_Item: this.state.count, JSON_Id_Clicked_Item: item.data.id, onGoBack: () => this.refresh()
                                    })}>
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                            <View style={{
                                                    backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('10%'),marginBottom:2, flexDirection:'row'
                                                }}>
                                                <View style={{paddingTop: 9, marginRight:1}}>
                                                    <ImageBackground source={require('../img/cone-champagne.png')} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                    </ImageBackground>
                                                    <Text style={{color:'#f1592a',paddingLeft: 16,paddingTop: 14,fontSize: 25, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                    {item.data.name}
                                                    </Text>
                                                    <Text style={{color:'#ffffff',paddingLeft: 16,paddingTop: 8, fontSize:23, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                                    Champagne, {item.data.region}
                                                    </Text>
                                                </View>

                            {item.type === 'byglass' ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('75.5%'), position:"absolute"}}>
                                                    <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.1%'), width:wp('2%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                                    </ImageBackground>
                                                </View>:null}
                            {item.type === 'price1' ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('71.5%'), position:"absolute"}}>
                                                
                                                    <Text style={{color:'#f1592a', textAlign:"right", marginTop: 26, fontSize: 22, width:50}}>
                                                    7CL
                                                    </Text>
                                                    <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:wp('2%'), marginTop: 12, resizeMode: 'contain'}}>
                                                    </ImageBackground>
                                                </View>:null}
                            {item.type === 'price2' ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('71.5%'), position:"absolute"}}>
                                                
                                                <Text style={{color:'#f1592a', textAlign:"right", marginTop: 26, fontSize: 22, width:50}}>
                                                15CL
                                                </Text>
                                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:wp('2%'), marginTop: 12, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>:null}
                            {item.type === 'price3' ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('71.5%'), position:"absolute"}}>
                                                
                                                <Text style={{color:'#f1592a', textAlign:"right", marginTop: 26, fontSize: 22, width:50}}>
                                                25CL
                                                </Text>
                                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:wp('2%'), marginTop: 12, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>:null}
                            {item.type === 'price4' ? <View style={{flexDirection:'row', marginTop:46, marginLeft:wp('71.5%'), position:"absolute"}}>
                                                
                                                <Text style={{color:'#f1592a', textAlign:"right", marginTop: 26, fontSize: 22, width:50}}>
                                                75CL
                                                </Text>
                                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.2%'), width:wp('2%'),marginLeft:wp('2%'), marginTop: 12, resizeMode: 'contain'}}>
                                                </ImageBackground>
                                            </View>:null}
                                        </View>
                                            
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('10%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                                    
                                    <View style={{flexDirection: 'row',height:40, marginTop:10}}>
                                            <Text style={{color:'#FFFFFF', marginLeft:30,marginTop:4, fontSize: 22}}>
                                                {item.data.price}
                                            </Text>
                                            <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.5%'), width:wp('2.4%'),marginLeft:2, marginTop: 8, resizeMode: 'contain'}}>
                                            </ImageBackground>
                                    </View>

                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('6.5%'),paddingTop:10}}>
                        
                                            
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
        marginTop:wp('1%')
    },
    countText: {
        color: '#ffffff',
        textAlign: 'center',
        paddingLeft:wp('1.8%'),
        fontSize: 22
    },
  });

