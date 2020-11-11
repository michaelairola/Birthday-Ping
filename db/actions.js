export const REQUEST_STATE = 'REQUEST_STATE';
export const RECEIVE_STATE = 'RECEIVE_STATE';
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const REQUEST_SYNC = 'REQUEST_SYNC';
export const RECEIVE_SYNC = 'RECEIVE_SYNC';
export const FAIL_SYNC = 'FAIL_SYNC';

export const requestState = () => ({ type: REQUEST_STATE });
export const receiveState = (state) => ({ type: RECEIVE_STATE, state });
export const receiveSettings = settings => ({ type: RECEIVE_SETTINGS, settings });
export const requestSync = key => ({ type: REQUEST_SYNC, key });
export const failSync = key => ({ type: FAIL_SYNC, key })
export const receiveSync = (key, new_medias) => ({ type: RECEIVE_SYNC, new_medias, key }) 

