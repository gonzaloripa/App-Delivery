import React from 'react';
import {
  AsyncStorage,
  View, TextInput, Text
} from 'react-native';

import { Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default class ContactScreen extends React.Component {


  async componentDidMount(){
    console.log("Contact screen ", this.props.navigation)
    await Font.loadAsync({
      'baloo-bhai-regular': require('./assets/BalooBhai-Regular.ttf'),
    });
  }
  render() {
    const { navigate, goBack } = this.props.navigation;
   

    return (
      <View style= {{flex:1,flexDirection:'column', alignItems:'center', backgroundColor:'#f9f5ed'}}>
        <View style={{flex:1,justifyContent: 'center'}}> 
          <View style ={{ width:'80%',flexDirection:'column', alignItems:'center'}}>
            <Text style={{textAlign:'center',fontSize:20, fontFamily:'work-sans-regular', color:'#4d4d4d'}} >
              Si necesitas comunicarte con nosotros, podes hacerlo al numero de Whatsapp   
            </Text>
            <Text style={{textAlign:'center',fontSize:24, fontFamily:'baloo-bhai-regular', color:'green' }}>
              444888844 
            </Text>
          </View>
          <View style ={{flexDirection:'column', alignItems:'center', marginTop:'40%'}} >
            <View style={{ width:'40%'}}>
              <Button
                style={{backgroundColor:'#008ca2',borderColor:'#008ca2'}}
                type="primary"
                onPress={() => goBack(null)}
                title="Atras"
              >
                <Text style={{color:'#f9f5ed',fontFamily:'baloo-bhai-regular'}}> Atras </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _backHome = async () => {
    this.props.navigation.navigate('Main');
  }
}