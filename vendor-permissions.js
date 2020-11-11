import { store, requestSync, receiveSync, failSync } from "./db";
import * as Contacts from 'expo-contacts';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "react-native";

export const phoneContacts = async (alertIfFailed = true) => {
    const { status } = await Contacts.requestPermissionsAsync();
    console.log("status:", status);
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        const usableMedias = data.filter(({ birthday }) => birthday)
        return usableMedias;
    } else {
      // throw error
      if(alertIfFailed) {
      	Alert.alert(
	      "Phone Contacts were unable to be synced. Go to your phone's settings and allow this application to access your Contacts.",
	      "Please go to your phone's settings and allow this application to access your Contacts."
	      [ { text: "OK" } ]
	    )
      }
      return undefined;
    }
} 

const syncWrapper = (alertIfFailed, mediaKey, fn) => async () => {
  store.dispatch(requestSync(mediaKey))
  const contacts = await fn(alertIfFailed)
  if(contacts) {
    store.dispatch(receiveSync(mediaKey, contacts))
  } else {
    store.dispatch(failSync(mediaKey))
  }
}

export const getPhoneContacts = alertIfFailed => syncWrapper(alertIfFailed, "phone", phoneContacts);

export const syncInBackground = async () => {
  const { synced: { phone } } = store.getState();
  if(phone && phone.synced) getPhoneContacts(false)();
}