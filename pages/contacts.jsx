import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import SearchBar from 'react-native-searchbar';
import { styles } from '../styles.js';
import { connect } from 'react-redux';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { connectToStore } from "../db";

import { LoadingPage } from "../components/loading";
import NoContacts from "../components/NoContacts";

const MonthMap = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]
const renderDay = ({ date, month }, DarkMode) => {
	if(getDayDiff({day: date,month}) == 0) {
		return <Text style={{ color: DarkMode ? "white" : "black", margin: 10, fontSize: 20 }}>Birthdays Today</Text>
	}
	return <Text style={{ color: "grey", margin: 10, fontSize: 18, }}>{MonthMap[month]} {date}</Text>
}
const getDayDiff = ({ day, month }) => {
	let today = new Date(); today.setHours(0);
	let bday = new Date(); bday.setMonth(month); bday.setDate(day); bday.setHours(0);
	let msDiff = bday.getTime() - today.getTime();
	if(msDiff < 0) {
		bday.setYear(bday.getFullYear() + 1);
		msDiff = bday.getTime() - today.getTime();
	} 
	const msPerDay = 1000 * 24 * 3600;
	return Math.floor(msDiff / msPerDay)
}
const renderDayDiff = ({ day, month }, DarkMode) => {
	const DaysTillBirthday = getDayDiff({ day, month });
	return DaysTillBirthday ? (
	<View style={{ fontSize: 18, flex: 1 }}>
		<Text style={{ fontSize: 18, color: DarkMode ? "white" : "black" }}>{DaysTillBirthday}</Text>
		<Text style={{ fontSize: 16, color: "grey" }}>days</Text>	
	</View>
	) : <FontAwesome
		style={{ marginRight: 20 }} 
		name="birthday-cake" 
		size={24}
		color={DarkMode ? "white" : "black"} 
	/>
}

const getAge = ({ day, month, year }) => {
	let today = new Date(); today.setHours(0);
	let bday = new Date(); bday.setMonth(month); bday.setDate(day); bday.setHours(0);
	let msDiff = bday.getTime() - today.getTime();
	let x = bday.getFullYear() - year;
	if(msDiff < 0) {
		x ++;
	}
	return x;
}

function ContactsPage(props) {
	let { navigation, route: { name, params }, settings: { DarkMode }, organized_contacts, contacts } = props
	if(!params) params = {};
	let [ searchBar, setBar ] = useState(undefined);
	let [ barShowing, setShow ] = useState(false);
	return !organized_contacts.length ? <NoContacts navigation={navigation}/> : 
  	<ScrollView style={{ flex: 1, backgroundColor: DarkMode ? "#121212" : undefined }}>
		<SearchBar
		  backgroundColor={DarkMode ? "#121212" : undefined}
		  inputStyle={{flex: 1, backgroundColor: 'black'}}
	      containerStyle={{ flex: 1, backgroundColor: 'black'}}
		  data={organized_contacts}
		  ref={(ref) => setBar(ref)}
		  handleResults={organized_contacts => navigation.navigate(name, { organized_contacts })}
		  onBack={() => { navigation.navigate(name, { organized_contacts: [] }); setShow(false); searchBar.hide(); } }
		/>
		<View style={{ flex: 1, marginTop: barShowing ? 75 : 0 }}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" , backgroundColor: DarkMode ? "#121212" : undefined }}>
		  		<Text style={{ margin: 10, fontSize: 20, color: DarkMode ? "white" : "black" }}>Birthdays</Text>
		  		{barShowing ? undefined : 
		  		<FontAwesome style={{ marginTop: 15, marginRight: 15, fontSize: 20 }} color={DarkMode ? "white" : "black"} name="search" onPress={() => { setShow(true); searchBar.show(); }} />
		  		}
			</View>
		  	{organized_contacts.map(({ month, date, contacts },i) => (
		  		<TouchableWithoutFeedback onPress={() => console.log("Hey chara, how are you today")} ><View key={i}>
			  		<View style={{ backgroundColor: DarkMode ? "#121212" : undefined}}>
			  			{renderDay({ date, month }, DarkMode)}
			  		</View>
			  		{contacts.map(({ name, birthday }, key) => (
				  		<View key={key} style={{ flexDirection: "row", alignItems: "center", padding: 10, width: "100%",
						  	backgroundColor: DarkMode ? "#212121" : 'white',
						  	borderColor: DarkMode ? "#424242" : "#A9A9A9",
						  	borderBottomWidth: 1,
					    }}>
				  			<View style={{ fontSize: 18, flex: 6, }}>
				  				<Text style={{ fontSize: 18, color: DarkMode ? "white" : "black" }}>{name}</Text>
				  				{birthday.year ? <Text style={{ fontSize: 16, color: "grey"}}>Turns {getAge(birthday)}</Text> : undefined }
			  				</View>
		  					{renderDayDiff(birthday, DarkMode)}
				  		</View>
		  			))}
		  		</View></TouchableWithoutFeedback>
	  		))}
		</View>
	</ScrollView>
}
export default connectToStore(ContactsPage);
