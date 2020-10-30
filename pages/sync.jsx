import React, { useState } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import { styles } from '../styles.js';
import { connectToStore, receiveSettings } from "../db";
import SettingsList from "react-native-settings-list";
var bgColor = '#DCE3F4';

import { CONTACTS_ROUTE } from "../routes.js";

import { CircleFade } from 'react-native-animated-spinkit'
import { getPhoneContacts } from "../vendor-permissions";
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const Synced = (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
    <Text style={{ color: "#c8c7cc" }}>Synced   </Text>
    <AntDesign name="check" size={24} color="black" />
  </View>
)
const NotSynced = (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
    <Text style={{ color: "#c8c7cc" }}>Not Synced   </Text>
    <AntDesign name="sync" size={24} color="blue" />
  </View>
  )
const syncedStatus = ({ isFetching, synced }) => 
  isFetching ? <CircleFade size={30} style={{ marginRight: 10 }}/> : 
  synced ? Synced : NotSynced 

const SyncPage = ({ navigation, settings: { Permissions: { phone, fb, google } } }) => {
	return (
	<View style={{ flex: 1 }}>
      <View style={{ backgroundColor:'#EFEFF4', flex:1 }}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerText="Sync Contacts from 3rd party vendors" />
          <SettingsList.Item
            hasNavArrow={false}
            title='Phone Contacts'
            arrowIcon={syncedStatus(phone)}
            onPress={getPhoneContacts(true)}
          />
        </SettingsList>
      </View>
	</View>
    )
}
export default connectToStore(SyncPage)