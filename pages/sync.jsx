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

const Synced = DarkMode => (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
    <Text style={{ color: "#c8c7cc" }}>Synced   </Text>
    <AntDesign name="check" size={24} color={DarkMode ? "white" : "black"} />
  </View>
)
const NotSynced = DarkMode => (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
    <Text style={{ color: "#c8c7cc" }}>Not Synced   </Text>
    <AntDesign name="sync" size={24} color={DarkMode ? "red" : "blue"} />
  </View>
  )
const Loading = DarkMode => (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
    <Text style={{ color: "#c8c7cc" }}>Loading... </Text>
    <CircleFade size={30} color={DarkMode ? "white" : "black"} style={{ marginRight: 10 }}/>
  </View>
  )
const syncedStatus = ({ isFetching, synced }, DarkMode) => 
  isFetching ? Loading(DarkMode) : 
  synced ? Synced(DarkMode) : NotSynced(DarkMode)

const SyncPage = ({ navigation, settings: { Permissions: { phone, fb, google }, DarkMode } }) => {
	return (
	<View style={{ flex: 1 }}>
      <View style={{ backgroundColor: DarkMode ? "black" : '#EFEFF4', flex:1 }}>
        <SettingsList 
          borderColor={DarkMode ? "#424242" : '#c8c7cc'} 
          defaultItemSize={50}
          defaultTitleStyle={{
            color: DarkMode ? "white" : "black",
          }}
        >
          <SettingsList.Header headerStyle={{ color: DarkMode ? "white" : undefined }} headerText="Sync Contacts from 3rd party vendors" />
          <SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined}
            hasNavArrow={false}
            title='Phone Contacts'
            arrowIcon={syncedStatus(phone, DarkMode)}
            onPress={getPhoneContacts(true)}
          />
        </SettingsList>
      </View>
	</View>
    )
}
export default connectToStore(SyncPage)