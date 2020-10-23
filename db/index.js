import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { Schema, CONTACT, SETTINGS } from './migrations';

const LocalDB = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000, // default 1000
  storageBackend: AsyncStorage, // Uber native storage (web: window.localStorage)
  defaultExpires: null, // default 1 Day (1000 * 3600 * 24 ms). 

  // cache data in the memory. default is true.
  enableCache: true,

});
// this converts the default values into "sync" objects so no warnings are thrown if it doesn't exist
LocalDB.sync = Object.keys(Schema).reduce((acc, key) => ({
  ...acc, [key]: ({ id }) => Schema[key]
}),{})

export const getSettings = async () => LocalDB.load({ key: SETTINGS })
export const saveSetting = (key, value) => 
  getSettings().then(data => LocalDB.save({ key: SETTINGS, data: { ...data, [key]: value }}))

export const getContacts = async () => LocalDB.getAllDataForKey(CONTACT);
export const saveContact = (id, data) => 
  LocalDB.save({ key: CONTACT, id, data });