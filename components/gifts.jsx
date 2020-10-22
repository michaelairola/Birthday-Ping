import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { styles } from '../styles.js';
import { GIFT_ROUTE } from "../routes.js";

export function GiftsPage({ navigation }) {
  return(
    <View style={styles.container}>
      <Text>Gifts Page</Text>
      <Button 
        title="Go To Gift Page"
        onPress={() => navigation.navigate(GIFT_ROUTE)}
      />
    </View>
  )
}