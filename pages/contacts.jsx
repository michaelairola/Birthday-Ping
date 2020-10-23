import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles.js';
import { getContacts } from "../db";
import { LoadingPage } from "../components/loading";
import { NoContacts } from "../components/NoContacts";

export function ContactsPage() {
	const [ isLoading, setLoading ] = useState(true);
	const [ contacts, setContacts ] = useState([]);
	useEffect(() => {
	  	getContacts().then(cs => {
		    setContacts(cs);
		    setLoading(false);
		})
	    return () => {}
	}, [])
	return isLoading ? <LoadingPage/> : !contacts.length ? <NoContacts/> : 
	  	contacts.map((contact,i) => (
	  		<View styles={styles.container}>
	  			<Text>{i} contact!</Text>
	  		</View>
  		))
}