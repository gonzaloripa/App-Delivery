import React, {useState, useEffect} from 'react';
import {
   SafeAreaView, StyleSheet, Animated, Dimensions, View, Text
} from 'react-native';
import Constants from "expo-constants";
import * as Font from 'expo-font';

const deviceWidth = Dimensions.get('window').width + 50

const Item = (props) =>{
  return (
    <AnimatedView style={styles.item} index={props.index}>
        <View style={{flexDirection:'row', flex:1}}>
          <View style={{flex:1}}>
          {props.children}
          </View>
          <View style={{flex:5, flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.titleText}> {props.title} </Text>
          </View>
        </View>
        
        <View style = {{...styles.body,flex:4}}>
          <View style={{ flex:1, alignItems:'center'}}>
            <Text style={{...styles.bodyText}}> 
              {props.bodyText}
            </Text>
            <View style={styles.dotted}>
            </View>
          </View>
          <View style={{ flex:2, padding:5}}>
            {props.bodyForm}
          </View>
          <View style={{ flex:1, flexDirection:'row', alignItems:'flex-end'}}>
            {props.bodyFooter}
          </View>
        </View>
    </AnimatedView>
  );
}

const AnimatedView = props => {
  //Se crea un valor de animación
  const initialValue = 0.3//((props.index % 2) === 0 ) ? (-deviceWidth) : (deviceWidth * 2)
  const [valueAnim] = useState(new Animated.Value(initialValue)); // Initial value for opacity: 0

  React.useEffect(() => {
    //console.log("Props ", props.index % 2, )
    Animated.spring(
      valueAnim,
      {
        toValue: 1,
        friction: 3,
        tension:1
      }
    ).start()
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{scale: valueAnim}]
        //left: valueAnim
        //opacity: valueAnim, // Se engancha props style (opacity) al Animated.value creado(fadeAnim)
      }}>
      {props.children}
    </Animated.View>
  );
};


//Styles 2
const styles = StyleSheet.create({
  item: {
    flex:1,
    borderRadius:20,
    backgroundColor: '#dd526d', //white: borderRadius para arriba
    //padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //height: deviceWidth,
    //alignItems:'center'
  },
  title:{
    flex:1,
  },
  titleText: {
    //textAlign:'center',
    //padding:10,
    //backgroundColor:'#dd526d', 
    borderRadius:1,
    fontSize: 24,
    color:"#f9f5ed",
    fontWeight:"bold"
  },
  body:{
    alignItems:'center',
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


export default Item;

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