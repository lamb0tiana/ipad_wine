import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView
} from 'react-native';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

    let SQLite = require('react-native-sqlite-storage')
    let db = SQLite.openDatabase({name:'mmb_ipad.db', createFromLocation:'~/database/mmb_ipad.db'})
export default class WineDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
            label:"",
            count: this.props.navigation.state.params.JSON_ListView_Clicked_Item,
            id: this.props.navigation.state.params.JSON_Id_Clicked_Item,
            DataWineDetail: '',
            mySelectionCount: 0,
            count:0
        };
        this.computeSelectionCount();
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM ipad_wines WHERE id = ?', [this.state.id], (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
                this.setState({
                    DataWineDetail: results.rows.item(0),
                });
            } else {
                this.setState({
                    DataWineDetail: '',
                });
                console.log('wine data', DataWineDetail)
            }
            }
        );
        });
    }

    getSelected(id, type="byglass"){
        return global.Selected.filter(el => (el.id == id && el.type == type))[0];
    }

    componentDidMount() {
        var sel = global.Selected.reduce(function(a,r){
            return a+ r.count;
            }, 0);

        this.props.navigation.setParams({
            handleThis: this.refreshHandler,
            ct: sel,
            refresh: this.props.navigation ? this.props.navigation.state.params.onGoBack : this.refresh
        });
    }

    refresh = () => {
        console.log('refreshing wine detail ');
       this.setState({count: this.state.count +1}, () => {
            console.log('refresh count = '+this.state.count+' this refresh ')
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
                 <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.9%'),width:wp('2.5%'), marginLeft: 25}}>
                 </ImageBackground>
             </TouchableOpacity>
         }
         else return <TouchableOpacity  onPress={this.onPressPlus.bind(this, id, type)}>
             <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.9%'),width:wp('2.5%'), marginLeft: 65}}>
             </ImageBackground>
         </TouchableOpacity>;
     }
 
     onPressMoinPlus2 = (id, type="byglass") => {
         var sel = this.getSelected(id,type);
         if (sel && sel.count>0) {
             return <TouchableOpacity onPress={this.onPressMoin.bind(this, id,type)}>
                 <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2%'),width:wp('2.6%'), marginLeft: 25}}>
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
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:70,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => navigation.navigate('Selectlist', {onGoBack: () => navigation.state.params.refresh()}) }>
                    <View style={{width:wp('23%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height:wp('5%'), paddingTop:10, width:wp('17.5%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#009343',padding:4,fontFamily:"american-typewriter", fontSize: 22}}>My Selection</Text>
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

    plus_onPressButton(){

        this.setState({
           isHidden:true,
       })
    }
    
    render() {


        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%') }}>
                <View style={styles.container}>
                    <View
                        style={{
                            marginTop:20,
                            marginBottom: 20,
                            marginLeft:5,
                            marginRight:10,
                            flex: 1,
                        }}
                    >
                        <Text style={{color:'#ffffff',fontSize: 40, fontFamily:"american-typewriter", marginBottom: hp("2%")}}>
                            {this.state.DataWineDetail.name}
                        </Text>

                        <ImageBackground source={require('../img/point-line-long.png')} style={{ height: 15}}>
                            </ImageBackground>

                    </View>
                    <View style={styles.row}>
                        <View style={styles.border_one}>
                            <ImageBackground source={require('../gallery/1002.jpg')} style={{ height: (wp('43.16%') - 13)/ 0.71, width: wp('43.16%')-16}}>
                            </ImageBackground>
                            {this.state.DataWineDetail.promotion ===1 ?<ImageBackground source={require('../img/icon-star.png')} style={{ height: 1.07* wp('6%'), width: wp('6%') , position:"absolute", bottom:-7, right:-wp('6%')-4 }}>
                            </ImageBackground>:null}
                           
                        </View>
                        <View style={styles.border_two}>
                            
                                <View style={{ flexDirection: 'row'}}>
                                    <View style={{ borderWidth: 4, borderColor:'#808080',backgroundColor:'#ed4622', width: wp('17.1875%'), height: 0.46*wp('17.1875%'),
                                    justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color:'#ffffff',padding: 4, fontSize: 44 }}>{this.state.DataWineDetail.vintage}</Text>
                                    </View>
                                    
                                    
                                    {this.state.DataWineDetail.type ==='CHAMPAGNE' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-champagn.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 24, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", color:'#ffffff',padding:4, paddingTop: 7}}>CHAMPAGNE</Text>
                                    </View>:null
                                    }
                                    {this.state.DataWineDetail.type ==='WHITE' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-white.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 24, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", color:'#ffffff',padding:4, paddingTop: 7}}>WHITE</Text>
                                    </View>:null
                                    }
                                    {this.state.DataWineDetail.type ==='RED' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-red.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 24, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", color:'#ffffff',padding:4, paddingTop: 7}}>RED</Text>
                                    </View>:null
                                    }
                                    {this.state.DataWineDetail.type ==='ROSE' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-rose.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 24, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", color:'#ffffff',padding:4, paddingTop: 7}}>ROSE</Text>
                                    </View>:null
                                    }
                                    {this.state.DataWineDetail.type ==='SWEET' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-sweet.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 24, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", color:'#ffffff',padding:4, paddingTop: 7}}>SWEET</Text>
                                    </View>:null
                                    }
                                    <View style={{ width:wp('20%'), flex:1,flexDirection:"row"}}>

                                            {this.onPressMoinPlus2(this.state.id)}
                                                  { this.getSelected(this.state.id) != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.state.id).count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.state.id)}
                    
                                    </View>
                                </View>
                                {this.state.DataWineDetail.byglass === 1 ? <View style={{marginTop:6,flexDirection: 'row' }}>
                                    <View style={{ borderWidth: 4, borderColor:'#808080',marginRight: wp("1%"), backgroundColor:'#ed4622',paddingRight:0, 
                                    width: wp("8,34375%"), height:  0.64*wp("8,34375%"),  justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ color:'#ffffff',padding: 5, fontSize: 22}}>14,5%</Text>
                                    </View>
                                    <View style={{ borderWidth: 4, borderColor:'#808080', backgroundColor:'#ed4622', width: wp("8,34375%"),height:  0.64*wp("8,34375%"),
                                     justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ color:'#ffffff',padding: 5, fontSize: 22}}>0.75L</Text>
                                    </View>
                                    <View style={{ borderWidth: 4, borderColor:'#808080', marginLeft: 12, backgroundColor:'#4d4e4e',
                                    justifyContent: 'center', alignItems: 'center', height:  0.64*wp("8,34375%"), width: wp('17.1875%')}}>
                                        <Text style={{ color:'#ffffff',padding: 5, fontSize: 29}}>RMB 1630</Text>
                                    </View>
                                </View>:null}
                                {this.state.DataWineDetail.byglass===1? <View>
                                    <View style={{marginTop: wp('1.82%')}}>
                                        <Text style={{color:'#ffffff', fontSize: 29, fontFamily: "american-typewriter"}}>
                                            France
                                        </Text>
                                        <Text style={styles.descVine}>
                                            Reims, Champagne
                                        </Text>
                                    </View>
                                    <View style={{marginTop:wp('4,9%'), marginBottom: wp('1%') }}>
                                        <Text style={{color:'#ffffff', fontSize: 29, fontFamily: "Nimbus-Sans-D-OT-Bold_32747"}}>
                                            GRAPES
                                        </Text>
                                        <Text style={styles.descVine}>
                                            Chardonnay, Pinot Noir
                                        </Text>
                                    </View>
                                </View>
                                :<View>  
                                    <View style={{marginTop: wp('1.82%')}}>
                                        <Text style={{color:'#ffffff', fontSize: 29, fontFamily: "american-typewriter"}}>
                                            France
                                        </Text>
                                        <Text style={styles.descVineGrand}>
                                            Reims, Champagne {this.state.DataWineDetail.name}
                                        </Text>
                                    </View>
                                    <View style={{marginTop:wp('6%'), marginBottom: wp('1%') }}>
                                        <Text style={{color:'#ffffff', fontSize: 31, fontFamily: "Nimbus-Sans-D-OT-Bold_32747", marginTop:15}}>
                                            GRAPES
                                        </Text>
                                        <Text style={styles.descVineGrand}>
                                            Chardonnay, Pinot Noir
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: wp('47%'), marginTop:wp('10%') }}>
                                        <View style={{ borderWidth: 4, borderColor:'#808080',marginRight: wp("1%"), backgroundColor:'#ed4622',paddingRight:0, 
                                        width: wp("12%"), height:  0.4*wp("17.1875%"),  justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{ color:'#ffffff',padding: 5, fontSize: 27}}>{this.state.DataWineDetail.alcohol === null ? this.state.DataWineDetail.alcohol : 'N/A'}</Text>
                                        </View>
                                        <View style={{ borderWidth: 4, borderColor:'#808080', backgroundColor:'#ed4622', width: wp("12"),height:  0.4*wp("17.1875%"),
                                            justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{ color:'#ffffff',padding: 5, fontSize: 27}}>{this.state.DataWineDetail.volume}</Text>
                                        </View>
                                        <View style={{ borderWidth: 4, borderColor:'#808080', marginLeft: 12, backgroundColor:'#4d4e4e',
                                        justifyContent: 'center', alignItems: 'center', height:  0.4*wp("17.1875%"), width: wp('22%')}}>
                                            <Text style={{ color:'#ffffff',padding: 5, fontSize: 30}}>RMB {this.state.DataWineDetail.price}</Text>
                                        </View>
                                    </View>
                                </View>}                                
                                {this.state.DataWineDetail.byglass === 0 ? null:
                                <View>
                                    <ImageBackground source={require('../img/point-line-long.png')} style={{ height: 15, marginTop: hp('1.86%'), width:wp('47%') }}>
                                    </ImageBackground>

                                    <View style={{height:hp('3%'),paddingTop:0,flexDirection: 'row'}}>
                                        <ImageBackground source={require('../img/new-glass.png')} style={{ height: 2.13*wp('1.89%'), width: wp('1.89%'), marginRight: 5}}>
                                        </ImageBackground>
                                        <Text style={{marginLeft:2,paddingTop:3, color:'#ee4922',fontSize: 23, fontFamily:"AvrileSans-Regular"}}>
                                            BY GLASS
                                        </Text>
                                    </View>

                                    {this.state.DataWineDetail.price2 === 0 ? <View style={{flexDirection: 'row',height:hp('3,5%'), width:wp('47%'), justifyContent:"flex-end", alignItems:"center", marginBottom: 15}}>
                                        <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 20,fontFamily:"AvrileSans-Regular", marginRight: wp("3%")}}>
                                        </Text>
                                    </View>: <View style={{flexDirection: 'row',height:hp('3,5%'), width:wp('47%'), justifyContent:"flex-end", alignItems:"center", marginBottom: 15}}>
                                        <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 20,fontFamily:"AvrileSans-Regular", marginRight: wp("3%")}}>
                                            15CL/{this.state.DataWineDetail.price2}RMB 
                                        </Text>




                                            {this.onPressMoinPlus2(this.state.id,'price2')}
                                                  { this.getSelected(this.state.id,'price2') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.state.id,'price2').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.state.id,'price2')}



                                            

                                    </View>}

                                    <View style = {{flexDirection: "row", width:wp('47%'), justifyContent: "space-between"}}>
                                    {this.state.DataWineDetail.price1 === 0 ? <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 20,fontFamily:"AvrileSans-Regular", marginRight: wp("3%")}}>
                                            </Text>
                                        </View>: <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 20,fontFamily:"AvrileSans-Regular", marginRight: wp("3%")}}>
                                                7CL/{this.state.DataWineDetail.price1}RMB 
                                            </Text>




                                            {this.onPressMoinPlus2(this.state.id,'price1')}
                                                  { this.getSelected(this.state.id,'price1') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.state.id,'price1').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.state.id,'price1')}



                                            

                                        </View>}
                                    {this.state.DataWineDetail.price3 === 0 ? <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 20,fontFamily:"AvrileSans-Regular", marginRight: wp("3%")}}>
                                            </Text>                                      
                                        </View>: <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 20,fontFamily:"AvrileSans-Regular", marginRight: wp("3%")}}>
                                                25CL/{this.state.DataWineDetail.price3}RMB 
                                            </Text>


                                            {this.onPressMoinPlus2(this.state.id,'price3')}
                                                  { this.getSelected(this.state.id,'price3') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.state.id,'price3').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.state.id,'price3')}








                                        </View>}
                                    </View>
                                </View>}
                            </View>
                        </View>
                        <View style={{marginTop:hp('1%')}}>
                            <Text style={{color:'#f1592a', fontFamily: "american-typewriter", fontSize:34, marginBottom: 5}}>
                                DESCRIPTION
                            </Text>
                            <Text style={{ color:'#ffffff', fontFamily: "Nimbus-Sans-D-OT-Bold_32747",fontSize: 23, textAlign:'auto', lineHeight: 29}}>
                            {this.state.DataWineDetail.info}
                            </Text>
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
        width:wp('94%'),
        marginRight: wp("3%"), 
        marginLeft: wp("3%"),
        paddingTop: hp("3,56%")
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    icon: {
        borderWidth:2,
        borderColor:'red',
        width:wp('15%'),
    },
    row: {
        marginTop: hp("3,25%"),
        marginRight:5,
        marginLeft:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    border: {
        width: wp('37%'),
        borderWidth:2,
    },
    border_one: {
        marginRight: wp("2,14%"),
        width: wp('43,16%'),
        height: wp('43,16%') / 0.71,
        borderColor:'#f1592a',
        borderWidth: 7,
        color:'#f1592a',
        marginBottom: hp("2,25%")

    },
    border_two:{
        width: wp('60%'),
        color:'#f1592a',
        marginLeft:5,
        marginRight:20,
        paddingRight:20,
    },
    countText: {
        color: '#ffffff',
        textAlign: 'center',
        paddingLeft:wp('2%'),
        fontSize: 22
    },
    descVine: {
        color:'#bbbebf', 
        fontSize: 23, 
        fontFamily:"AvrileSans-Regular"
    },
    descVineGrand: {
        color:'#bbbebf', 
        fontSize: 25, 
        fontFamily:"AvrileSans-Regular"
    },
    centerVerHor: {
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    }

});
