import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
import { LoadingPage } from "../components/loading";
import { getSettings } from "../db";

export function SettingsPage() {
	const [ isLoading, setLoading ] = useState(true);
	const [ settings, setSettings ] = useState([]);
	useEffect(() => {
	  	getSettings().then(cs => {
		    setSettings(cs);
		    setLoading(false);
		})
	    return () => {}
	}, [])
	return isLoading ? <LoadingPage/> : (
		<View style={styles.container}>
		  <Text>Settings</Text>
		</View>
	)
}
