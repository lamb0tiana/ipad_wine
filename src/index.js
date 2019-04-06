/**
 * Sample React Native Index
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, Alert,ScrollView} from 'react-native';
import Start from './service/Start';
import Home from './service/Home';
import Fullwinelist from './service/Fullwinelist';
import Glasslist from './service/Glasslist';
import Halfofflist from './service/Halfofflist';
import Bestoflist from './service/Bestoflist';
import WineDetail from './service/WineDetail';
import Sommelier from './service/Sommelier';
import Selectlist from './service/Selectlist';
import Update from './service/Update';
import Test from './service/Test';

import { createStackNavigator } from 'react-navigation';


export default class Index extends Component {

  render() {

    return (
        <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator ({
    Start: Start,
    Home: Home,
    Fullwinelist: Fullwinelist,
    Glasslist : Glasslist,
    Halfofflist: Halfofflist,
    Bestoflist: Bestoflist,
    WineDetail: WineDetail,
    Sommelier: Sommelier,
    Selectlist: Selectlist,
    Update: Update,
    Test : Test,

  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
