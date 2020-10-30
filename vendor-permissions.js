import { store, requestSync, receiveSync, failSync } from "./db";
import * as Contacts from 'expo-contacts';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "react-native";

export const phoneContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    console.log("status:", status);
    if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Birthday],
        });
        return data.filter(({ birthday }) => birthday).map(contact => {
           const phoneId = contact.id;
           return { ...contact, phoneId }          
        }) 
    } else {
      if(alert) {
      	Alert.alert(
	      "Phone Contacts were unable to be synced. Go to your phone's settings and allow this application to access your Contacts.",
	      "Please go to your phone's settings and allow this application to access your Contacts."
	      [ { text: "OK" } ]
	    )
      }
      return undefined;
    }
} 

const syncWrapper = (alertIfFailed, permReq, fn) => async () => {
  store.dispatch(requestSync(permReq))
  const contacts = await fn(alertIfFailed)
  if(contacts) {
    store.dispatch(receiveSync(permReq, contacts))
  } else {
    store.dispatch(failSync(permReq))
  }
}

export const getPhoneContacts = alertIfFailed => syncWrapper(alertIfFailed, "phone", phoneContacts);

export const syncInBackground = async () => {
  const { settings: { Permissions: { phone, fb, google } } } = store.getState();
  if(phone.synced) getPhoneContacts(false)();
}