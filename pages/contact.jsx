import * as React from 'react';
import { connectToStore } from "../db";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

function ContactPage({ route: { params: { contact } }, contactsList, settings: { DarkMode } }) {
  // let contact = contactsList[i].contacts[key];
  console.log(contact);
  return (
      <View style={styles(DarkMode).container}>
          <View style={styles(DarkMode).header}></View>
          <Image style={styles(DarkMode).avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles(DarkMode).body}>
            <View style={styles(DarkMode).bodyContent}>
              <Text style={styles(DarkMode).name}>{contact.name}</Text>
              <View style={styles(DarkMode).medias}>
              	<Button title="hi"></Button>
              </View>
            </View>
        </View>
      </View>
    );
}
const styles = DarkMode => StyleSheet.create({
  container: {
  	backgroundColor: DarkMode ? "#212121" : 'white',
  },
  header:{
    backgroundColor: DarkMode ? "#121212" : undefined,
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130,
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
  	fontSize: 22, 
  	color: DarkMode ? "white" : "black",
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  medias: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});

export default connectToStore(ContactPage);
