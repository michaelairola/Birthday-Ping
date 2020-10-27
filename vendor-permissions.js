import { store, receiveContacts } from "./db";
import * as Contacts from 'expo-contacts';

export const getPhoneContacts = async () => {
	const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Birthday],
        });
        if (data.length > 0) {
          const birthdays = data.filter(({ birthday }) => birthday);
		  store.dispatch(receiveContacts(birthdays));
        }
    }
}