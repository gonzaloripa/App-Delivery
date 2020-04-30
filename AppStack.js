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
import DrawerAdmin from './DrawerAdmin';
import DrawerUser from './DrawerUser';

const font_size = (PixelRatio.get() <= 2) ? 15 : 17
const Stack = createStackNavigator();

export default AppStack = ({navigation}) => {
	//const [userToken, setUserToken] = useState(null)
 	
 	useEffect(()=>{
	 	console.log(navigation)
	 	//props.navigation.setParams(props.navigation.state.params)
  	}, []);

	return (
	    <NavigationContainer>
		    <Stack.Navigator
		      	headerMode = "screen"
		  		screenOptions={{
					headerStyle:{ backgroundColor:'#008ca2' },
				    headerTitleAlign:'center', 
				    headerTitleStyle:{fontSize:24,color:'#f9f5ed', fontFamily:'baloo-bhai-regular'},
			  		headerLeft: () =>(
				      <Ionicons style={{marginLeft:10}} name="md-menu" size={32} color="#f9f5ed" 
				          onPress={async ()=> { navigation.openDrawer()}} />
				    ),//Da error al querer abrir
				    headerRight: () => (
				      <AntDesign style={{marginRight:10}} name="logout" size={32} color="#f9f5ed" 
				        onPress={async ()=> {await AsyncStorage.clear(); navigation.navigate('AuthLoading');}} />
				    ),//Se puede cerrar sesion solo desde aca
				}}	
		    >
		      { (navigation.state.params.token == 'admin') ?
			      <Stack.Screen name="DrawerAdmin" component={DrawerAdmin}  />
			      :
			      <Stack.Screen name="DrawerUser" component={DrawerUser}  />
		  	  }
		    </Stack.Navigator>
	  	</NavigationContainer>
	);
}






