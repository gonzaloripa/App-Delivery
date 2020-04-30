import React from 'react';
import {
 AsyncStorage, StyleSheet, Dimensions, View, TextInput, Text, Image
} from 'react-native';
import Constants from "expo-constants";
import { Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { Ionicons, AntDesign} from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { Divider, Tooltip } from 'react-native-elements';
import MapView, {Polygon, Polyline, Marker, Callout} from 'react-native-maps';

import isPointInPolygon from 'geolib/es/isPointInPolygon'
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const uri = "https://app-viandas.herokuapp.com" //`http://${manifest.debuggerHost.split(':').shift()}:5000`;

/*
-Ver alternativas para el Callout. Mostrar info del pedido, confirmarlo o cancelarlo.
-Ocultar tabBarBottom cuando se abre el teclado: hacerlo tocando el manifest
*/


export default class MapAdmin extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      index: 0,
      polygons:[],
      polygon:[],
      region:{
        latitude: -34.9208532,
        longitude: -57.9564128,
        latitudeDelta:0.06,
        longitudeDelta:0.08,
      },
      markers:[]
    }
  }


  onPress = (e) => {
    let coordinate = e.nativeEvent.coordinate
    let actualPolygon = this.state.polygon
    console.log("onPress ",actualPolygon,this.state.polygons)
    
    if(actualPolygon.length < 3){
      console.log("Entra")

      this.setState({
        polygon: [...actualPolygon, coordinate],
        markers:[...this.state.markers,coordinate]
      })

      let message = `Restan definir ${(3 - actualPolygon.length)} puntos para la region`
      showMessage({
        message: message,
        type: "warning",
      }); 
    }
    else{
      //Enviar tmb la info del polygon a la base
      actualPolygon.push(coordinate) 
      actualPolygon.push(actualPolygon[0])
      this.setState({
        polygons: [...this.state.polygons,actualPolygon],
        markers:[],
        polygon: [],
      })
    }
  }
  

  onRegionChange = (region) => {
    console.log("Hace zoom",region)
    /*this.map.getCamera().then(camera => {
      console.log(camera)
      //if (camera.heading === 0) // is north
    });*/
    this.setState({region})
  }

  render() {
            const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

          <MapView
            //onMapReady = {()=> console.log(this.map)}
            ref={ref => {
              this.map = ref 
            }}
            pitchEnabled
            region={this.state.region}
            showsUserLocation={true}
            zoomControlEnabled
            style={styles.mapStyle}
            onPress = {this.onPress}
            onRegionChangeComplete = {this.onRegionChange} 
          > 
          { this.state.markers.map((m,index)=>{
              return (
                <Marker
                  key = {`marker-${index}`}
                  image= {require('../../assets/flag.png')}
                  //onPress = {this.onPressMark}
                  //onCalloutPress = {this.onPressCallout}
                  coordinate = {m}    
                />
              )
            })
          } 
            { this.state.polygons.length > 0 &&
                this.state.polygons.map((polygon,index) => {
                  return (
                    <Polygon
                      key = {index}
                      tappable = {false}
                      coordinates={polygon}
                      strokeColor = 'rgba(221,082,109,0.7)'
                      strokeWidth = {2}
                      fillColor = 'rgba(221,082,109,0.1)'
                    />
                  )
                })
            }
          </MapView>
        <FlashMessage duration={2000} position="top" />
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
  button:{
    width: 80
  }
});

/*

<Callout tooltip onPress = {this.onPressCallout}>
  <View style= {styles.callout}>
    <Text style= {{marginBottom:10, fontSize:18, borderBottomColor:'grey', borderBottomWidth: 1 }} >Confirmar Pedido</Text>
    <Text style= {{marginBottom:10, fontSize:18}} >Toca el modal para confirmar el pedido</Text>
  </View>
</Callout>
*/