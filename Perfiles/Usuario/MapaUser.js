import React from 'react';
import {
  AsyncStorage, StyleSheet, Dimensions, View, TextInput, Text, TouchableHighlight, Alert
} from 'react-native';
import Constants from "expo-constants";
import * as Font from 'expo-font';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { Divider, Tooltip } from 'react-native-elements';
import MapView, {Polygon, Polyline, Marker, Callout} from 'react-native-maps';
import ModalMap from '../../Componentes/Modal';
import ModalInactivo from '../../Componentes/ModalInactivo';
import isPointInPolygon from 'geolib/es/isPointInPolygon'

/*
-Ver alternativas para el Callout. Mostrar info del pedido, confirmarlo o cancelarlo.
-Ocultar tabBarBottom cuando se abre el teclado: hacerlo tocando el manifest
*/


export default class MapaUser extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      index:0,
      modalVisible:false,
      polygons:[
                [{
                  latitude: -34.922553,
                  longitude: -57.9934212
                },
                {
                  latitude: -34.8899071,
                  longitude: -57.9574833
                },
                {
                  latitude: -34.9207729,
                  longitude: -57.9174648
                },
                {
                  latitude:-34.9532967,
                  longitude:-57.9533597
                },
                {
                  latitude: -34.922553,
                  longitude: -57.9934212
                }]
              ],
      markers:[
                {
                  coordinate:{
                    "latitude": -34.915277681267334,
                    "longitude": -57.966961450874805,
                  },
                  isActive: true, 
                  info:{direccion:"15 y 41", pedido:"2 Tartas de calabaza"}
                },
                {
                  coordinate:{
                    "latitude": -34.92431538198405,
                    "longitude": -57.97236207872629,
                  },                  
                  isActive: true, 
                  info:{direccion:"43 y 23", pedido:"3 Milanesas con papas"}
                },
                {
                  coordinate:{
                    "latitude": -34.92886340879282,
                    "longitude": -57.95011248439551,
                  },
                  isActive: true, 
                  info:{direccion:"60 y 15", pedido:"2 pizzas"}
                }
              ],
      markActual:null,
      comment:"",
      showFinish:false
    }
  }


  onPressCallout = (e) => {
    //console.log("Toca callout ",e.nativeEvent.coordinate)
    this.marker1.hideCallout()

  }

  onPressMark = (e,mark,index) => {
    console.log("Toca marca ",e.nativeEvent.coordinate)
    this.setState({
      modalVisible:true,
      markActual:mark,
      index:index
    })
  }

  setModalVisible = () => {
    this.setState({modalVisible:false})
  }

  cambiarColorMarker = (comment) => {
    let actual = this.state.markActual
    console.log("Comentario ",comment)
    let newData = {...actual, isActive: !actual.isActive, comment:comment}
    let markers = this.state.markers
    markers[this.state.index] = newData
    
    var showFinish = (markers.filter((mark)=>{
      return mark.isActive 
    }).length === 0)
    
    this.setState({
      showFinish: showFinish, 
      markers: markers,
      modalVisible:false,
      markActual:newData
    }, console.log("Cambia ",newData))   
  }

  onPressButton = () => {
    //Mandar aviso a la base (con info del repartidor)
    console.log("Termino el delivery!")
    Alert.alert(`Terminaste el reparto a las ${ new Date()}`);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
          { this.state.markActual && !this.state.markActual.isActive ?
            <ModalInactivo
              cancelarDireccion = {this.cambiarColorMarker} 
              hideModal = {this.setModalVisible }
              modalVisible = {this.state.modalVisible}
              info = {this.state.markActual}
            />
            :
            <ModalMap
              confirmarDireccion = {(comment) => this.cambiarColorMarker(comment) } 
              hideModal = {this.setModalVisible}
              modalVisible = {this.state.modalVisible}
              info = {this.state.markActual}
            />
          }
          { this.state.showFinish &&
            <View style={{zIndex:1000, top:10, right:10,position:'absolute'}}>
              <TouchableHighlight
                underlayColor = "#00b1cc"
                style={{ ...styles.openButton, backgroundColor: "#008ca2" }}
                onPress={this.onPressButton}
              >
                <Text style={styles.textStyle}> Finalizar reparto </Text>
              </TouchableHighlight>
            </View>               
          }
          <MapView
            region={{
              latitude: -34.9208532,
              longitude: -57.9564128,
              latitudeDelta: 0.06,
              longitudeDelta: 0.08,
            }} 
            zoomControlEnabled
            style={styles.mapStyle}
            //onPress = {this.onPress} 
          >

            {
              this.state.markers.map((mark,index) => {
                return (
                  <Marker
                    key = {mark.isActive ? `active-${index}` : `inactive-${index}`}
                    ref={ref => {
                      this.marker1 = ref;
                    }}
                    pinColor = {mark.isActive ? 'red' : 'green'}
                    onPress = {(e)=>this.onPressMark(e,mark,index)}
                    //onCalloutPress = {this.onPressCallout}
                    coordinate = {mark.coordinate}    
                  />   
                )             
              }) 
            }               
            { 
              this.state.polygons.map( (polygon,index) => {
                return(
                  <Polygon
                    key = {`polygon-${index}`}
                    tappable = {false}
                    coordinates={polygon}
                    strokeColor = 'rgba(221,082,109,0.7)'
                    strokeWidth = {2}
                    fillColor = 'rgba(221,082,109,0.1)'
      
                  />)
              })
            }

          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: 370,//Dimensions.get('window').width,
    height: 560,//Dimensions.get('window').height,
    //marginTop: 10,
    //marginBottom:10
  },
  callout:{
    //position:'relative',
    bottom:10,
    width:200,
    height:150,
    flexDirection:'column', 
    alignItems: 'center', 
    backgroundColor:'white', 
    padding:20, 
    borderRadius:10
  },
  openButton: {
    //backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:5
  },  
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

/*

<Callout tooltip onPress = {this.onPressCallout}>
  <View style= {styles.callout}>
    <Text style= {{marginBottom:10, fontSize:18, borderBottomColor:'grey', borderBottomWidth: 1 }} >Confirmar Pedido</Text>
    <Text style= {{marginBottom:10, fontSize:18}} >Toca el modal para confirmar el pedido</Text>
  </View>
</Callout>
*/