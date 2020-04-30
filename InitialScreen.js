import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View, Image, Text, Animated, Easing
} from 'react-native';
import Constants from "expo-constants";
import * as Font from 'expo-font';

const { manifest } = Constants;
const uri = "https://app-viandas.herokuapp.com" //`http://${manifest.debuggerHost.split(':').shift()}:5000`;

/*spinValue = new Animated.Value(0)

// First set up animation 
Animated.timing(
    this.spinValue,
  {
    delay:1000,
    toValue: 1,
    duration: 1000,
    easing: Easing.linear
  }
).start()

// Second interpolate beginning and end values (in this case 0 and 1)
const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})*/

export default class InitialScreen extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      fontLoaded:false
    }
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    await Font.loadAsync({
      'baloo-bhai-regular': require('./assets/BalooBhai-Regular.ttf'),
    });

    this.setState({
      fontLoaded:true
    })

    setTimeout(() => {
      this.props.navigation.navigate('AuthLoading')
    }, 2000)
  };


  // Render any loading content that you like here
  render() {
    return ( 
        <View style={{ flex:1, justifyContent: 'center', alignItems:'center', backgroundColor:'#f9f5ed'}}>
          {this.state.fontLoaded ? 
            (<Text style={{fontFamily:'baloo-bhai-regular', fontSize:24, color:'#008ca2'}}> Bienvenido a </Text>)
            :
            (<Text style={{fontWeight:'bold', fontSize:24,color:'#008ca2'}}> Bienvenido a </Text>)
          }
          <View //style={{padding:5,borderWidth: 1, borderStyle: 'dotted', borderColor: '#008ca2', borderRadius:200/2}}
          >
            <Image
                source={require('./assets/Morfi.png')}
                style={{ width: 200, height: 200, borderRadius:200/2,}}

            />
          </View>  
          <StatusBar  hidden={true} />
        </View>
    );
  }

}

/*
spinValue = new Animated.Value(0)

// First set up animation 
Animated.timing(
    this.spinValue,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear
  }
).start()

// Second interpolate beginning and end values (in this case 0 and 1)
const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
Then use it in your component like this:

<Animated.Image
  style={{transform: [{rotate: spin}] }}
  source={{uri: 'somesource.png'}} />
*/