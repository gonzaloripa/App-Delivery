import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View, Button, TextInput, Text, Image, PixelRatio
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MapAdmin from './MapAdmin';
import Layout from '../../Layout';

const font_size = (PixelRatio.get() <= 2) ? 15 : 17
const Stack = createStackNavigator();
const LayoutStack = createStackNavigator();

const MapStack = (props) => {
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
          }}
    />    
    </Stack.Navigator>
  );
}

const CustomLayout = (props) => {
  return (
    <LayoutStack.Navigator
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
    <LayoutStack.Screen
          name="Layout"
          component={Layout}
          options={{
              title: 'Page',
          }}
    />    
    </LayoutStack.Navigator>
  );
}


const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      swipeEnabled = {false}
      //headerMode:'float',
      initialRouteName= 'Map'
      tabBarOptions={{
        activeTintColor: '#f9f5ed',
        tabStyle: { 
          backgroundColor: '#008ca2',
          height:'90%',
          minHeight:'90%',
          maxHeight:'100%',
        }
      }}
    >
      <Tab.Screen 
          name="Map" 
          component={MapStack} 
          options={{
            title: 'Map',
            tabBarLabel : ({focused}) =>
            (<View style={{alignItems:'center', justifyContent:'center'}}>
              <MaterialCommunityIcons name="google-maps" size={23} color= {focused ? '#f9f5ed' : 'black'}/> 
              <Text style={{color: (focused ? '#f9f5ed' : 'black'), fontSize: font_size, fontFamily:'baloo-bhai-regular'}}> Mapa </Text>
            </View>
            )
          }}
      />
      <Tab.Screen 
          name="Page" 
          component={CustomLayout} 
          options={{
            title: 'Page',
            tabBarLabel : ({focused}) =>
            (<View style={{alignItems:'center', justifyContent:'center'}}>
              <Ionicons name="ios-gift" size={23} color= {focused ? '#f9f5ed' : 'black'}/> 
              <Text style={{color: (focused ? '#f9f5ed' : 'black'), fontSize: font_size, fontFamily:'baloo-bhai-regular'}}> Page </Text>
            </View>
            )
          }} 
      />
    </Tab.Navigator>
  );
}




