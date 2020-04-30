import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';


export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    await Font.loadAsync({
      'baloo-bhai-regular': require('./assets/BalooBhai-Regular.ttf'),
    });
    await Font.loadAsync({
      'work-sans-regular': require('./assets/WorkSans-Regular.ttf'),
    });

    const userToken = await AsyncStorage.getItem('userToken');
    const prevScreen = (this.props.navigation.state.params) ? this.props.navigation.state.params.screen : null
    console.log("AuthLoading - ",userToken,prevScreen, this.props.navigation.state)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth', { token: userToken, screen:prevScreen });
  };


  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar  barStyle="default" />
      </View>
    );
  }
}

