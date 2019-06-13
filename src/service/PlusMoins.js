import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,

} from 'react-native';
import DataManager  from './DataManager';
let dm = DataManager.getInstance();

import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,} from "react-native-responsive-screen";

    export default class PlusMoins extends Component {
        constructor(props) {
            super(props)
            this.state = {
                count: 0,
                number:0,
                refresh:0
            }
           
            dm._addPlusMoinsRef(this.props.id, this);
            this.init();
        }

        init(){
            var selected = this.getSelected(this.props.id);
            this.state.number = this.props.refresh;
            if(selected){
                this.state.count = selected.count;
            }else{
                this.state.count = 0;
            }
         
            this.props.computeSelectionCount();
        }

        isMounted(){
            return this._mounted;
        }

        componentDidMount() {
            this.selected = this.getSelected(this.props.id);
            this._mounted = true;
        }

        getSelected(id){
            return global.Selected.filter(el => (el.id == id && el.type == 'byglass'))[0];
        }

        onPressMoin = (id) => {
            this.setState({count: this.state.count - 1})
        }


        onPressPlus = (id) => {
            this.setState({count: this.state.count + 1});
         }

         componentWillUnmount() {
            this._mounted = false;
          }

         componentWillReceiveProps(nextProps){
                if(this.props.id != nextProps.id)
                    {
                      
                        this.init();
                    }             
         }   

        onPressMoinView = (id) => {
            if (this.state.count >0) { 
                return <TouchableOpacity onPress={this.onPressMoin.bind(this, id)}>
                    <ImageBackground source={require('../img/circle-moin.png')} style={{ height: hp('2%'),width:wp('2.6%'), marginLeft: 13}}>
                    </ImageBackground>
                </TouchableOpacity>
            }
            
        }

        onPressPlusView = (id) => {
            if (this.state.count == 0) {
                return <TouchableOpacity style={{ paddingLeft: wp('5.5%'), paddingTop: -20}} onPress={this.onPressPlus.bind(this, id)} >
                    <ImageBackground source={require('../img/circle-plus-gris.png')} style={{ height: hp('2%'),width:wp('2.6%'),marginRight: 13}}>
                    </ImageBackground>
                </TouchableOpacity>
            }
            else return <TouchableOpacity style={{ paddingLeft: wp('1.5%')}} onPress={this.onPressPlus.bind(this, id)}>
                <ImageBackground source={require('../img/circle-plus-gris.png')} style={{ height: hp('2%'),width:wp('2.6%')}}>
                </ImageBackground>
            </TouchableOpacity>;
        }
    

        componentDidUpdate(prevProps,prevState) {

            if(prevState.count == this.state.count )
                    return;
            this.selected = this.getSelected(this.props.id);
            if(this.selected != undefined){
                 if(this.state.count > 0){
                    this.selected.count = this.state.count;
                 }
                 if(this.state.count == 0){
                    var index = global.Selected.indexOf(this.selected);
                    global.Selected.splice(index, 1);
                 }
                 
            }else{
                var itemToInsert = {};
                itemToInsert.id = this.props.id;
                itemToInsert.type = "byglass";
                itemToInsert.count = this.state.count;
                global.Selected.push(itemToInsert);
                this.selected = itemToInsert;  
            }
                this.props.computeSelectionCount();
          }

        render() {
          return (
            <View style={{flexDirection: 'row',justifyContent: 'space-between', width:wp('20%'),height:wp('8.5%'),paddingRight:wp('11%'),paddingTop:15}}>
                                            
                {this.onPressMoinView(this.props.id)}
                                                  { this.state.count > 0 ?
                                                    <Text
                                                        style={[styles.countText]}>
                                                    {this.state.count}
                                                  </Text>: null}
                {this.onPressPlusView(this.props.id)}

          </View>

          )
        };


    }

const styles = StyleSheet.create({
    body:{
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        width:wp('90%'),
        marginLeft:wp('5%'),
        marginTop:wp('3%')
    },
    text: {
        color:"white",
        fontSize:20,
        marginBottom: hp("2.8%"),
        letterSpacing: 1.6
    },
    image:{
        height: hp("40%"),
        width: wp("99%"),
        resizeMode: 'contain',
        marginLeft: -50, 
        marginTop:40,
        marginBottom:35
    },
    imageicon:{
            height: hp("4%"), width: wp("6%"), alignSelf: 'flex-end'
    },
    countText: {
        color: '#ffffff',
        textAlign: 'center',
        paddingLeft:wp('1.5%'),
        marginTop: -3,
        fontSize: 22
    }
});
    