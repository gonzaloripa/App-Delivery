import React, {useState, useEffect} from 'react';
import {
  AsyncStorage, SafeAreaView, StyleSheet, Animated, Dimensions, StatusBar,
  View, Text, FlatList
} from 'react-native';
import { Button } from '@ant-design/react-native';
import * as Font from 'expo-font';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Constants from "expo-constants";

//import { NavigationEvents } from 'react-navigation';
const deviceWidth = Dimensions.get('window').width + 50

const DATA = [
{
  id: '0',
  title: 'First Item',
}
,
{
  id: '1',
  title: 'Second Item',
},
{
  id: '2',
  title: 'Third Item',
},
{
  id: '3',
  title: 'Fourth Item',
},
];

const Item = ({ title, index}) =>{
  return (
    <AnimatedView style={styles.item} index={index}>
        <View style={styles.title}>
          <Text style={styles.titleText}> {title} </Text>
        </View>
        <View style = {styles.body}>
          <Text style={styles.bodyText}> 
            Texto Texto Texto Texto Texto Texto Texto
            Texto Texto Texto Texto Texto Texto Texto
          </Text>
          <View style={styles.dotted}>
          </View>
          <Text style={styles.bodyText}>
            Texto Texto Texto Texto Texto Texto Texto
            Texto Texto Texto Texto Texto Texto Texto
          </Text>
        </View>
    </AnimatedView>
  );
}

const AnimatedView = props => {
  //Se crea un valor de animación
  const initialValue = 0.3 //((props.index % 2) === 0 ) ? (-deviceWidth) : (deviceWidth * 2)
  const [valueAnim] = useState(new Animated.Value(initialValue)); // Initial value for opacity: 0

  React.useEffect(() => {
    /*console.log("Props ", props.index % 2, )
    Animated.timing(valueAnim, { //Se maneja la animacion de fadeAnim(opacity) mediante Animated.timing
      toValue: 0,
      duration: 2000,
    }).start();*/
    
    Animated.spring(
      valueAnim,
      {
        toValue: 1,
        friction: 2,
        tension:5
      }
    ).start()
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        //left: valueAnim
        transform: [{scale: valueAnim}]
        //opacity: valueAnim, // Se engancha props style (opacity) al Animated.value creado(fadeAnim)
      }}>
      {props.children}
    </Animated.View>
  );
};

const Layout = (props) => {

  const [items,setItems] = useState([DATA[0], DATA[1]])

  useEffect( () => {
    fetchData = async () => {   
      await Font.loadAsync({
        'baloo-bhai-regular': require('./assets/BalooBhai-Regular.ttf'),
      })
    }
    fetchData()
  },[])

  const onScrollEndDrag = (e) => { 
    let index = items.length   
    if(DATA[index]){
      //console.log("Entra ", items, DATA[index])
      setItems([...items, DATA[index]])
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        onScrollEndDrag = {onScrollEndDrag}
        data={items}
        renderItem={({ item, index }) => <Item key={index} title={item.title} index={index}/>}
      />
      
    </SafeAreaView>      
  );
}

Layout.navigationOptions = ({navigation}) => (
  { 
    headerStyle:{ backgroundColor:'#008ca2'},
    headerTitle: 'Page',
    headerTitleAlign:'center', 
    headerTitleStyle:{fontSize:24, color:'#f9f5ed', fontFamily: 'baloo-bhai-regular'},
    headerLeft: () =>(
    <Ionicons style={{marginLeft:10}} name="md-menu" size={32} color="#f9f5ed" 
        onPress={async ()=> { navigation.openDrawer()}} />
    ),
    headerRight: () => (
      <AntDesign style={{marginRight:10}} name="logout" size={32} color="#f9f5ed" 
          onPress={async ()=> {await AsyncStorage.clear(); navigation.navigate('AuthLoading');}} />
    ),
  }
);

//Styles final
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f9f5ed'
  },
  flatList:{
    paddingTop: Constants.statusBarHeight,
  },
  item: {
    flex:1,
    borderRadius:20,
    backgroundColor: '#dd526d', //white: borderRadius para arriba
    //padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: deviceWidth,
    alignItems:'center'
  },
  title:{
    flex:1,
  },
  titleText: {
    textAlign:'center',
    padding:10,

    //backgroundColor:'#dd526d', 
    borderRadius:1,
    fontSize: 32,
    color:"#f9f5ed",
    fontWeight:"bold"
  },
  body:{
    alignItems:'center',
    flex:4,
    borderRadius:20,
    //marginTop:10,
    padding:20, 
    backgroundColor:"white",
    //height:300,
  },
  bodyText:{
    fontSize: 20,
    color:"grey"
  },
  dotted:{
    height:1,
    width:200,
    margin:20,
    //borderBottomWidth:1,
    //borderBottomColor:"grey", 
    borderWidth:1,
    borderColor:"#dd526d",
    borderStyle:'dotted', 
    borderRadius:1,
  }
});


export default Layout;

/*
//Styles tipo card
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    flex:1,
    borderRadius:20,
    backgroundColor: 'white', //white: borderRadius para arriba
    //padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: deviceWidth,
    //alignItems:'center'
  },
  title:{
    flex:1,
    //borderRadius:20,
  },
  titleText: {
    textAlign:'center',
    padding:10, 
    backgroundColor:'#dd526d', 
    borderRadius:20,
    fontSize: 32,
    color:"white",
    fontWeight:"bold"
  },
  body:{
    flex:4,
    borderRadius:20,
    //marginTop:10,
    padding:20, 
    backgroundColor:"white",
    //height:300,
  },
  bodyText:{
    fontSize: 20,
    color:"black"
  }
});
*/