import React from 'react';
import {
  PixelRatio,AsyncStorage, View, Text, BackHandler, StatusBar, StyleSheet, Platform, ActivityIndicator
} from 'react-native';

import { Button, InputItem, List, Modal, Provider } from '@ant-design/react-native';
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const font_size = (PixelRatio.get() <= 2) ? 16 : 18

export default class ChangePassScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      showIndicator:false
    }
  }

  componentDidMount() {
    if(Platform.OS != 'ios'){
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('Auth', {screen:'ChangePassBack'}); // works best when the goBack is async
        return true;
      });
    }
  }

  componentWillUnmount() {
    if(Platform.OS != 'ios')
      this.backHandler.remove();
  }

  render() {
    return (
      <Provider>
        <StatusBar  hidden={true} />
          <View style= {{flex:1,flexDirection:'column', alignItems:'center', backgroundColor:'#f9f5ed'}}>
            <View style= {{flex:1,justifyContent: 'center', width:'80%'}} >         
                <View>
                  <List
                    style={{ marginTop:8}}  
                    renderHeader={
                    (
                    <Text style={{ height:40, justifyContent:'center', padding:8,fontSize:font_size, color:'#008ca2',fontFamily:'work-sans-regular', backgroundColor:'#e6e6e6'}}> 
                        Cambiar Contraseña
                      </Text>
                    )
                    }
                  >
                    
                    <InputItem
                      maxLength={20}                  
                      style={styles.inputItem}
                      value={this.state.username}
                      onChange={value => {
                        this.setState({
                          username: value,
                        });
                      }}
                      placeholder="Usuario"
                    >
                    </InputItem>
                    <InputItem
                      maxLength={20}                  
                      style={styles.inputItem}
                      type="password"
                      value={this.state.password}
                      onChange={value => {
                        this.setState({
                          password: value,
                        });
                      }}
                      placeholder="Nueva Contraseña"
                    >
                    </InputItem>
                  </List> 
                </View>
                <View style={{flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                  
                  <Button
                    style={{paddingBottom:'7%',marginTop:'7%',backgroundColor:'#008ca2',borderColor:'#008ca2'}}
                    type="primary"
                    onPress={this._changePassAsync}
                    title="Mas"
                  >
                  <Text style={{color:'#f9f5ed',fontFamily:'baloo-bhai-regular', textAlign:'center'}}> Confirmar </Text>
                  </Button>

                  { (this.state.showIndicator) &&
                    <ActivityIndicator size="large" />
                  }

                </View>
            </View>          
            <FlashMessage textStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} titleStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} duration={4000} position="top" /> 
          </View>
      </Provider>
    );
  }


  _changePassAsync = async () => {

    if(!this.state.username || !this.state.password) {
      showMessage({
          icon:"auto",
          message: "Tenes que completar todos los campos",
          type: "warning",
      });      
    }
    else{

      this.setState({showIndicator:true})

      var result = await fetch(uri+'/mobile/changePassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson.username;
      })
      .catch((error) => {
        console.error(error);
        return null
      });;

      console.log(result,result != null)

      
      if(result != null){
        this.props.navigation.navigate('AuthLoading',{screen:"ChangePass"});
      }
      else{
        this.setState({showIndicator:false})
        console.log("No existe el usuario")
        showMessage({
          icon:"auto",
          message: "Por favor, ingresa un nombre de usuario valido",
          type: "warning",
        });  
      }
    }
  }
}

const styles = StyleSheet.create({
  inputItem: {
    fontFamily:'work-sans-regular'
  }
});