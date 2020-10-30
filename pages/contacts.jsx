import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import SearchBar from 'react-native-searchbar';
import { styles } from '../styles.js';
import { connect } from 'react-redux';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { connectToStore } from "../db";

import { LoadingPage } from "../components/loading";
import { NoContacts } from "../components/NoContacts";

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
const getDayDiff = (date, month) => {
	let today = new Date(); today.setHours(0);
	let bday = new Date(); bday.setMonth(month); bday.setDate(date); bday.setHours(0);
	let msDiff = bday.getTime() - today.getTime();
	if(msDiff < 0) {
		bday.setYear(bday.getFullYear() + 1);
		msDiff = bday.getTime() - today.getTime();
	} 
	const msPerDay = 1000 * 24 * 3600;
	return Math.floor(msDiff / msPerDay)
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
	let { navigation, route: { name, params }, isLoading, contacts, organized_contacts } = props
	organized_contacts = params && params.organized_contacts && params.organized_contacts.length ? params.organized_contacts : organized_contacts;
	let [ searchBar, setBar ] = useState(undefined);
	let [ barShowing, setShow ] = useState(false);
	return isLoading ? <LoadingPage/> : !organized_contacts || !organized_contacts.length ? <NoContacts navigation={navigation}/> : 
  	<ScrollView>
		<SearchBar
		  data={organized_contacts}
		  ref={(ref) => setBar(ref)}
		  handleResults={organized_contacts => navigation.navigate(name, { organized_contacts })}
		  onBack={() => { navigation.navigate(name, { organized_contacts: [] }); setShow(false); searchBar.hide(); } }
		/>
		<View style={{ marginTop: barShowing ? 75 : 0 }}>
			<View style={{ flexDirection: "row", justifyContent: "space-between"}}>
		  		<Text style={styles.header}>Birthdays</Text>
		  		{barShowing ? undefined : 
		  		<FontAwesome style={{ marginTop: 15, marginRight: 15, fontSize: 20}} name="search" onPress={() => { setShow(true); searchBar.show(); }} />
		  		}
			</View>
		  	{organized_contacts.map(({ month, date, contacts },i) => (
		  		<View key={i}>
			  		<View>
			  			<Text style={styles.dayHeader}>{MonthMap[month]} {date}</Text>
			  		</View>
			  		{contacts.map(({ name, birthday }, key) => (
				  		<View key={key} style={styles.contact}>
				  			<View style={styles.contactInfo}>
				  				<Text style={styles.mainText}>{name}</Text>
				  				<Text style={styles.text}>Turns {getAge(birthday)}</Text>
			  				</View>
			  				<View style={styles.birthdayInfo}>
			  					<Text style={styles.mainText}>{getDayDiff(date, month)}</Text>
			  					<Text style={styles.text}>days</Text>
			  				</View>
				  		</View>
		  			))}
		  		</View>
	  		))}
		</View>
	</ScrollView>
}
export default connectToStore(ContactsPage);
