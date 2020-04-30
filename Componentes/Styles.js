import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  centeredView: {
    justifyContent: "flex-start",
    alignItems: "center",
    //marginTop: 40
  },
   modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalBody: {
    paddingTop: 5,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: "center",
  },
  openButton: {
    //backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:18,
    fontWeight: 'bold', 
    borderBottomColor:'grey', 
    borderBottomWidth: 1
  },
});