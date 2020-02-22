/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import { createStackNavigator, createAppContainer } from "react-navigation";
import Start from './src/service/Start';


const AppNavigator = createStackNavigator({
  Home: {
    screen: Start
  }
}
);

export default createAppContainer(AppNavigator);





