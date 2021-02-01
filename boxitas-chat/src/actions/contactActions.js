import jsonServer from "../apis/jsonServer";
import { errorAndLog, okAndLog } from "../helpers/utils";
import {  SELECT_CONTACT, REGISTER_MESSAGE, CONTACT_LOGIN, ONLINE_CONTACTS } from "./types";

export const selectContact = contact => dispatch => {
    dispatch({ type: SELECT_CONTACT, payload: contact });
};
export const registersSelectedContactMessage = message =>  dispatch => {
    dispatch({ type: REGISTER_MESSAGE, payload: message });
};

export const contactLogin = contact => async dispatch => {
    console.log('contactLogin Action - Entering');
    const { post, get, patch } = jsonServer();
    
      let contactAPI =  await get(`users/${contact.id}`);
    try {
      if(contactAPI.status === 404) 
        contactAPI =  await post('users', contact);
      if (contactAPI.status === 200) {
          
        dispatch({
          type: CONTACT_LOGIN,
          payload: contact
        });
        await patch(`users/${contact.id}`, contact);
        return okAndLog('contactLogin', contactAPI.status, contact);
      }
      return errorAndLog('contactLogin', contactAPI.status, contact);
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };

  export const getContacts = () => async dispatch => {
    console.log('contactLogin Action - Entering');
    const { get } = jsonServer();
    try {
      const contactAPI =  await get('users');
      if (contactAPI.status === 200) {
        dispatch({
          type: ONLINE_CONTACTS,
          payload: contactAPI.data
        });
        return okAndLog('contactLogin', contactAPI.status, contactAPI.contact);
      }
      return errorAndLog('contactLogin', contactAPI.status, contactAPI.data);
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };