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
import Sommelier from './src/service/Sommelier';
import WineDetail from './src/service/WineDetail';
import Selectlist from './src/service/Selectlist';
import Update from './src/service/Update';
import TestRecyclerBest from './src/service/TestRecyclerBest';
import TestRecyclerFull from './src/service/TestRecyclerFull';
import TestRecyclerGlass from './src/service/TestRecyclerGlass';
import TestRecyclerHalf from './src/service/TestRecyclerHalf';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Start
  },
  Accueil: {
    screen: Accueil
  },
  Fullwinelist: {
    screen: TestRecyclerFull
  },
  Byglasslist: {
    screen: TestRecyclerGlass
  },
  Bestoflist: {
    screen: TestRecyclerBest
  },
  Halfofflist: {
    screen: TestRecyclerHalf
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





