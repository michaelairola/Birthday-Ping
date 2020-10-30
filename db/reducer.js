import { createSelector } from "reselect";
import { 
	RECEIVE_DATA, 
	RECEIVE_SETTINGS,
	REQUEST_SYNC,
	FAIL_SYNC,
	RECEIVE_SYNC,
	RECEIVE_CONTACT 
} from "./actions.js";

let time = new Date();
time.setHours(9)
time.setMinutes(0)
const initState = {
	settings: {
		"Permissions": {
			"phone": { synced: false, isFetching: false },
			"fb": { synced: false, isFetching: false },
			"google": { synced: false, isFetching: false },
		},
		"BirthdayNotifications": true,
		"BirthdayTimes": new Array(7).fill(time.toString()),
		"GiftNotifications": true,
		"GiftRange": "1 Month",
		"DarkMode": false,
	},
	contacts: [],
}

const removeOld = newContacts => oldContact => 
	!newContacts.find(newContact => 
		([ "phoneId", "fbId", "googleId" ].reduce((isSame, k) => 
			isSame || (!newContact[k] && newContact[k] != oldContact[k]) 
		)), false)
	

export const AppReducer = (state = initState, action) => {
	let { permReq, contacts } = action;
	switch(action.type) {
		case RECEIVE_DATA:
			return action.state;
		case RECEIVE_SETTINGS: 
			const { settings } = action;
			return { ...state, settings };
		case REQUEST_SYNC:
			return { ...state, settings: { ...state.settings, Permissions: { ...state.settings.Permissions, [permReq]: { synced: false, isFetching: true } } } }
		case FAIL_SYNC:
			return { ...state, settings: { ...state.settings, Permissions: { ...state.settings.Permissions, [permReq]: { synced: false, isFetching: false } } } }
		case RECEIVE_SYNC:
			return { ...state, contacts: [ ...state.contacts.filter(removeOld(contacts)), ...contacts ], settings: { ...state.settings, Permissions: { ...state.settings.Permissions, [permReq]: { synced: true, isFetching: false } } } }
		case RECEIVE_CONTACT:
			const { contact } = action;
			return { ...state, contacts: [ ...state.contacts, contact ] };
		default:
			return state
	}
}
export const organize_contacts = createSelector(({ contacts }) => contacts, contacts => {
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
