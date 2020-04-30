import React from 'react';
import {
  AsyncStorage,
  View, Text, StyleSheet, Picker, ScrollView
} from 'react-native';
import { Button, List, InputItem } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default class ProfileScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      user: null,
      address:""
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'baloo-bhai-regular': require('./assets/BalooBhai-Regular.ttf'),
    });

    const user = await AsyncStorage.getItem('userInfo');
    this.setState({
      user: JSON.parse(user),
      address: JSON.parse(user).direccion[0]
    }, console.log("Usuario - ",user))
   }

  render() {
    const { navigate, goBack } = this.props.navigation;
   

    return (
      <View style= {{flex:1,flexDirection:'column', alignItems:'center', backgroundColor:'#f9f5ed'}}>
        <View style = {{flex:4, justifyContent:'center', width:'90%',marginTop:'10%'}}>
            {this.state.user && 
            <List
              style={{ marginTop:10}}             
              renderHeader={
                (
                  <Text style={{height:40, paddingLeft:10, paddingBottom:0, paddingTop:10,fontSize:18, justifyContent:'center', color:'#008ca2',fontFamily:'work-sans-regular', backgroundColor:'#e6e6e6'}}> 
                    Perfil 
                  </Text>
                )
              }
            > 
            <ScrollView>
              <InputItem
                style={styles.text}
                placeholder="Usuario"
                value={"Usuario: "+this.state.user.username}
                editable = {false}
              />
                <InputItem
                  //type="password"
                  style={styles.text}
                  value={"Contraseña: "+this.state.user.password}
                  placeholder="Contraseña"
                  editable = {false}
                />
                <InputItem
                  style={styles.text}
                  value={"Nombre: "+this.state.user.nombre}
                  placeholder="Nombre"
                  editable = {false}
                />

                <InputItem
                  style={styles.text}
                  value={"Apellido: "+this.state.user.apellido}
                  placeholder="Apellido"
                  editable = {false}
                />

                <InputItem
                  style={styles.text}
                  value={"Email: "+this.state.user.email}
                  placeholder="Email"
                  editable = {false}
                >
                </InputItem>
                <InputItem
                  style={styles.text}
                  type="phone"
                  value={"Telefono: "+this.state.user.telefono.toString()}
                  placeholder="Telefono"
                  editable = {false}
                />
                
                <InputItem
                  style={styles.text}
                  value={(this.state.address) ? "Calle: "+ this.state.address.direccion.calle : "" }
                  editable = {false}
                  placeholder="Calle (Calle 44 y calle 131)"
                />
                
                <InputItem
                  style={styles.text}
                  value={(this.state.address) ? "Numero: "+this.state.address.direccion.numero : null}
                  editable = {false}
                  placeholder="Numero (del domicilio)"
                />
                {this.state.address.direccion.depto && 
                  <InputItem
                    style={styles.text}
                    value={(this.state.address) ? "Depto: "+this.state.address.direccion.depto : null}
                    editable = {false}
                    placeholder="Depto (numero de depto)"
                  >
                    <Text style={styles.text}>Depto:</Text>
                  </InputItem>
                }
                {this.state.address.direccion.depto &&
                  <InputItem
                    style={styles.text}
                    value={(this.state.address) ? "Info: "+this.state.address.direccion.info : ""}
                    editable = {false}
                    placeholder="Informacion adicional (edificio, empresa)"
                  />  
                }

                <View style = {{flexDirection:'row', alignItems:'center'}} >
                  <Text style={{
                    width:'50%',  
                    fontFamily:'work-sans-regular',
                    color:'#dd526d',
                    fontSize:18,
                    paddingLeft:15}}> 
                    Direcciones de entrega: 
                  </Text>
                  <Picker
                      itemStyle = {{color:"#dd526d",fontFamily:'baloo-bhai-regular',fontSize:18}}                   
                      style={{width:'40%'}}
                      selectedValue={this.state.user.address}
                      onValueChange={(itemValue, itemIndex) => this.changeDireccionEntrega(itemValue, itemIndex)}>
                      {
                        this.state.user.direccion.map((direc,index)=>{
                            return (<Picker.Item 
                                 color="#dd526d" 
                                 label={direc.direccion.calle} 
                                 value={direc.direccion.calle} 
                                 key={index} 
                                />)           
                        })
                      }
                  </Picker>
                </View>
              </ScrollView>           
            </List>
            }
          </View>
          <View style={{flex:1, flexDirection:'column', justifyContent:'center',alignItems:'center', width:'40%'}}>
          <Button
            style={{backgroundColor:'#008ca2', borderColor:'#008ca2', margin:'3%'}}
            type="primary"
            onPress={() => goBack(null)}
            title="Atras"
          >
            <Text style={{color:'#f9f5ed',fontFamily:'baloo-bhai-regular'}}> Atras </Text>
          </Button>
          </View>
      </View>
    );
  }

  _backHome = async () => {
    this.props.navigation.navigate('Main');
  }
  changeDireccionEntrega = (direccion, index) => {
    console.log("Cambia direccion ",direccion)
    this.setState({address:this.state.user.direccion[index]})
  }

}

const styles = StyleSheet.create({
  text:{

    fontFamily:'work-sans-regular',
    //fontWeight:'bold',
    color:'#dd526d',
    fontSize:18
  }
});