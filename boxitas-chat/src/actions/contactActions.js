import {  SELECT_CONTACT, REGISTER_MESSAGE } from "./types";
export const selectContact = contact => dispatch => {
    dispatch({ type: SELECT_CONTACT, payload: contact });
};
export const registersSelectedContactMessage = message =>  dispatch => {
    dispatch({ type: REGISTER_MESSAGE, payload: message });
};