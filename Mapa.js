import React from 'react';
import {
 StyleSheet, Dimensions, View, TextInput, Text
} from 'react-native';
import Constants from "expo-constants";
import { Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { Divider, Tooltip } from 'react-native-elements';
import MapView, {Polygon, Polyline, Marker, Callout} from 'react-native-maps';
import ModalMap from './Mapa/Modal';
import isPointInPolygon from 'geolib/es/isPointInPolygon'


const { manifest } = Constants;
const uri = "https://app-viandas.herokuapp.com" //`http://${manifest.debuggerHost.split(':').shift()}:5000`;


export default class Mapa extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      puntaje:0,
      modalVisible:false,
      coordinates:[]
    }
  }

  static navigationOptions = ({navigation}) => (
    { 
      headerStyle:{ backgroundColor:'#008ca2' },
      headerTitle: 'Mapa', 
      headerTitleStyle:{fontWeight: '300',fontFamily:'baloo-bhai-regular',color:'#f9f5ed', textAlign:"center",flex:1},
      headerLeft: () =>(
      <Ionicons style={{marginLeft:10}} name="md-menu" size={32} color="#f9f5ed" 
          onPress={async ()=> { navigation.openDrawer()}} />
      ),
      headerRight: () => (
        <AntDesign style={{marginRight:10}} name="logout" size={32} color="#f9f5ed" 
            onPress={async ()=> {await AsyncStorage.clear(); navigation.navigate('AuthLoading');}} />
      ),
      tabBarLabel:({focused}) =>
      (<View style={{alignItems:'center', justifyContent:'center'}}>
        <Ionicons name="ios-gift" size={24} color= {focused ? '#f9f5ed' : 'black'}/> 
        <Text style={{color: (focused ? '#f9f5ed' : 'black'), fontSize: 14}}> Mapa</Text>
      </View>
      )
    }
  );

  onPress = (e) => {
    let coordinate = e.nativeEvent.coordinate
    let inside = isPointInPolygon(coordinate, [
                {
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
                }]
    )
    console.log("Toca coordenada ",coordinate, inside)
    if(inside)
      this.setState({
        coordinates: [...this.state.coordinates, coordinate]
      })
      //else Show Message or something
  }
  

  onPressCallout = (e) => {
    console.log("Toca callout ",e.nativeEvent.coordinate)
    this.marker1.hideCallout()

  }

  onPressMark = (e) => {
    console.log("Toca marca ",e.nativeEvent.coordinate)
    this.setState({modalVisible:true})

  }

  setModalVisible = (value) => {
    this.setState({modalVisible:value})
  }



  render() {
    return (
      <View style={styles.container}>
          <ModalMap 
            setVisible = {(value) => this.setModalVisible(value) }
            modalVisible = {this.state.modalVisible}
          />
          <MapView
            region={{
              latitude: -34.9208532,
              longitude: -57.9564128,
              latitudeDelta: 0.06,
              longitudeDelta: 0.08,
            }} 
            zoomControlEnabled
            style={styles.mapStyle}
            onPress = {this.onPress} 
          >
            {
              this.state.coordinates.map((coor,index) => {
                return (
                  <Marker
                    key = {index}
                    ref={ref => {
                      this.marker1 = ref;
                    }}
                    onPress = {this.onPressMark}
                    //onCalloutPress = {this.onPressCallout}
                    coordinate = {coor}    
                  />   
                )             
              }) 
            }
            <Polygon
              tappable = {false}
              coordinates={[
                {
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
                },

              ]}
              strokeColor = 'rgba(221,082,109,0.7)'
              strokeWidth = {2}
              fillColor = 'rgba(221,082,109,0.1)'

            />
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
  button:{
    width: 80
  }
});

/*
-Ver alternativas para el Callout. Mostrar info del pedido, confirmarlo o cancelarlo.

onPress = (e) => {
    let coordinate = e.nativeEvent.coordinate
    let inside = isPointInPolygon(coordinate, [
                {
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
                }]
    )
    //console.log("Toca coordenada ",coordinate, inside)
    if(inside){
      let data = {
        coordinate: coordinate, 
        isActive: true, 
        info:{direccion:"44 y 31", pedido:"3 Milanesas con papas"}
      }
      this.setState({
        markers: [...this.state.markers, data]
      })
      //else Show Message or something
    }
  }


<Callout tooltip onPress = {this.onPressCallout}>
              <View style= {styles.callout}>
                <Text style= {{marginBottom:10, fontSize:18, borderBottomColor:'grey', borderBottomWidth: 1 }} >Confirmar Pedido</Text>
                <Text style= {{marginBottom:10, fontSize:18}} >Toca el modal para confirmar el pedido</Text>
              </View>
            </Callout>
*/