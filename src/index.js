/**
 * Sample React Native Index
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage, Alert,ScrollView} from 'react-native';
import Home from './service/Home';
import Glass from './service/Glass';
import GlassDetail from './service/GlassDetail';
import ChampagneBest from './service/ChampagneBest';
import ChampagneBestDetail from './service/ChampagneBestDetail';

import { createStackNavigator } from 'react-navigation';


export default class Index extends Component {

  render() {

    return (
        <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator ({
    Home: Home,
    Glass : Glass,
    GlassDetail: GlassDetail,
    ChampagneBest : ChampagneBest,
    ChampagneBestDetail : ChampagneBestDetail
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
