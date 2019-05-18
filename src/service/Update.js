import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableHighlight,
    ActivityIndicator,
    Alert, AlertIOS
} from 'react-native';
import DataManager  from './DataManager';

import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
    
export default class Update extends Component {
constructor(props) {
    super();
    this.state = {
        Updating: false,
        status:  [],
        count: 0
    }
    this.dm = DataManager.getInstance();
    this._isMounted = false;
    this.dm.emitter.addListener('status', (e) =>{
        this.updateUi(e)
    });
    // dm.update(status => {
    //     if(status){
    //         this.setState({Updating: false})
    //     }else{
    //         alert('An error occured');
    //     }
    // })
}

    updateUi = (e) => {
        this.state.status.push(e);
        this.setState({
            count:this.state.count + 1
        });
    }

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />
        );
    };

    onPressUpdate = () =>{

        AlertIOS.prompt('Enter your password', null, (text) =>{
             if(text == 'mmbpad'){

                this.state.status.push({id:0, text:'Initialization'});
                this.setState({Updating: true});
                this.dm._update().then(e =>{
                    if(this._isMounted)
                            this.setState({Updating: false});
                });
                
             }else{
                 alert('wrong password');
             }              
        });

    }


    componentDidMount() {
        this._isMounted = true;
    }



    onPressCancel = () => {
      if(this.state.Updating == false) 
       {
           this.props.navigation.navigate('Home');
        } else{
            Alert.alert(
                'Abort update',
                'Do you really want to abort update',
                [
                  {
                    text: 'yes',
                    onPress: () => {
                        this.props.navigation.navigate('Home');
                        this.dm.cancelUpdate();
                    },
                    style: 'cancel',
                  },
                  {text: 'no', onPress: () => { 
                      return;             
                    }},
                ],
                {cancelable: true},
              );
        }
    }

    componentWillUnmount(){
        this.dm.emitter.removeAllListeners();
        this._isMounted = false;
    }

    static navigationOptions =
    {
        header:null
    }

  render() {
    return (
        <ScrollView style = { styles.MainContainer }>
        <View style = { styles.Header }>

        { this.state.Updating ? null :
           <TouchableHighlight style = { styles.Button } onPress = {() => this.onPressUpdate()}>
           <Text style = { styles.Info }>Update</Text>
           </TouchableHighlight>
        }

           <TouchableHighlight style = { styles.Button } onPress = {() => this.onPressCancel()}>
           <Text style = { styles.Info }>Cancel</Text>
           </TouchableHighlight>
        </View>
           <FlatList
            data={this.state.status}
            renderItem={({item}) => <Text style = { styles.Log }>{item.text}</Text>}
            extraData = {this.state.count}
            keyExtractor={item => String(item.id)}
            style = { styles.FlatList }
            />

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create(
    {
        Header:
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          margin: 20,
          marginTop:50
     
        },
        Info:
        {
            color:'orange',
            fontSize:23,
        },
        Button:{
            backgroundColor: 'gray',
            padding: 10,
            margin: 10,
        },
        FlatList:{
            padding: 10
        },
        MainContainer:{
            backgroundColor:'black',
            color:'white'
        },
        Log:{
            color: 'white'
        }
});




