import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
// import { GIFT_ROUTE } from "../routes.js";
import { connectToStore } from "../db";
import { LoadingPage } from "../components/loading";
import NoContacts from "../components/NoContacts";

function GiftsPage({ navigation, organized_contacts }) {
	return !organized_contacts.length ? <NoContacts navigation={navigation}/> : 
	  	organized_contacts.map((contact,i) => (
	  		<View key={i} styles={styles.container}>
	  			<Text>{i} gift!</Text>
	  		</View>
  		))
}
export default connectToStore(GiftsPage);