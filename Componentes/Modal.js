import React, {useState, useRef} from 'react';
import {
  StyleSheet, View, TextInput, Text, TouchableHighlight, Modal, Alert , Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';
import Item from './Item';
const deviceWidth = Dimensions.get('window').width

export default ModalMap = (props) => {

	const [coment, setComent] = useState("")
	const [showInput, setShowInput] = useState(false)
  const [borderColorInput,setBorderColorInput] = useState("grey")
  const [borderText, setBorderText] = useState("")

	const hideModal = () => {
      console.log(props)
      setShowInput(false)
	    props.hideModal(false)
	}

	const onChangeText = (text) => {
		setComent(text)
	}

	const onPressInfo = () => {
		setShowInput(!showInput)
    setBorderColorInput("grey")
    setBorderText("")
	}

	const confirmDelivery = () => {
    //console.log(coment)
    //Mandar info a la base
    setShowInput(false)
    props.confirmarDireccion(coment)
	}

  const onFocusInput = (value) => {
    console.log("On focus ")
    setBorderColorInput("#008ca2")
    setBorderText("Comentarios")
  }

  const modalFooter= (    
      <View style={{flexDirection:'row', marginBottom:5}}>
          <TouchableHighlight
            underlayColor = "#00b1cc"
            style={{ ...styles.openButton, backgroundColor: "#008ca2" }}
            onPress={hideModal}
          >
            <Text style={styles.textStyle}>Cancelar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor = "#00b1cc"
            style={{ ...styles.openButton, backgroundColor: "#008ca2" }}
            onPress={confirmDelivery}
          >
            <Text style={styles.textStyle}>Confirmar</Text>
          </TouchableHighlight>
      </View>
  )
  const modalForm =                   
      (<View>
        <TouchableHighlight
          underlayColor = "#00b1cc"
          style={{ ...styles.openButton, backgroundColor: "#008ca2" }}
          onPress={onPressInfo}
        >
          <Text style={styles.textStyle}>{(!showInput)? '+' : '-' } Comentario</Text>
        </TouchableHighlight>                
        {showInput &&
          <View style={styles2.container}>
            { borderText != "" &&
              <View style={styles2.labelContainer}>
                <Text style={{color:"grey"}}>{borderText}</Text>
              </View>
            }
            <TextInput 
              style={{...styles2.textInput, borderColor:borderColorInput}}
              maxLength = {60}
              onFocus = {() => onFocusInput(input)}
              placeholder = {(borderText == "") ? "Comentarios" : ""}
              placeholderTextColor = "grey"
              onChangeText={text => onChangeText(text)}
              value={coment}
              multiline
              numberOfLines={3}
            />
          </View>
        }
      </View>
  )
   
  const input = useRef()
	return(
		<View style={{...styles.centeredView, flex:1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{...styles.centeredView, marginTop:60, height:deviceWidth}}>
            <Item
              title="Confirmar Entrega"
              //index={0}
              bodyText= { props.info && <Text>{`Direccion: ${props.info.info.direccion}`} </Text> }
              bodyFooter = { modalFooter }
              bodyForm = { modalForm }
            >
              <View style={{padding:10}}>
                <Ionicons name="ios-close-circle-outline" size={24} color="#f9f5ed" onPress={hideModal} />
              </View>
            </Item>
          </View>
        </Modal>
    </View>
	)
}

const styles2 = StyleSheet.create({
  container: {
    margin:5,
    height: 65, 
    //position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    top: -15,
    left:50,
    padding: 5,
    zIndex: 50,
  },
  textInput: {
    maxHeight:60 , 
    color:'black',
    fontSize:16,
    width:180, 
    borderRadius:10, 
    padding:5, 
    borderWidth: 2,
    flex: 1, 
    paddingHorizontal: 20,
    width:200
  }
})



/*

const CustomTextInput = ({ label, style, ...props}) => (
  <View style={styles2.container}>
    <View style={styles2.labelContainer}>
      <Text>{label}</Text>
    </View>
    <TextInput 
      style={{...styles2.textInput, ...style }}
    />
  </View>
);


<View style={styles.modalView}>
<View style={{padding:5}}>
  <Ionicons name="ios-close-circle-outline" size={24} color="grey" onPress={hideModal} />
</View>
<View style={styles.modalBody}>
  <Text style={styles.modalText}>Confirmar Entrega</Text>                
  {props.info && <Text>{`Direccion: ${props.info.info.direccion}`} </Text> }
  <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={onPressInfo}
    >
      <Text style={styles.textStyle}>{(!showInput)? '+' : '-' } Comentario</Text>
    </TouchableHighlight>
  
  {showInput &&
    <TextInput
      autoFocus
      placeholder = "Comentarios"
      placeolderTextColor = "grey"
      style={{ height: 50, width:140, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={coment}
      multiline
      numberOfLines={3}
    />
  }
  
  <View style={{flexDirection:'row', marginTop:35, marginBottom:5}}>
    <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={hideModal}
    >
      <Text style={styles.textStyle}>Cancelar</Text>
    </TouchableHighlight>

    <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
      onPress={confirmDelivery}
    >
      <Text style={styles.textStyle}>Confirmar</Text>
    </TouchableHighlight>
  </View>
</View>
</View>

*/