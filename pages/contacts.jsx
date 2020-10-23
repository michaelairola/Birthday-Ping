import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
import { CONTACT_ROUTE } from "../routes.js";

export function ContactsPage({ navigation }) {
  return(
    <View style={styles.container}>
      <Text>Contacts Page</Text>
      <Button 
        title="Go To Contact Page"
        onPress={() => navigation.navigate(CONTACT_ROUTE)}
      />
    </View>
  )
}