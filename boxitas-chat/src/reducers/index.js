import { combineReducers } from 'redux';
import contactsReducer from "./contactsReducer";
import currentUserReducer from './currentUserReducer';
import selectedContactReducer from "./selectedContactReducer";

export default combineReducers({
    contacts: contactsReducer,
    selectedContact: selectedContactReducer,
    currentUser: currentUserReducer

});