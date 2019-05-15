/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import { createStackNavigator, createAppContainer } from "react-navigation";
import Start from './src/service/Start';
import Accueil from './src/service/Accueil';
import Fullwinelist from './src/service/Fullwinelist';
import Byglasslist from './src/service/Byglasslist';
import Bestoflist from './src/service/Bestoflist';
import Halfofflist from './src/service/Halfofflist';
import Sommelier from './src/service/Sommelier';
import WineDetail from './src/service/WineDetail';
import Selectlist from './src/service/Selectlist';
import Update from './src/service/Update';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Start
  },
  Accueil: {
    screen: Accueil
  },
  Fullwinelist: {
    screen: Fullwinelist
  },
  Byglasslist: {
    screen: Byglasslist
  },
  Bestoflist: {
    screen: Bestoflist
  },
  Halfofflist: {
    screen: Halfofflist
  },
  Sommelier: {
    screen: Sommelier
  },
  WineDetail:{
    screen: WineDetail
  },
  Selectlist:{
    screen: Selectlist
  },
  Update:{
    screen: Update
  }
}
);

export default createAppContainer(AppNavigator);





