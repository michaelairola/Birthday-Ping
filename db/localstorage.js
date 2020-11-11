import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { store } from './store.js';
import { requestState, receiveState, failState } from "./actions.js";

export const localstore = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
  }
});

export const saveData = (deleteData) => {
    localstore.save({
      key: 'state',
      data: store.getState(),
      expires: null
    })
}
export const loadData = async () => {
  store.dispatch(requestState())
  return localstore.load({ key: 'state' }).then(state => {
    if(!state) return;
    store.dispatch(receiveState(state))
  })
}