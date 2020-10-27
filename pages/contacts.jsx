import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles.js';
import { connect } from 'react-redux';

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

function ContactsPage(props) {
	const { isLoading, contacts, organized_contacts } = props
	return isLoading ? <LoadingPage/> : !organized_contacts || !organized_contacts.length ? <NoContacts/> : 
	  	organized_contacts.map(({ month, date, contacts },i) => (
	  		<View key={i}>
		  		<View>
		  			<Text style={styles.header}>{MonthMap[month]} {date}</Text>
		  		</View>
		  		{contacts.map(({ name }, key) => (
			  		<View key={key} style={styles.contact}>
			  				<Text style={styles.contactInfo}>{name}</Text>
		  				<View style={styles.birthdayInfo}>
		  					<Text>{getDayDiff(date, month)}</Text>
		  				</View>
			  		</View>
	  			))}
	  		</View>
  		))
}
export default connectToStore(ContactsPage);
