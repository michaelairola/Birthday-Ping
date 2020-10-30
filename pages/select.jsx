import React from 'react';
import { View } from 'react-native';
import { connectToStore, receiveSettings } from "../db";

import SettingsList from "react-native-settings-list";
var bgColor = '#DCE3F4';

const SelectPage = ({ route, navigation, settings }) => {
	const { key: settingsKey, header, items, routeName } = route.params;
	return (
      <View style={{ backgroundColor:'#EFEFF4', flex:1 }}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerText={header}/>
          {items.map((item, key) => (
	          <SettingsList.Item key={key}
	          	title={item}
	          	onPress={() => {
	          		receiveSettings({ ...settings, [settingsKey]: item })
	          		navigation.goBack();
	          	}}
	          />
          	)
      	  )}
        </SettingsList>
      </View>
    )
}
export default connectToStore(SelectPage)