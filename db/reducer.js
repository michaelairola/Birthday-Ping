import { createSelector } from "reselect";
import { v4 as uuidv4 } from 'uuid';
import { 
	RECEIVE_STATE,
	RECEIVE_SETTINGS,
	REQUEST_SYNC,
	FAIL_SYNC,
	RECEIVE_SYNC,
} from "./actions.js";

const makeDate = (hrs = 0, mins = 0) => {
	let d = new Date();
	d.setHours(hrs);
	d.setMinutes(mins)
	return d;
}

const initState = {
	synced: {},
	settings: {
		"BirthdayNotifications": true,
		"BirthdayTimes": new Array(7).fill(makeDate(9, 40)),
		"GiftNotifications": true,
		"GiftRange": "1 Month",
		"DarkMode": false,
	},
	contacts: [],
	medias: [],
}

const synced = ({ synced }, key, isFetching, isSynced, failed) => ({
	...synced, [key]: { isFetching, isSynced, failed }
})

const sameBirthday = (b1, b2) => ["date", "month", "year"].reduce((acc, k) => acc && b1[k] == b2[k], true)
const sameFullName = (b1, b2) => b1.full_name == b2.full_name;
const sameContact = m1 => m2 => sameBirthday(m1.birthday,m2.birthday) && sameFullName(m1,m2) 
const connectMediaToContacts = (contacts, medias, key, media) => {
	contacts.forEach((contact, i) => {
		contact.mediaIds.forEach(mediaId => {
			if(medias.includes(sameContact(media))) {
				return contacts.map((c, j) => {
					if(i == j) c.mediaIds = [ ...contact.mediatIds, mediaId ];
					return c
				})
			}
		})
	})
	return [ ...contacts, { id: uuidv4(), mediaIds: [ media.id ] } ];
}
const syncMedias = ({ contacts, medias }, { key, new_medias }) => {
	new_medias.forEach(media => {
		let isPresent = false;
		medias = medias.map(m => {
			if(m.id == media.id) {isPresent = true; return media;}
			return m;
		})
		if(!isPresent) {
			contacts = connectMediaToContacts(contacts, medias, key, media)
			medias = [ ...medias, media ];
		} 
	})
	return { contacts, medias };
}

export const AppReducer = (state = initState, action) => {
	switch(action.type) {
		case RECEIVE_STATE:
			return action.state;
		case RECEIVE_SETTINGS: 
			return { ...state, settings: action.settings };
		case REQUEST_SYNC:
			return { ...state, synced: synced(state, action.key, true, false, false) };
		case FAIL_SYNC:
			return { ...state, synced: synced(state, action.key, false, false, true) };
		case RECEIVE_SYNC:
			return { ...state, ...syncMedias(state, action), synced: synced(state, action.key, false, true, false) }
		default:
			return state
	}
}

const getDefaultMedia = (contact, medias = []) => 
	medias.find(({ id }) => id == contact.mediaIds[0])

export const organize_contacts = ({ contacts, medias }) => {
	const date = new Date();
	const currentM = date.getMonth();
	const currentD = date.getDate();
	let orderedObj = {};
	contacts.forEach(contact => {
		const media = getDefaultMedia(contact, medias);
		const { birthday: { day, month } } = media;
		const key = `${month}-${day}`
		orderedObj[key] = [ ...(orderedObj[key] || []), media ];
	})
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
		return a < c && b < c ? a - b : a < c ? 1 : b < c ? -1 : a - b;
	})
	return ordered;
}//)
