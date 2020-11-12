import { createStore } from "redux";
import { connect } from "react-redux";
import { AppReducer, contactsList } from "./reducer.js";

export const store = createStore(AppReducer);

export const connectToStore = connect(state => {
	return { ...state, contactsList: contactsList(state) } 
});