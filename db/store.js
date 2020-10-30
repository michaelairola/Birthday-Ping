import { createStore } from "redux";
import { connect } from "react-redux";
import { AppReducer, organize_contacts } from "./reducer.js";

export const store = createStore(AppReducer);

export const connectToStore = connect(state => {
	return { ...state, organized_contacts: organize_contacts(state) } 
});