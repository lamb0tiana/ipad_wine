import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ImageBackground
} from 'react-native';
import Os  from './Os';




export default class Test extends Component {

    constructor(props) {
        super(props); 
        this.s = new Os();
        this.textElem = React.createElement(Os, [], ['Hello world']); 
        console.log('constructor test'); 
        this.f =  this.s.render();
    }

    static navigationOptions =
    {
        header:null
    }
  

    render() {
        console.log('render test');
        return (
                <View >
                    {this.f}
                </View>

        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#999999'
    }

});
