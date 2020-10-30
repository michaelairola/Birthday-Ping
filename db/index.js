import { store, connectToStore } from "./store.js";
import { 
	requestSync, receiveSync, failSync,
	receiveData,
	receiveSettings,
	receiveContact
} from "./actions.js";

export { store, connectToStore, receiveData, receiveSettings, receiveContact, requestSync, receiveSync, failSync }