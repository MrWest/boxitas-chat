import { combineReducers } from 'redux';
import contactsReducer from "./contactsReducer";
import selectedContactReducer from "./selectedContactReducer";

export default combineReducers({
    contactsReducer,
    selectedContactReducer
});