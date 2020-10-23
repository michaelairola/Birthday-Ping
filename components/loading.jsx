import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles.js';

export const LoadingPage = () => {
	return(
		<View style={styles.container}>
		  <Text>Loading...</Text> 
		</View>
	)
}