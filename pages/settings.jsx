import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
import { LoadingPage } from "../components/loading";

export function SettingsPage() {
	const [ isLoading, setLoading ] = useState(true);
	const [ settings, setSettings ] = useState([]);
	useEffect(() => {
	    return () => {}
	}, [])
	return isLoading ? <LoadingPage/> : (
		<View style={styles.container}>
		  <Text>Settings</Text>
		</View>
	)
}
