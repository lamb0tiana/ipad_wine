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
    CheckBox,
    TextInput,
    FlatList,
    Linking,
    ActivityIndicator
} from 'react-native';

import {heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
    
let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name:'mmb_ipad.db', createFromLocation:'~/database/mmb_ipad.db'})
export default class Test extends Component {
constructor(props) {
    super();
    this.state = {
        id: '',
        type: '',
        name: '',
        ActivityIndicator_Loading: false,
        ipad_countries: [], 
    }
    
    //all wine
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM ipad_wines', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.setState({
            ipad_countries: temp,
          });
        });
      });
    }

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />
        );
    };

  render() {
    return (
        <View style = { styles.MainContainer }>
                <ScrollView style={{backgroundColor:'black',width:wp('100%')}}> 
                
                <FlatList
                data={this.state.ipad_countries}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                renderItem={({ item }) => (
                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                        <Text style={{fontSize:30, textAlign: 'center',color:'#fff', height:wp('9.65%')}}>{item.name}</Text>
                    </View>
                </View>
                    )}
                    />
                </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create(
    {
        MainContainer:
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20
     
        }
});
