import { store, connectToStore } from "./store.js";
import { saveData, loadData } from "./localstorage.js";
import { 
	requestSync, receiveSync, failSync,
	receiveData,
	receiveSettings,
	receiveContact
} from "./actions.js";

export { store, saveData, loadData, connectToStore, receiveData, receiveSettings, receiveContact, requestSync, receiveSync, failSync }