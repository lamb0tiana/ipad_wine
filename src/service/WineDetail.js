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
    import DataManager from './DataManager';
import { NavigationEvents } from 'react-navigation';


export default class WineDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
            label:"",
            DataWineDetail: '',
            mySelectionCount: 0,
            grape:''
        };

        this.firstFocus = true;
        
        this.item = this.props.navigation.state.params.item;

        this.dm = DataManager.getInstance();

        this.computeSelectionCount();

        this.onFocus = this.onFocus.bind(this);
        

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
        });
    }

    refresh = () => {
       this.setState({count: this.state.count +1}, () => {
            
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
                 <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.9%'),width:wp('2.5%'), marginLeft: 10, marginTop: 20}}>
                 </ImageBackground>
             </TouchableOpacity>
         }
         else return <TouchableOpacity  onPress={this.onPressPlus.bind(this, id, type)}>
             <ImageBackground source={require('../img/circle-plus.png')} style={{ height: hp('1.9%'),width:wp('2.5%'), marginLeft: 20, marginTop: 20}}>
             </ImageBackground>
         </TouchableOpacity>;
     }
 
     onPressMoinPlus2 = (id, type="byglass") => {
         var sel = this.getSelected(id,type);
         if (sel && sel.count>0) {
             return <TouchableOpacity onPress={this.onPressMoin.bind(this, id,type)}>
                 <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2%'),width:wp('2.6%'), marginLeft: 10, marginTop: 20}}>
                 </ImageBackground>
             </TouchableOpacity>
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
                    <TouchableOpacity style={{ height: hp('6%')}} onPress={() => {navigation.navigate(global.Referer)}}>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            </View>,
        headerRight:
         <View style={{flexDirection: 'row' , alignItems:"center",flexDirection: 'row',justifyContent: 'space-between', top:-10}}>
            <View style={{backgroundColor:'#c3c3c4',marginRight:70,padding:2,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => navigation.navigate('Selectlist')}>
                    <View style={{width:wp('25.5%'),flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{height:wp('5%'), paddingTop:8, width:wp('19%'),textAlign: 'center',color:'#fff',marginRight:3,backgroundColor:'#54b84a',padding:4,fontFamily:"American Typewriter", fontSize: 22}}>My Selection</Text>
                        <View
                        style={{width:wp('6%'),paddingTop:10, backgroundColor:'#f1592a',color:'#fff'}}
                    >
                        <Text style={{fontWeight: "bold", color:'#fff',textAlign: 'center', fontSize: 22, marginTop: -3}}>{navigation.getParam('ct') == null ? this.sel : navigation.getParam('ct')}</Text>
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
    
    onFocus(){
        
        if(!this.firstFocus){
            var sel = global.Selected.reduce(function(a,r){
                return a+ r.count;
                }, 0);
    
            this.props.navigation.setParams({
                ct: sel
            });           
        }

        this.firstFocus = false;
    }


    render() {


        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{backgroundColor:'black',width:wp('100%') }}>
                <NavigationEvents  onDidFocus={this.onFocus} />
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
                        <Text style={{color:'#ffffff',fontSize: 35, fontFamily:"American Typewriter", marginBottom: hp("2%")}}>
                            {this.item.name}
                        </Text>

                        <ImageBackground source={require('../img/point-line-long.png')} style={{ height: 15}}>
                            </ImageBackground>

                    </View>
                    <View style={styles.row}>
                        <View style={styles.border_one}>
                            <ImageBackground source={this.dm.getImageSource(this.item.path)} style={{ height: (wp('43.16%') - 13)/ 0.71, width: wp('43.16%')-16}}>
                            </ImageBackground>
                            {this.item.promotion ==1 ?<ImageBackground source={require('../img/icon-star.png')} style={{ height: 1.07* wp('6%'), width: wp('6%') , position:"absolute", bottom:-7, right:-wp('6%')-4 }}>
                            </ImageBackground>:null}
                           
                        </View>
                        <View style={styles.border_two}>
                            
                                <View style={{ flexDirection: 'row'}}>
                                    <View style={{ borderWidth: 4, borderColor:'#808080',backgroundColor:'#ed4622', width: wp('17.1875%'), height: 0.46*wp('17.1875%'),
                                    justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color:'#ffffff',padding: 4, fontSize: 36 }}>{this.item.vintage}</Text>
                                    </View>
                                    
                                    
                                    {this.item.type =='CHAMPAGNE' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-champagn.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 16, fontFamily: "Arial", color:'#ffffff',padding:4, paddingTop: 7}}>CHAMPAGNE</Text>
                                    </View>:null
                                    }
                                    {this.item.type =='WHITE' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-white.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 18, fontFamily: "Arial", color:'#ffffff',padding:4, paddingTop: 7}}>WHITE</Text>
                                    </View>:null
                                    }
                                    {this.item.type =='RED' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-red.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 18, fontFamily: "Arial", color:'#ffffff',padding:4, paddingTop: 7}}>RED</Text>
                                    </View>:null
                                    }
                                    {this.item.type =='ROSE' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-rose.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 18, fontFamily: "Arial", color:'#ffffff',padding:4, paddingTop: 7}}>ROSE</Text>
                                    </View>:null
                                    }
                                    {this.item.type =='SWEET' ?<View style={{ borderWidth: 4, borderColor:'#808080', marginLeft:wp('1%'), backgroundColor:'black', width: wp('17.1875%'), 
                                    height: 0.46*wp('17.1875%'), justifyContent: 'center', alignItems: 'center'}}>
                                    <ImageBackground source={require('../img/cone-sweet.png')} style={{ position:'absolute', height: 47, width: 47, top:0, left:0}}>
                                    </ImageBackground>                                   
                                        <Text style={{ fontSize: 24, fontFamily: "Arial", color:'#ffffff',padding:4, paddingTop: 7}}>SWEET</Text>
                                    </View>:null
                                    }
                                    <View style={{ width:wp('20%'), flex:1,flexDirection:"row"}}>

                                            {this.onPressMoinPlus2(this.item.id)}
                                                  { this.getSelected(this.item.id) != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.item.id).count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.item.id)}
                    
                                    </View>
                                </View>
                                {this.item.byglass == 1 ? <View style={{marginTop:6,flexDirection: 'row' }}>
                                    <View style={{ borderWidth: 4, borderColor:'#808080',marginRight: wp("1%"), backgroundColor:'#ed4622',paddingRight:0, 
                                    width: wp("8,34375%"), height:  0.64*wp("8,34375%"),  justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ color:'#ffffff',padding: 5, fontSize: 19}}>{this.item.alcohol == null ? this.item.alcohol : 'N/A'}</Text>
                                    </View>
                                    <View style={{ borderWidth: 4, borderColor:'#808080', backgroundColor:'#ed4622', width: wp("8,34375%"),height:  0.64*wp("8,34375%"),
                                     justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ color:'#ffffff',padding: 5, fontSize: 19}}>{this.item.volume}</Text>
                                    </View>
                                    <View style={{ borderWidth: 4, borderColor:'#808080', marginLeft: 12, backgroundColor:'#4d4e4e',
                                    justifyContent: 'center', alignItems: 'center', height:  0.64*wp("8,34375%"), width: wp('17.1875%')}}>
                                        <Text style={{ color:'#ffffff',padding: 5, fontSize: 20}}>RMB {this.item.price}</Text>
                                    </View>
                                </View>:null}
                                {this.item.byglass==1? <View>
                                    <View style={{marginTop: wp('1.82%')}}>
                                        <Text style={{color:'#ffffff', fontSize: 29, fontFamily: "American Typewriter"}}>
                                        {this.item.country}
                                        </Text>
                                        <Text style={styles.descVine}>
                                        {this.item.topRegion+' '+this.item.region}
                                        </Text>
                                    </View>
                                    <View style={{marginTop:wp('4,9%'), marginBottom: wp('1%') }}>
                                        <Text style={{color:'#ffffff', fontSize: 29, fontFamily: "Arial"}}>
                                            GRAPES
                                        </Text>
                                        <Text style={styles.descVine}>
                                        {this.item.grape}
                                        </Text>
                                    </View>
                                </View>
                                :<View>  
                                    <View style={{marginTop: wp('1.82%')}}>
                                        <Text style={{color:'#ffffff', fontSize: 29, fontFamily: "American Typewriter"}}>
                                            {this.item.country}
                                        </Text>
                                        <Text style={styles.descVineGrand}>
                                        {this.item.topRegion+' '+this.item.region}
                                        </Text>
                                    </View>
                                    <View style={{marginTop:wp('6%'), marginBottom: wp('1%') }}>
                                        <Text style={{color:'#ffffff', fontSize: 31, fontFamily: "Arial", marginTop:15}}>
                                            GRAPES
                                        </Text>
                                        <Text style={styles.descVineGrand}>
                                        {this.item.grape}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: wp('47%'), marginTop:wp('10%') }}>
                                        <View style={{ borderWidth: 4, borderColor:'#808080',marginRight: wp("1%"), backgroundColor:'#ed4622',paddingRight:0, 
                                        width: wp("12%"), height:  0.4*wp("17.1875%"),  justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{ color:'#ffffff',padding: 5, fontSize: 27}}>{this.item.alcohol == null ? this.item.alcohol : 'N/A'}</Text>
                                        </View>
                                        <View style={{ borderWidth: 4, borderColor:'#808080', backgroundColor:'#ed4622', width: wp("12"),height:  0.4*wp("17.1875%"),
                                            justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{ color:'#ffffff',padding: 5, fontSize: 27}}>{this.item.volume}</Text>
                                        </View>
                                        <View style={{ borderWidth: 4, borderColor:'#808080', marginLeft: 12, backgroundColor:'#4d4e4e',
                                        justifyContent: 'center', alignItems: 'center', height:  0.4*wp("17.1875%"), width: wp('22%')}}>
                                            <Text style={{ color:'#ffffff',padding: 5, fontSize: 26}}>RMB {this.item.price}</Text>
                                        </View>
                                    </View>
                                </View>}                                
                                {this.item.byglass == 0 ? null:
                                <View>
                                    <ImageBackground source={require('../img/point-line-long.png')} style={{ height: 15, marginTop: hp('1.86%'), width:wp('47%') }}>
                                    </ImageBackground>

                                    <View style={{height:hp('3%'),paddingTop:0,flexDirection: 'row'}}>
                                        <ImageBackground source={require('../img/new-glass.png')} style={{ height: 2.13*wp('1.89%'), width: wp('1.89%'), marginRight: 5}}>
                                        </ImageBackground>
                                        <Text style={{marginLeft:2,paddingTop:3, color:'#ee4922',fontSize: 23, fontFamily:"AvenirNext-Regular"}}>
                                            BY GLASS
                                        </Text>
                                    </View>


                                    <View style = {{flexDirection: "row", width:wp('47%'), justifyContent: "space-between"}}>
                                    {this.item.price1 == 0 ? <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 18,fontFamily:"AvenirNext-Regular", marginRight: wp("3%")}}>
                                            </Text>
                                        </View>: <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 14,fontFamily:"AvenirNext-Regular", marginRight: 2, marginTop: 20}}>
                                                {this.item.price1}RMB 
                                            </Text>




                                            {this.onPressMoinPlus2(this.item.id,'price1')}
                                                  { this.getSelected(this.item.id,'price1') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.item.id,'price1').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.item.id,'price1')}



                                            

                                        </View>}
                                    {this.item.price3 == 0 ? <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 18,fontFamily:"AvenirNext-Regular", marginRight: wp("3%")}}>
                                            </Text>                                      
                                        </View>: <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 15,fontFamily:"AvenirNext-Regular", marginRight: 2, marginTop: 22}}>
                                                15CL/{this.item.price3}RMB 
                                            </Text>


                                            {this.onPressMoinPlus2(this.item.id,'price3')}
                                                  { this.getSelected(this.item.id,'price3') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.item.id,'price3').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.item.id,'price3')}








                                        </View>}
                                    </View>



                                    <View style = {{flexDirection: "row", width:wp('47%'), justifyContent: "space-between"}}>
                                    {this.item.price2 == 0 ? <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 18,fontFamily:"AvenirNext-Regular", marginRight: wp("3%")}}>
                                            </Text>
                                        </View>: <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 14,fontFamily:"AvenirNext-Regular", marginRight: 2,marginLeft:24, marginTop: 20}}>
                                                7CL/{this.item.price2}RMB 
                                            </Text>




                                            {this.onPressMoinPlus2(this.item.id,'price2')}
                                                  { this.getSelected(this.item.id,'price2') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.item.id,'price2').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.item.id,'price2')}



                                            

                                        </View>}
                                    {this.item.price4 == 0 ? <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 18,fontFamily:"AvenirNext-Regular", marginRight: wp("3%")}}>
                                            </Text>                                      
                                        </View>: <View style = {{flexDirection: "row", alignItems:"center"}}>
                                            <Text style={{marginLeft:2, color:'#ffffff',fontStyle:"italic", fontSize: 15,fontFamily:"AvenirNext-Regular", marginRight: 2, marginTop: 22}}>
                                                25CL/{this.item.price4}RMB 
                                            </Text>


                                            {this.onPressMoinPlus2(this.item.id,'price4')}
                                                  { this.getSelected(this.item.id,'price4') != undefined ?
                                                    <Text 
                                                        style={[styles.countText]}>
                                                    {this.getSelected(this.item.id,'price4').count}
                                                  </Text>: null}
                                            {this.onPressMoinPlus(this.item.id,'price4')}








                                        </View>}
                                    </View>



                                </View>}
                            </View>
                        </View>
                        <View style={{marginTop:hp('1%')}}>
                            <Text style={{color:'#f1592a', fontFamily: "American Typewriter", fontSize:30, marginBottom: 5}}>
                                DESCRIPTION
                            </Text>
                            <Text style={{ color:'#ffffff', fontFamily: "Arial",fontSize: 18, textAlign:'auto', lineHeight: 20}}>
                            {this.item.info}
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
        paddingLeft:10,
        fontSize: 17,
        marginTop: 18,
        borderColor:'red'
    },
    descVine: {
        color:'#bbbebf', 
        fontSize: 23, 
        fontFamily:"AvenirNext-Regular"
    },
    descVineGrand: {
        color:'#bbbebf', 
        fontSize: 25, 
        fontFamily:"AvenirNext-Regular"
    },
    centerVerHor: {
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    }

});
