import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
import { getPhoneContacts } from "../vendor-permissions";

export function NoContacts({ navigation }) {
  return(
    <View style={styles.center}>
      <Text>Oh no! It looks like you have no contacts</Text>
      <Button 
        title="Click here to sync contacts from phone"
        onPress={getPhoneContacts}
      />
    </View>
  )
}