export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const REQUEST_SYNC = 'REQUEST_SYNC';
export const RECEIVE_SYNC = 'RECEIVE_SYNC';
export const FAIL_SYNC = 'FAIL_SYNC';
export const RECEIVE_CONTACT = 'RECEIVE_CONTACT'; 

export const receiveData = (data) => ({ type: RECEIVE_DATA, ...data });
export const receiveSettings = settings => ({ type: RECEIVE_SETTINGS, settings });
export const requestSync = permReq => ({ type: REQUEST_SYNC, permReq });
export const failSync = permReq => ({ type: FAIL_SYNC, permReq })
export const receiveSync = (permReq, contacts) => ({ type: RECEIVE_SYNC, contacts, permReq }) 
export const receiveContact = contact => ({ type: RECEIVE_CONTACT, contact });

