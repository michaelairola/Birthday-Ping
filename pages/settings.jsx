import React, { useState } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import { SYNC_ROUTE } from '../routes.js';
import { LoadingPage } from "../components/loading";
import { connectToStore, receiveSettings } from "../db";
import SettingsList from "react-native-settings-list";
import DateTimePicker from "@react-native-community/datetimepicker";
var bgColor = '#DCE3F4';
const week = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

const SettingsPage = ({ isLoading, settings, navigation, route, dispatch }) => {
	const { BirthdayNotifications, BirthdayTimes, GiftNotifications, GiftRange, DarkMode } = settings;
	const [ time, setTime ] = useState(undefined);
	const [ day, setDay ] = useState(undefined);
	return isLoading ? <LoadingPage/> : (
	<View style={{ flex: 1 }}>
      <View style={{ backgroundColor: DarkMode ? "black" : '#EFEFF4', flex:1 }}>
        <SettingsList 
        	defaultItemSize={50}
        	borderColor={DarkMode ? "#424242" : '#c8c7cc'}
        	defaultTitleStyle={{
        		color: DarkMode ? "white" : "black",
        	}}
    	>
          <SettingsList.Header headerStyle={{ color: DarkMode ? "white" : undefined }} headerText="Sync Contacts" />
          <SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined}
          	title="Sync 3rd party Contacts"
          	onPress={() => navigation.navigate(SYNC_ROUTE)}
      	  />
          <SettingsList.Header headerStyle={{ color: DarkMode ? "white" : undefined }} headerText="Birthday Notifications"/>
          <SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined}
            hasSwitch={true}
            switchState={BirthdayNotifications}
            hasNavArrow={false}
            title='Enable Birthday Notifications'
            switchOnValueChange={BirthdayNotifications => dispatch(receiveSettings({ ...settings, BirthdayNotifications }))}
          />
          {!BirthdayNotifications ? undefined : ([
          		<SettingsList.Header headerStyle={{ color: DarkMode ? "white" : undefined }} key={0} headerText="Set the times you are notified if there are birthdays"/>,
	      		...BirthdayTimes.map((v, i) => (
	      			<SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined} key={i+2}
	      				title={week[i]}
	      				titleInfo={new Date(v).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
	      				onPress={() => { setDay(i); setTime(v) }}
	      			/>
      			))
	      ])}
	    	<SettingsList.Header headerStyle={{ color: DarkMode ? "white" : undefined }} headerText="Gift Notifications"/>
	    	<SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined} 
	    		title="Enable Gift Notifications"
	            hasSwitch={true}
	    		hasNavArrow={false}
	    		switchState={GiftNotifications}
	    		switchOnValueChange={GiftNotifications => dispatch(receiveSettings({ ...settings, GiftNotifications }))}
	    	/>
          {!GiftNotifications ? undefined : (
          		<SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined} 
          			title="Gift Range"
          			titleInfo={GiftRange}
          			onPress={() => navigation.navigate("Select", { key: "GiftRange", header: "Set how far into the future you can look for gifts", items: [ '1 Month', '1 Week', '2 Weeks', '3 Weeks' ], routeName: route.name })}
          		/>
	      )}        	
          <SettingsList.Header headerStyle={{ color: DarkMode ? "white" : undefined }} headerText="Themes" />
          <SettingsList.Item backgroundColor={DarkMode ? "#212121" : undefined} 
          	title="Dark Mode"
          	hasSwitch={true}
          	hasNavArrow={false}
          	switchState={DarkMode}
          	switchOnValueChange={DarkMode => dispatch(receiveSettings({ ...settings, DarkMode }))}
          />
	    </SettingsList>
      </View>
	  {(time != undefined) && (day != undefined) ? (
	  	<View>{Platform.OS == "ios" ? (
	  		<View style={{ flexDirection: "row", justifyContent: "space-between"}}>
	  		 <Button title="Cancel" onPress={() => {
	  		 	setDay(undefined);
	  		 	setTime(undefined);
	  		 }} />
	  		 <Button title="Select" onPress={() => {
	  		 	dispatch(receiveSettings({ ...settings, BirthdayTimes: BirthdayTimes.map((v, i) => i == day || day == -1 ? time : v)}))
	  		 	setDay(undefined);
	  		 	setTime(undefined);
	  		 }}/>
	  		</View>
  		): undefined }
	  	<DateTimePicker
	  	value={new Date(time)} mode="time"
	    onChange={(event, selectedDate) => {
		  if(Platform.OS == "ios") {
		  	setTime(selectedDate)
		  } else {
	  		dispatch(receiveSettings({ ...settings, BirthdayTimes: BirthdayTimes.map((v, i) => i == day ? time : v)}))
	  		setDay(undefined);
	  		setTime(undefined);
		  }
		}}
  	   /></View>
  	  ) : undefined}
	</View>
    )
}
export default connectToStore(SettingsPage)