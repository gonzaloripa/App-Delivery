import React, {useState, useRef} from 'react';
import {
  StyleSheet, View, TextInput, Text, TouchableHighlight, Modal, Alert , Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';
import Item from './Item';
const deviceWidth = Dimensions.get('window').width


export default ModalInactivo = (props) => {

	const [showInfo, setShowInfo] = useState(false)

	const hideModal = () => {
    //console.log(props)
    setShowInfo(false)
    props.hideModal(false)
	}

	const onPressInfo = () => {
		setShowInfo(!showInfo)
	}

	const cancelarDelivery = () => {
    console.log("Cancela ",props.info)
    //Mandar info a la base
    setShowInfo(false)
    props.cancelarDireccion()
	}

  const modalFooter = (    
    <View style={{flexDirection:'row', marginBottom:5}}>
        <TouchableHighlight
          underlayColor = "#00b1cc"
          style={{ ...styles.openButton, backgroundColor: "#008ca2" }}
          onPress={cancelarDelivery}
        >
          <Text style={styles.textStyle}>Cancelar Entrega</Text>
        </TouchableHighlight>
    </View>
  )

  const modalForm = (
      <View style={{alignItems:'center'}}>
        <TouchableHighlight
          underlayColor = "#00b1cc"
          style={{ ...styles.openButton, backgroundColor: "#008ca2" }}
          onPress={onPressInfo}
        >
          <Text style={styles.textStyle}>{(!showInfo)? '+' : '-' } Info</Text>
        </TouchableHighlight>                
        { showInfo && props.info.info.pedido &&
          <Text style={{fontSize:18, color:'grey'}}> {`Pedido: ${props.info.info.pedido}`}  </Text>
        }
        { showInfo && props.info.comment!= "" &&
          ( <View style={{alignItems:'center'}}>
              <View style={{height:1, width:200, margin:5, borderWidth:1, borderStyle:'dotted',borderColor:"grey", borderRadius:1 }}>
              </View>
              <Text style={{fontSize:16, color:'grey'}}> {`Comentarios: ${props.info.comment}`}  
              </Text>
            </View>
          )
        }
      </View>
  )
   

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
              title="Entrega Confirmada"
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

/*
<View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{...styles.centeredView, marginTop:60 }}>
          <View style={styles.modalView}>
            <View style={{padding:5}}>
              <Ionicons name="ios-close-circle-outline" size={24} color="grey" onPress={hideModal} />
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>Entrega Confirmada</Text>
              
              { info && <Text> {`Direccion: ${info.direccion}`} </Text>}

              <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={onPressInfo}
                >
                  <Text style={styles.textStyle}>{(!showInfo)? '+' : '-' } Info</Text>
                </TouchableHighlight>
              
                { showInfo &&
                  <Text> {`Pedido: ${info.pedido}`}  </Text>
                }
                { showInfo && props.info.comment != "" &&
                  <Text> {`Comentarios: ${props.info.comment}`}  </Text>
                }
              
              <View style={{marginTop:35, marginBottom:5}}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={cancelarDelivery}
                >
                  <Text style={styles.textStyle}>Cancelar Entrega</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    */