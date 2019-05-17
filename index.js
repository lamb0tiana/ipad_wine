/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import ModalSearch from './src/service/ModalSearch';
import App from './App.js';

//AppRegistry.registerComponent(appName, () => Row);
AppRegistry.registerComponent(appName, () => App);