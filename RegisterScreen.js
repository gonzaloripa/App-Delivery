import React from 'react';
import {
  PixelRatio,
  AsyncStorage,
  View, Text, Picker, BackHandler, StatusBar, StyleSheet, Platform, ActivityIndicator
} from 'react-native';

import { Button, InputItem, List, Modal, Provider } from '@ant-design/react-native';
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const font_size = (PixelRatio.get() <= 2) ? 16 : 18

export default class RegisterScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"",
      name:"",
      lastname:"",
      direcciones:[],
      email:"",
      phone: null,
      showModal:false,
      index:-1,
      valuePicker:"",
      showIndicator:false
    }
  }

  /*componentDidMount(){
    /*console.log(this.props.navigation.state)
    if (this.props.navigation.state.params.screen ){ 
      showMessage({
        message: "Usuario no encontrado",
        type: "default",
      });
    }
  }*/

  componentDidMount() {
    if(Platform.OS != 'ios'){
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('Auth', {screen:'RegisterBack'}); // works best when the goBack is async
        return true;
      });
    }
  }

  componentWillUnmount() {
    if(Platform.OS != 'ios')
      this.backHandler.remove();
  }

  static navigationOptions = {
    title: 'Por favor, registrese para poder ingresar'
  };

  render() {
    const footerButtons = [
          { text: (<Text style={{color:'#008ca2',fontFamily:'baloo-bhai-regular'}}> Cancelar </Text>), onPress: () => { this.cancelarDireccion() }},
          { text: (<Text style={{color:'#008ca2',fontFamily:'baloo-bhai-regular'}}> Ok </Text>), onPress: () => { this.confirmarDireccion() }},
    ];

    const index = this.state.index
    return (
      <Provider>
        <StatusBar  hidden={true} />
        <View style= {{flex:1,flexDirection:'column', alignItems:'center', backgroundColor:'#f9f5ed'}}>
          <View style= {{flex:1,justifyContent: 'center', width:'80%'}} >         
            
            {this.state.showModal && 
            <Modal
              style = {{backgroundColor:'#f9f5ed', width:'90%' }}
              bodyStyle = {{backgroundColor:'#f9f5ed', width:'100%' }}
              title = {(<Text style={{color:'#008ca2',fontSize:22,fontFamily:'baloo-bhai-regular'}}> Completar direccion de entrega </Text>)}
              maskClosable={false}
              visible={this.state.showModal}
              animationType="slide-up"
              transparent={true}
              footer={footerButtons}
            >
              <List
                style={{ marginTop:10}}  
                renderHeader={
                (
                  <Text style={{ height:40, justifyContent:'center', padding:10,fontSize:font_size, color:'#008ca2',fontFamily:'work-sans-regular', backgroundColor:'#e6e6e6'}}> 
                    Direccion
                  </Text>
                )
              }
              >
              { 
                <View >
                  <InputItem
                    style={styles.inputItem}
                    value={(this.state.direcciones[index].direccion != {}) ? this.state.direcciones[index].direccion.calle : "" }
                    onChange={ (value) => {
                      this.onChangeDireccion(value,index)
                    }}
                    placeholder="Calle (Ej: 44 y 131, La Plata)"
                  >
                  </InputItem>
                  
                  <InputItem
                    style={styles.inputItem}                  
                    type="number"
                    value={(this.state.direcciones[index].direccion != {}) ? this.state.direcciones[index].direccion.numero : null}
                    onChange={ (value) => {
                      this.onChangeNumero(value,index)
                    }}
                    placeholder="Numero (del domicilio)"
                  >
                  </InputItem>

                  <InputItem
                    style={styles.inputItem}
                    type="number"
                    value={(this.state.direcciones[index].direccion != {}) ? this.state.direcciones[index].direccion.depto : null}
                    onChange={ (value) => {
                      this.onChangeDepto(value,index)
                    }}
                    placeholder="Depto (numero de depto)"
                  >
                  </InputItem>
                  
                  <InputItem
                    style={styles.inputItem}
                    value={(this.state.direcciones[index].direccion != {}) ? this.state.direcciones[index].direccion.info : ""}
                    onChange={ (value) => {
                      this.onChangeInfo(value,index)
                    }}
                    placeholder="Informacion adicional (edificio, piso, empresa)"
                  >
                  </InputItem>
                </View>
              } 
              </List>
              <FlashMessage duration={4000} textStyle={{fontFamily:'work-sans-regular', fontSize:16}} titleStyle={{fontFamily:'work-sans-regular', fontSize:16, paddingRight:10}} style={{width:"100%"}} ref="modalFlash" position="bottom" /> 

            </Modal>
            }
            {!this.state.showModal && 
              <View>
                <List
                  style={{ marginTop:8}}  
                  renderHeader={
                  (
                  <Text style={{ height:40, justifyContent:'center', padding:8,fontSize:font_size, color:'#008ca2',fontFamily:'work-sans-regular', backgroundColor:'#e6e6e6'}}> 
                      Registro 
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
                    placeholder="Contraseña"
                  >
                  </InputItem>
                  <InputItem
                    maxLength={20}                  
                    style={styles.inputItem}
                    value={this.state.name}
                    onChange={value => {
                      this.setState({
                        name: value,
                      });
                    }}
                    placeholder="Nombre"
                  >
                  </InputItem>

                  <InputItem
                    maxLength={20}
                    style={styles.inputItem}
                    value={this.state.lastname}
                    onChange={value => {
                      this.setState({
                        lastname: value,
                      });
                    }}
                    placeholder="Apellido"
                  >
                  </InputItem>

                  <InputItem
                    maxLength={40}
                    style={styles.inputItem}
                    value={this.state.email}
                    onChange={value => {
                      this.setState({
                        email: value,
                      });
                    }}
                    placeholder="Email"
                  >
                  </InputItem>

                  <InputItem
                    maxLength={10}
                    style={styles.inputItem}
                    type="number"
                    value={this.state.phone}
                    onChange={value => {
                      this.setState({
                        phone: value,
                      });
                    }}
                    placeholder="Telefono(movil)"
                  >
                  </InputItem>
                  {this.state.direcciones[index] != null &&
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={{ paddingLeft:'10%', fontSize:font_size, fontFamily:'work-sans-regular'}} >
                        Direcciones:
                      </Text>
                      <Picker
                        itemStyle = {{paddingLeft:'5%',color:"#dd526d",fontFamily:'work-sans-regular',fontSize:font_size}}                   
                        style={{width:'50%'}}
                        selectedValue={this.state.valuePicker}
                        onValueChange={(itemValue, itemIndex) => this.setState({valuePicker:itemValue})}
                      >
                      {
                        this.state.direcciones.map((direc,index)=>{
                            return (<Picker.Item 
                                 color="#dd526d" 
                                 label={direc.direccion.calle} 
                                 value={direc.direccion.calle} 
                                 key={index} 
                                />
                            )           
                        })
                      }
                      </Picker>
                    </View>
                  }
                    </List>                  
                  <View style={{flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                    <Button
                      style={{paddingBottom:'5%',marginTop:'7%',backgroundColor:'#008ca2',borderColor:'#008ca2'}}
                      type="primary"
                      onPress={ ()=> this.agregarDireccion()}
                      title="Mas"
                    >
                    <Text style={{ textAlign:'center',color:'#f9f5ed',fontFamily:'baloo-bhai-regular'}}> Agregar direccion </Text>
                    </Button>
                    
                    <Button
                      style={{paddingBottom:'5%',marginTop:'7%',backgroundColor:'#008ca2',borderColor:'#008ca2'}}
                      type="primary"
                      onPress={this._registerAsync}
                      title="Mas"
                    >
                    <Text style={{color:'#f9f5ed',fontFamily:'baloo-bhai-regular'}}> Registrarse </Text>
                    </Button>

                    { (this.state.showIndicator) &&
                      <ActivityIndicator size="large" />
                    }

                  </View>
            </View>
            }
          </View>     
          <FlashMessage textStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} titleStyle={{fontFamily:'work-sans-regular', fontSize:font_size}} duration={4000} position="top" /> 

        </View>
    </Provider>
    );
  }

  confirmarDireccion = () => {
    if(!this.state.direcciones[0].direccion.calle || !this.state.direcciones[0].direccion.numero){
      this.refs.modalFlash.showMessage({
          icon:"auto",
          message: "Los campos calle y numero son obligatorios",
          type: "warning",
      });
    }else{
      this.setState({
        showModal:false
      })
    }
  }

  cancelarDireccion = () => {
    console.log("Cancelar ",Object.entries(this.state.direcciones[0].direccion).length === 0 )
    if(Object.entries(this.state.direcciones[0].direccion).length === 0 ){
      this.refs.modalFlash.showMessage({
          icon:"auto",
          message: "Tenes que ingresar al menos una direccion de entrega",
          type: "warning",
      });
    }
    else{ 
      var direcciones = this.state.direcciones
      var index = this.state.index
      index-=1
      direcciones.pop()
      
      this.setState({
        showModal:false,
        index,
        direcciones
      })
    }
  }

  agregarDireccion = () => {
    var direcciones = this.state.direcciones
    var index = this.state.index
    index+=1
    direcciones[index] = {direccion:{}}
  
    this.setState({
      showModal:true,
      direcciones,
      index
    }, console.log("Direcciones ",index,direcciones))
  }


  onChangeDireccion = (value, index) => {
    
    var direcciones = this.state.direcciones
    //console.log("Direcciones ", index, direcciones[index], direcciones)
    direcciones[index].direccion.calle = value

    this.setState({
      direcciones
    });
  }

  onChangeNumero = (value, index) => {
    
    var direcciones = this.state.direcciones
    direcciones[index].direccion.numero = value

    this.setState({
      direcciones
    });
  }

  onChangeInfo = (value, index) => {
    
    var direcciones = this.state.direcciones
    direcciones[index].direccion.info = value

    this.setState({
      direcciones
    });
  }

  onChangeDepto = (value, index) => {
    
    var direcciones = this.state.direcciones
    direcciones[index].direccion.depto = value

    this.setState({
      direcciones
    });
  }

  _registerAsync = async () => {

    if(!this.state.username || !this.state.password || !this.state.name || !this.state.lastname ||
             !this.state.email || !this.state.phone){
      showMessage({
          icon:"auto",
          message: "Tenes que completar todos los campos",
          type: "warning",
      });      
    }
    else if(!this.state.direcciones[0]){
      showMessage({
          icon:"auto",
          message: "Tenes que ingresar al menos una direccion de entrega",
          type: "warning",
      });
    }
    else if(this.state.phone.length != 10){
        showMessage({
            icon:"auto",
            message: "El numero tiene que tener 10 digitos. Ingresa un numero correcto (recorda agregar la caracteristica de la region)",
            type: "warning",
        });              
    }
    else{

      this.setState({showIndicator:true})

      var result = await fetch(uri+'/mobile/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          direcciones: this.state.direcciones,
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          lastname: this.state.lastname,
          email: this.state.email,
          phone: this.state.phone
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson.user;
      })
      .catch((error) => {
        console.error(error);
        return null
      });;

      console.log(result,result != null)

      
      if(result != null){
        this.props.navigation.navigate('AuthLoading',{screen:"Register"});
      }
      else{
        console.log("Usuario ya existente")
        showMessage({
          icon:"auto",
          message: "Ya existe un usuario con ese nombre. Por favor, ingresa un nuevo nombre de usuario",
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