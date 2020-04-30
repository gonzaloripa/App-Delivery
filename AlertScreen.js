import React from 'react';
import {
  AsyncStorage,
  View, TextInput, Text, ScrollView, Image
} from 'react-native';
import Constants from "expo-constants";
import { Button, Modal, InputItem } from '@ant-design/react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';


export default class InfoPedidoScreen extends React.Component {

	constructor(props){
		super(props)

		this.state = {
		    montoFinal:0,
		    visible:true,
		}
	}

	render(){
	const footerButtons = [
      { text: (<Text style={{textAlign:'center', color:'#008ca2',fontFamily:'baloo-bhai-regular'}}> Cancelar </Text>), onPress: () => console.log("Cancelo")},
	  { text: (<Text style={{textAlign:'center', color:'#008ca2',fontFamily:'baloo-bhai-regular'}}> Ok </Text>), onPress: () => { this.props.confirmarOrden() }},
	];
	//const infoPedido = this.props.infoPedido 
	
	return(
		<Modal
			onClose = {() => this.props.closeModal()}
		  	style = {{backgroundColor:'#f9f5ed', width:'80%', height:'60%' }}
		  	bodyStyle = {{backgroundColor:'#f9f5ed', width:'100%', height:'85%' }}
            title = {(
            	<Text style={{fontSize:24, color:'#008ca2',fontFamily:'baloo-bhai-regular'}}> 
            		Finalizar Orden
            	</Text>)}
            closable={true}
            maskClosable={true}
            visible={this.props.showModal}
            animationType="slide-up"
            transparent={true}
            footer={footerButtons}
        >
	        <View style= {{flex:1,flexDirection:'column', alignItems:'center', backgroundColor:'#f9f5ed'}}>
		        <View style= {{marginTop:'5%',flex:1,flexDirection:'column', width:'80%'}} >            				  
	          	    <Text style={{ textAlign:'center',fontSize:18, fontFamily:'work-sans-regular', color:'#600080' }}>
						Estas seguro que queres finalizar la orden?
	          	    </Text>
	          	    <Text style={{ marginTop:'5%',textAlign:'center',fontSize:18, fontFamily:'work-sans-regular', color:'#4d4d4d' }}>
						Recorda que solo se aplica la promo semanal si  	
	          	    </Text>
	          	    <Text style={{ textAlign:'center',fontSize:18, fontFamily:'work-sans-regular', color:'#4d4d4d' }}>
						seleccionaste los 5 dias de la misma semana  	
	          	    </Text>    	          	          		  
	  		    </View>
			</View>
        </Modal>
		)
	}
}
	

/*
var count = 0
this.props.pedidoFinal.forEach((ped, ind, array)=>{
	count += ped.precio
	if(ind == (array.length -1)){
		this.setState({
			montoFinal:count
		})
	}
})
}

confirmarPedido = () => {		
this.props.finalizarPedido(this.state.montoFinal)	
}*/