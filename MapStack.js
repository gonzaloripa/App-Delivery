import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View, Button, TextInput, Text, Image, PixelRatio
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import MapAdmin from './Mapa/MapAdmin';
import MapUser from './Mapa/MapaUser';

const font_size = (PixelRatio.get() <= 2) ? 15 : 17
const Stack = createStackNavigator();

export default MapStack = (props) => {

 	useEffect(()=>{
	 	//navigation.setParams()
	 	console.log("Map stack ",props.navigation)

  	}, []);

	return (
	  <Stack.Navigator
    	headerMode= 'screen'
    	screenOptions={{
		    headerStyle:{ backgroundColor:'#008ca2' },
		    headerTitleAlign:'center', 
		    headerTitleStyle:{fontSize:24,color:'#f9f5ed', fontFamily:'baloo-bhai-regular'},
		    headerLeft: () =>(
		      <Ionicons style={{marginLeft:10}} name="md-menu" size={32} color="#f9f5ed" 
		          onPress={async ()=> { props.navigation.openDrawer()}} />
		      ),
  		}}
	  >	   
		<Stack.Screen
	        name="MapaAdmin"
	        component={MapAdmin}
	        options={{
	          	title: 'Mapa Admin',
	         	/*header: ({ scene, previous, navigation }) => {
				  const { options } = scene.descriptor;
				  const title =	options.title				  
				  return (
				    <MyHeader
				      title={title}
				      leftButton={
				        previous ? <MyBackButton onPress={navigation.goBack} /> : undefined
				      }
				      style={options.headerStyle}
				    />
				  );
				};*/
			}}
        />		
	  </Stack.Navigator>
	);
}






