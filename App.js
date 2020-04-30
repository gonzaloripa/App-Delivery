import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import * as Font from 'expo-font';

//Import Classes
import SignInScreen from './SignInScreen';
import RegisterScreen from './RegisterScreen';
import ChangePassScreen from './ChangePassScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import InitialScreen from './InitialScreen';
import Drawer from './Drawer';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';


const AppContainer =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: SignInScreen, //AuthStack,
      Register: RegisterScreen,
      ChangePass: ChangePassScreen,
      App: Drawer,
      //Initial:InitialScreen
    },
    {
      initialRouteName: 'AuthLoading',
      backBehavior: 'order'
    }
  )
);

export default class App extends React.Component {

  async componentDidMount(){
    await Font.loadAsync({
      'baloo-bhai-regular': require('./assets/BalooBhai-Regular.ttf'),
    });
  }

  render() {
    return (
      <AppContainer/>
    );
  }
}