import * as React from 'react';
import { connectToStore } from "../db";
import { Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
import { SYNC_ROUTE } from '../routes.js';
// import { getPhoneContacts } from "../vendor-permissions";

const NoContacts = ({ navigation, settings: { DarkMode } }) => {
  return(
    <View style={{
    	backgroundColor: DarkMode ? "black" : '#EFEFF4', 
    	flex:1, alignItems: "center", justifyContent: "center" 
    }}>
      <Text style={{color: DarkMode ? "white" : "black" }}>Oh no! It looks like you have no contacts</Text>
      <Button 
        title="Click here to sync contacts"
        onPress={() => navigation.navigate(SYNC_ROUTE)}
      />
    </View>
  )
}
export default connectToStore(NoContacts)