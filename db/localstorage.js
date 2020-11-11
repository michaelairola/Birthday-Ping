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

const convMapToObj = (m) => {
  let obj = {};
  m.forEach((v, k) => {
    obj[k] = v
  });
  return obj;
}
const convObjToMap = (obj) => {
  let m = new Map();
  Object.keys(obj).forEach(k => {
    m.set(k, obj[k]);
  })
  return m;
}
const stateConverter = (state, fn = () => {}, keys = []) => {
  keys.forEach(k => {
    state[k] = fn(state[k]);
  });
  return state
}
const savableState = (state) => stateConverter(state, convMapToObj, ['contacts','medias']);
const loadableState = (state) => stateConverter(state, convObjToMap, ['contacts', 'medias']);

export const saveData = (deleteData) => {
  // if(deleteData) {
  //   localstore.remove({ key: 'state' })
  // } else {
    const state = savableState(store.getState());
    localstore.save({
      key: 'state',
      data: state,
      expires: null
    })
  // }
}
export const loadData = () => {
  store.dispatch(requestState())
  localstore.load({ key: 'state' }).then(state => {
    if(!state) return;
    store.dispatch(receiveState(loadableState(state)))
  })
}