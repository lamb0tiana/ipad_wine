import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PlusMoins from './PlusMoins';
import DataManager  from './DataManager';


let dm = DataManager.getInstance();
    
let _ = require('lodash')
export default class Wineflatlist extends Component {

    constructor(props) {
        super(props)
        this.state={
            count:0
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.count != nextProps.count)
            {
                this.setState({
                    count: this.state.count + 1
                });
            }             
 }  


    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />
        );
    };

    refresh = () => {
         console.log('refreshing in wine flat list');
         this.state.count = this.state.count + 1;
        this.setState({count: this.state.count +1}, () => {
          console.log('refresh count = '+this.state.count+' this refresh '+this.state.refreshMe)
        });
    }

  


    recordLayout(y){
        this.props.infoLayout(this.props.type, this.props.country, y);
    }

    renderItem =  ({ item }) => (
        <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:8}}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail', {
                            JSON_ListView_Clicked_Item: this.state.count, item: item, onGoBack: () => this.refresh()
                        })}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{
                                backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('11%'),marginBottom:2, flexDirection:'row'
                            }}>
                            <View style={{paddingTop: 9, marginRight:1}}>

                            <ImageBackground source={dm.resolveIconSourceForType(item.type)} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                    </ImageBackground>

                                <Text style={{color:'#f1592a',paddingLeft: 10,paddingTop: 10,fontSize: 18, fontFamily: "Arial"}}>
                                {item.name.length >= 55 ? item.name.substring(0,55)+'...':item.name}
                                </Text>
                                <Text style={{color:'#ffffff',paddingLeft: 10,paddingTop: 7, fontSize:16, fontFamily: "Arial"}}>
                                {dm.regionById(item.region_id)} {item.vintage}
                                </Text>
                              
                            </View>

        {item.best == 1 ?<View style={{paddingLeft:wp('72.2%'),  marginTop:-2, marginRight:1, position:"absolute"}}>
                                <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                </ImageBackground>
                            </View>:null}
        {item.promotion == 1 ?<View style={{paddingTop: 9, paddingLeft:wp('76.8%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                </ImageBackground>
                            </View>:null}
        {item.byglass == 1 ? <View style={{flexDirection:'row', marginTop:30, marginLeft:wp('52%'), position:"absolute"}}>
                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1%'),marginLeft:1, marginTop: 36, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 29, fontSize: 18}}>
                                    :
                                </Text>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {item.price1}
                                </Text>
                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 30, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {item.price2}
                                </Text>
                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.7%'), width:wp('1.8%'),marginLeft:1,marginRight:10, marginTop: 24, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {item.price3}
                                </Text>
                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.1%'), width:wp('1.8%'),marginLeft:1, marginTop: 20, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {item.price4}
                                </Text>
                                <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.6%'), width:wp('2.8%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                </ImageBackground>
                            </View>:null}
                        </View>
                        
                    </View>
                </TouchableOpacity>
                <View style={{backgroundColor:'#1c1c1c',width:wp('20%'),height:wp('11%'),marginLeft:5, marginBottom:4,marginRight: 10}}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('8%'),height:wp('7%')}}>

                    <PlusMoins id={item.id} computeSelectionCount = {this.props.computeSelectionCount} refresh={this.state.count}>                                                    </PlusMoins>

                    </View>
                    <View style={{flexDirection: 'row',height:45, marginTop:-5,justifyContent: 'space-between',width:wp('20%'),paddingLeft:wp('1%'),paddingRight:wp('1%')}}>
                    <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.5%'), width:wp('2.5%'),marginLeft:2,marginTop:-7,marginRight:0 ,resizeMode: 'contain'}}>
                        </ImageBackground>
                        
                        <Text style={{color:'#FFFFFF', marginLeft:-7,marginTop:4, fontSize: 17}}>
                            {item.price}
                        </Text>
                        <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1.4%'), width:wp('1%'),marginTop: 8,marginRight:60,resizeMode: 'contain'}}>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </View>
    )



    render() {
        return (
                    
                <View style={{marginTop: 15}} onLayout = {(e) => this.recordLayout(e.nativeEvent.layout.y)}>
                {this.props.data && this.props.data.length > 0 ?
                    <View
                        style={{
                            marginBottom: 20,
                            flex: 1,
                        }}>
                        <Text style={{color:'#808080',marginTop:15, fontSize: 44,fontFamily:"American Typewriter"}}>
                            {this.props.data ? this.props.country : null}
                        </Text>
                    </View>
                    :null}
                {this.props.data ?
                    <View>
                        <OptimizedFlatList
                        data={this.props.data}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        extraData = {this.state.count}
                        renderItem={this.renderItem} 
                    />
                </View>
                : null}
                </View>

        )
        }

}
