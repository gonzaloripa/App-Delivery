import React, {useState, useEffect} from 'react';
import {
  AsyncStorage, View, Button, Text
} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { useIsDrawerOpen, createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabAdmin from './Perfiles/Admin/BottomTabAdmin';
import BottomTabUser from './Perfiles/Usuario/BottomTabUser';
import ProfileScreen from './ProfileScreen';
import ContactScreen from './ContactScreen';

const ProfileStack = createStackNavigator();
const ContactStack = createStackNavigator();

const options = {
	headerStyle:{ backgroundColor:'#008ca2' },
    headerTitleAlign:'center', 
    headerTitleStyle:{fontSize:24,color:'#f9f5ed', fontFamily:'baloo-bhai-regular'},
}

const Contact = (props) => {
	useEffect(()=>{
	 	console.log("Contact ",props)
	 	//navigation.setParams()
  	}, []);

	return (
		    <ContactStack.Navigator
		      	headerMode = "screen" 		 
		      	screenOptions = {{
		      		...options,
			      	headerLeft: () =>(
				      <Ionicons style={{marginLeft:10}} name="md-menu" size={32} color="#f9f5ed" 
				          onPress={async ()=> { props.navigation.openDrawer()}} />
				      ),   	
		      	}}
			    >
  		      <ContactStack.Screen name="Contacto" component={ContactScreen} />
		    </ContactStack.Navigator>
	);
}

const Profile = (props) => {
	return (
		    <ProfileStack.Navigator
		      	headerMode = "screen" 		 
		      	screenOptions = {{
		      		...options,
			      	headerLeft: () =>(
				      <Ionicons style={{marginLeft:10}} name="md-menu" size={32} color="#f9f5ed" 
				          onPress={async ()=> { props.navigation.openDrawer()}} />
				      ),   	
		      	}}   	
		    >
  		      <ProfileStack.Screen name="Usuario" component={ProfileScreen} />
		    </ProfileStack.Navigator>
	);
}

const DrawerNavigator = createDrawerNavigator();


function CustomDrawerContent(props) {
  //const isDrawerOpen = useIsDrawerOpen();

  return (
    <DrawerContentScrollView {...props}>
	    <View
	      style={{
	      	top: -5,
	        backgroundColor: '#dd526d',
	        height: 120,
	        alignItems: 'center',
	        justifyContent: 'center',
	      }}
	    >
	      <Text style={{ color: '#f9f5ed', fontSize: 30, fontWeight: 'bold' }}>
	        Menu
	      </Text>
	    </View>
      	<DrawerItemList {...props} />
        <DrawerItem
	      	style = {{ marginTop:320}}
	      	labelStyle = {{fontSize: 18, fontWeight: 'bold'}}
	        activeTintColor = '#dd526d'
	        inactiveTintColor ='#008ca2'
	        icon= {(focused) => (<FontAwesome style={{marginLeft:5}} name="sign-out" size={28} color={(focused) ? "#008ca2" : '#dd526d'}/>)}
	        label = "Salir"
	        onPress = {() => { props.navigation.closeDrawer(); props.setDrawerState(true);} }
        />
    </DrawerContentScrollView>
  );
}

export default Drawer = ({navigation}) => {
 	
 	useEffect(()=>{
	 	navigation.setParams({Token:'gonza'})
	 	//console.log(props.navigation.state.params.token)

  	}, []);

 	const closeSession = (value) => {
		if(value){
	 		//console.log("Drawer ",navigation, value)
	 		(async () => {
	 			await AsyncStorage.clear()
	 			navigation.navigate("AuthLoading")
	 		})()	
	 	}
 	}

	return (
		<NavigationContainer>
		    <DrawerNavigator.Navigator
		      //drawerWidth:'55%',
		      backBehaviour = "history"
		      edgeWidth = {100}
		      initialRouteName= 'Tab'
		      title= 'Menu'
  		      drawerStyle={{
		      	backgroundColor:'#f9f5ed',
		      	//width:300
		      }}
		      drawerContentOptions= {{
		        activeTintColor: '#dd526d',
		        inactiveTintColor:'#008ca2',
		        labelStyle:{
		        	fontSize: 18,
		        	fontWeight: 'bold'
		        }
		      }}
		      drawerType='front'
		      drawerContent = { props => <CustomDrawerContent {...props} setDrawerState={closeSession} />}
	  		  
		    >	
		      { (navigation.state.params.token == 'admin') ?
			      <DrawerNavigator.Screen 
			        name="Tab" 
			        component={BottomTabAdmin}
			        options={{
	      				drawerIcon: ({color})=><MaterialCommunityIcons style={{marginLeft:3}} name="home-outline" size={32} color={color}/>
		      		}}/>
			      :
			      <DrawerNavigator.Screen 
			        name="Tab" 
			        component={BottomTabUser}  
			        options={{
		      			drawerIcon: ({color})=><MaterialCommunityIcons style={{marginLeft:3}} name="home-outline" size={32} color={color}/>
		      		}}/>
			  }
		      <DrawerNavigator.Screen 
	      		name="Perfil" 
	      		component={Profile} 
	      		options={{
		      		drawerIcon: ({color})=><FontAwesome5 style={{marginLeft:5}} name="user-circle" size={28} color={color}/>
		      	}}/>
  		      <DrawerNavigator.Screen 
  		        name="Contacto"  
  		        component={Contact}
	      		options={{
		      		drawerIcon: ({color})=><MaterialCommunityIcons style={{marginLeft:5}} name="message-text-outline" size={28} color={color}/>
		      	}}/>
		    </DrawerNavigator.Navigator>
		</NavigationContainer>
	);
}







