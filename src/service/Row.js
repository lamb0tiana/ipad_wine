import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from 'react-native';
import PlusMoins from './PlusMoins';
import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DataManager  from './DataManager';


let dm = DataManager.getInstance();
export default class Row extends Component {

    constructor(props) {
        super(props);//w =1004, h =181
        this.plusMoinsRef = null;

        this.dm = DataManager.getInstance();

    }

componentDidMount() {
    if(this.plusMoinsRef){
            this.dm._addPlusMoinsRef(this.props.item.id,this.plusMoinsRef);
    }
}

     

setScrollViewRef = (element) => {
    this.plusMoinsRef = element;
};

    render() {
        return (
    <View style={styles.container}>
        <View key={this.props.item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, paddingTop:8}} onLayout={this.onLayout}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WineDetail',{item:this.props.item})}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{
                                backgroundColor:'#1c1c1c',width:wp('80%'),height:wp('11%'),marginBottom:2, flexDirection:'row'
                            }}>
                            <View style={{paddingTop: 9, marginRight:1}}>

                            <ImageBackground source={dm.resolveIconSourceForType(this.props.item.type)} style={{ position: 'absolute', height: hp('2.8%'),width:wp('3%'),resizeMode: 'contain'}}>
                                                    </ImageBackground>

                                <Text style={{color:'#f1592a',paddingLeft: 10,paddingTop: 10,fontSize: 18, fontFamily: "Helvetica Neue", fontWeight:'500'}}>
                                {this.props.item.name.length >= 55 ? this.props.item.name.substring(0,55)+'...':this.props.item.name}
                                </Text>
                                <View style={{flexDirection:'row', justifyContent: 'space-between', width: wp('80%')}}>
                                    <Text style={{color:'#ffffff',paddingLeft: 10,paddingTop: 7, fontSize:16, fontFamily: "Helvetica Neue", fontWeight:'500'}}>
                                    {this.props.item.topRegion == '' ||  this.props.item.topRegion ==  this.props.item.region ? '' : this.props.item.topRegion+', '} {this.props.item.region} {this.props.item.vintage}
                                    </Text>
                                    {this.props.item.promotion == 1 && this.props.view == 'half' ?
                                    <Text style={{color:'#f1592a',paddingLeft: 10,paddingTop: 7, fontSize:16, fontFamily: "Helvetica Neue", fontWeight:'500'}}>
                                    {this.props.item.price} ¥ (Original Price) 
                                    </Text>
                                    :null}
                                </View>
                              
                            </View>

        {this.props.item.best == 1 ?<View style={{paddingLeft:wp('72.2%'),  marginTop:-2, marginRight:1, position:"absolute", marginLeft:13}}>
                                <ImageBackground source={require('../img/icon-like.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:5, marginTop: 15, resizeMode: 'contain'}}>
                                </ImageBackground>
                            </View>:null}
        {this.props.item.promotion == 1 ?<View style={{paddingTop: 9, paddingLeft:wp('76.8%'), marginTop:-10 ,marginRight:1, position:"absolute"}}>
                                <ImageBackground source={require('../img/icon-etoil.png')} style={{height: hp('2.3%'), width:wp('3%'),marginLeft:1, marginTop: 15, resizeMode: 'contain'}}>
                                </ImageBackground>
                            </View>:null}
        {this.props.item.byglass == 1 && this.props.view != 'half' ? <View style={{flexDirection:'row', marginTop:30, marginLeft:wp('52%'), position:"absolute"}}>
                                <ImageBackground source={require('../img/icon-rmb.png')} style={{height: hp('1%'), width:wp('1%'),marginLeft:1, marginTop: 36, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', marginLeft:1, marginTop: 29, fontSize: 18}}>
                                    :
                                </Text>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {this.props.item.price1}
                                </Text>
                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('1.9%'), width:wp('2%'),marginLeft:1, marginTop: 30, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {this.props.item.price2}
                                </Text>
                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('2.7%'), width:wp('1.8%'),marginLeft:1,marginRight:10, marginTop: 24, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {this.props.item.price3}
                                </Text>
                                <ImageBackground source={require('../img/new-glass.png')} style={{height: hp('3.1%'), width:wp('1.8%'),marginLeft:1, marginTop: 20, resizeMode: 'contain'}}>
                                </ImageBackground>
                                <Text style={{color:'#FFFFFF', textAlign:"right", marginTop: 31, fontSize: 16, width:30}}>
                                {this.props.item.price4}
                                </Text>
                                <ImageBackground source={require('../img/icon-caraf.png')} style={{height: hp('3.6%'), width:wp('2.8%'),marginLeft:1, marginTop: 12, resizeMode: 'contain'}}>
                                </ImageBackground>
                            </View>:null}
                        </View>
                        
                    </View>
                </TouchableOpacity>
                <View style={{backgroundColor:'#1c1c1c',width:wp('16%'),height:wp('11%'),marginLeft:5, marginBottom:4,marginRight: 8, paddingLeft:10}}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('8%'),height:wp('7%')}}>

                    <PlusMoins id={this.props.item.id} ref={this.setScrollViewRef}
                    computeSelectionCount = {this.props.updateCount} refresh={this.props.item.id}>                                                    </PlusMoins>

                    </View>
                    <View style={{flexDirection: 'row',height:45, marginTop:-5,justifyContent: 'space-between',width:wp('20%'),paddingLeft:wp('1%'),paddingRight:wp('1%')}}>
                  {this.props.item.byglass == 1 && this.props.item.promotion == 0 ?
                    <ImageBackground source={require('../img/icon-bouteil.png')} style={{height: hp('3.5%'), width:wp('2.5%'),marginLeft:0,
                    marginRight:6,marginTop:-7,marginRight:0 ,resizeMode: 'contain'}}>
                        </ImageBackground>
                   :
                    <View style={{height: hp('3.5%'), width:wp('2.5%'),marginLeft:2,marginTop:-7,marginRight:0 ,backgroundColor:'#1c1c1c'}}>
                        </View>
                  }
                        
                        <Text style={{color:dm.halfColor(this.props.item.promotion, this.props.view), marginLeft:0,marginTop:4, fontSize: 17,
                             fontWeight:dm.halfWeight(this.props.item.promotion, this.props.view)}}>
                            {dm.ishalfof(this.props.item.price, this.props.item.promotion, this.props.view)+' ¥'}
                        </Text>
                        <View style={{backgroundColor:'#1c1c1c', height: hp('1.4%'), width:wp('1%'),marginTop: 8,marginRight:60,resizeMode: 'contain'}}>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>                       
        );
    }



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('97%'),
        marginLeft:wp('1.5%'),
    }});