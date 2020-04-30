import React from 'react';
import {
  AsyncStorage, StatusBar,ActivityIndicator, Platform, PixelRatio,
  View, Text, ImageBackground, BackHandler
} from 'react-native';

import { Button, InputItem, List } from '@ant-design/react-native';
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import * as Font from 'expo-font';
//const win = Dimensions.get('window');

const font_size = (PixelRatio.get() <= 2) ? 16 : 18

export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      showIndicator:false
    }
  }


  async componentDidMount(){
    //Controlar ios
    if(Platform.OS != 'ios'){
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //this.goBack(); // works best when the goBack is async
        BackHandler.exitApp()
        return true;
      });
    }
    
    console.log("Entra ",this.props.navigation.state)
    if (this.props.navigation.state.params.screen == 'Login' ){ 
      this.refs.errorFlash.showMessage({
        message: "Usuario o contraseña incorrecta",
        type: "warning",
      });
    }else if (this.props.navigation.state.params.screen == 'Register' ){ 
      this.refs.errorFlash.showMessage({
        message: "Usuario registrado correctamente",
        type: "success",
      });      
    }
    else if(this.props.navigation.state.params.screen == 'Login2') {
      this.refs.inhabilitadoFlash.showMessage({
        message: "Usuario inhabilitado. Comunicate con nosotros por Instagram para pedir tu habilitacion",
        type: "warning",
      });      
    }
    else if(this.props.navigation.state.params.screen == 'ChangePass') {
      this.refs.inhabilitadoFlash.showMessage({
        message: "Se actualizo la contraseña correctamente. Ingresa con tu nueva contraseña",
        type: "warning",
      });      
    }
    this.setState({showIndicator:false})  
  }

  componentWillUnmount() {
    if(Platform.OS != 'ios'){
      this.backHandler.remove();
    }
  } 
  

  static navigationOptions = {
    title: 'Por favor, ingrese con su usuario'
  };

  render() {
    return (

      <ImageBackground
        source={require('./assets/login_morfi.png')}
        style={{ width: '100%', height: '100%'}}
      >
        <StatusBar  hidden={true} />

        <View style= {{flex:1,flexDirection:'column', alignItems:'center'}}>
          <View style= {{flex:1,justifyContent: 'center', width:'80%'}} >
          
          { (this.state.showIndicator) &&
            <ActivityIndicator size="large" />
          }

          <View style={{flexDirection:'column', alignItems:'center', margin:'5%'}}>
            <Text style={{fontSize:font_size - 2, fontFamily:'baloo-bhai-regular', color:'#008ca2'}}>
            No tenes cuenta?
              <Text onPress={this._registerAsync} style={{fontSize:font_size - 2, fontFamily:'baloo-bhai-regular',color:'#dd526d'}}>
                &nbsp; Registrate
              </Text>
            </Text>
          </View>

          <Button
            style={{backgroundColor:'#008ca2', borderColor:'#008ca2'}}
            type="primary"
            onPress={this._signInAsync}            
            title="Confirmar"
          >
            <Text style={{color:'#f9f5ed',fontFamily:'baloo-bhai-regular'}}> Ingresar </Text>
          </Button>

           <List
              style={{ marginTop:10}} 
              renderHeader={
                (
                  <Text style={{ height:40, justifyContent:'center', padding:10,fontSize:font_size, color:'#008ca2',fontFamily:'work-sans-regular', backgroundColor:'#e6e6e6'}}> 
                    Iniciar Sesion 
                  </Text>
                )
              }
           >
            <InputItem
              style={{ fontFamily:'work-sans-regular'}}
              value={this.state.username}
              onChange={value => {
                this.setState({
                  username: value
                });
              }}
              placeholder="Usuario"
            >
            </InputItem>

            <InputItem
              style={{ fontFamily:'work-sans-regular'}}
              type="password"
              value={this.state.password}
              onChange={value => {
                this.setState({
                  password: value
                });
              }}
              placeholder="Contraseña"
            >
            </InputItem>
          </List>

          <View style={{flexDirection:'column', alignItems:'center', margin:'5%'}}>
            <Text onPress={this._changePass} style={{fontSize:font_size - 2, fontFamily:'baloo-bhai-regular',color:'#008ca2'}}>
              Olvidaste tu contraseña?
            </Text>
          </View>

          </View>
          <FlashMessage duration={15000} textStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} titleStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} ref="inhabilitadoFlash" position="top" />
          <FlashMessage textStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} titleStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} duration={4000} ref="errorFlash" position="top" /> 
        </View>
      </ImageBackground>
    );
  }

  _changePass = async () => {
    this.props.navigation.navigate('ChangePass');
  }

  _registerAsync = async () => {
    this.props.navigation.navigate('Register');
  }


  _signInAsync = async () => {
    this.setState({showIndicator:true})
    
    /*var result = await fetch(uri+'/mobile/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log("Signinasync response - ",responseJson)
      return responseJson.user;
    })
    .catch((error) => {
      console.error(error);
      return null
    });

    console.log("Signinasync - ",result,result != null)
    */
    if(this.state.username == "admin" || this.state.username == "gonza"){//if(result != null){
      //if(result.habilitado){
        await AsyncStorage.multiSet([['userToken', this.state.username],['userInfo',JSON.stringify(this.state)]]);
        this.props.navigation.navigate('App', { token:this.state.username});
      /*}else{
        console.log("Usuario no habilitado")
        this.props.navigation.navigate('AuthLoading',{screen:"Login2"});  
      }*/      
    }
    else{
      console.log("Usuario no encontrado")
      this.props.navigation.navigate('AuthLoading',{screen:"Login"});
    }
  };
}