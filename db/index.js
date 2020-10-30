import { createStore } from "redux";
import { connect } from "react-redux";
import { createSelector } from "reselect";

// HRS = 3600 * 1000
// MINS = 60 * 1000
let time = new Date();
time.setHours(9)
time.setMinutes(0)
const initState = {
	settings: {
		"BirthdayNotifications": true,
		"BirthdayTimes": new Array(7).fill(time.toString()),
		"GiftNotifications": true,
		"GiftRange": "1 Month",
		"DarkMode": false,
	},
	contacts: [],
}
const RECEIVE_DATA = 'RECEIVE_DATA';
const receiveData = (data) => ({ type: RECEIVE_DATA, ...data })
const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const receiveSettings = settings => store.dispatch(({ type: RECEIVE_SETTINGS, settings }));
const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'; 
export const receiveContacts = contacts => ({ type: RECEIVE_CONTACTS, contacts });

const AppReducer = (state = initState, action) => {
	const { type, settings, contacts } = action;
	switch(type) {
		case RECEIVE_DATA:
			return { ...state, settings, contacts };
		case RECEIVE_SETTINGS: 
			return { ...state, settings };
		case RECEIVE_CONTACTS:
			return { ...state, contacts };
		default:
			return state
	}
}
const organize = createSelector(({ contacts }) => contacts, contacts => {
	const date = new Date();
	const currentM = date.getMonth();
	const currentD = date.getDate();
	const orderedObj = contacts.reduce((acc, c) => {
		const { birthday: { day, month } } = c;
		const key = `${month}-${day}`
		acc[key] = [ ...(acc[key] || []), c];
		return acc;
	}, {})
	const ordered = Object.keys(orderedObj).map(key => {
		const [ monthStr, dayStr ] = key.split("-");
		const month = parseInt(monthStr)
		const date = parseInt(dayStr)
		return { month, date, contacts: orderedObj[key] }
	}).sort((c1, c2) => {
		let a, b, c;
		if(c1.month != c2.month) {
			a = c1.month; b = c2.month, c = currentM;
		} else {
			a = c1.date; b = c2.date, c = currentD;
		}
		return a < c ? 1 : b < c ? -1 : a - b;
	})
	return ordered;
})

export const store = createStore(AppReducer);

export const connectToStore = connect(state => {
	return { ...state, organized_contacts: organize(state) } 
});