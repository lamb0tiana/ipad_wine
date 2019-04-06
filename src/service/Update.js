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
export default class Update extends Component {
constructor(props) {
    super();
    this.state = {
        id: '',
        type: '',
        name: '',
        ActivityIndicator_Loading: false,
        ipad_countries: [], 
    }
}

Update_Data_Into_Sqlite = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://mmbund.com/surgery/index.php/ipadjson')
                .then((response) => response.json())
                .then((responseJson) => {
                this.setState({
                    ActivityIndicator_Loading : false,
                    dataSource: responseJson,
                    ipad_wines: responseJson.ipad_wines,
                    ipad_countries: responseJson.ipad_countries,
                    ipad_regions: responseJson.ipad_regions,
                    ipad_grapes: responseJson.ipad_grapes,
                    ipad_winesgrapes: responseJson.ipad_winesgrapes,
                }, function() {
                    db.transaction(function(tx) {
                        tx.executeSql('DELETE TABLE ipad_wines');
                        });
                });
                }).catch((error) =>
                {
                    console.error(error);

                    this.setState({ ActivityIndicator_Loading : false});
                });
            })
    }

    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.1, width: '100%', backgroundColor: 'black' }} />
        );
    };

  render() {
    return (
        <View style = { styles.MainContainer }>
            {this.state.ActivityIndicator_Loading ? 
            <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> 
            : <ScrollView style={{backgroundColor:'black',width:wp('100%')}}> 
                <FlatList
                data={this.state.ipad_countries}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                renderItem={({ item }) => (
                <View key={item.id} style={{borderColor:'#808080', borderBottomWidth: 0.6, marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                        <Text style={{fontSize:30, textAlign: 'center',color:'#fff',backgroundColor:'#009343', height:wp('9.65%')}}>{item.name}</Text>
                    </View>
                </View>
                    )}
                    />
                </ScrollView>}

            <TouchableHighlight onPress={() => {
                        this.Update_Data_Into_Sqlite();
                        }}
                        style={{backgroundColor:'#c3c3c4',marginLeft:2,marginTop:2,marginRight:2,marginBottom:10,padding:2, width:wp('26%'), height:wp('10%')}}>
                <Text style={{fontSize:34, textAlign: 'center',color:'#fff',backgroundColor:'#009343',padding:3, paddingTop: 26, height:wp('9.65%')}}>UPDATE</Text>
            </TouchableHighlight> 
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
     
        },
        ActivityIndicatorStyle:{
          backgroundColor: 'red',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        
      }
});




