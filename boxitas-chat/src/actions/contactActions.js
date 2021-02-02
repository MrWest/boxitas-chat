import jsonServer from "../apis/jsonServer";
import { errorAndLog, okAndLog } from "../helpers/utils";
import {  SELECT_CONTACT, REGISTER_MESSAGE, CONTACT_LOGIN,
   ONLINE_CONTACTS, CONTACT_LOGOUT } from "./types";

export const selectContact = (contact, myself) => async dispatch => {
  console.log('selectContact Action - Entering');
  const { get, filter } = jsonServer();
   
  try {
    
    const contactAPI =  await get('users', contact.id);
    if(contactAPI.status < 400)  {
      const receivedMessagesAPI =  await filter('messages', `sender=${contact.id}& receiver=${myself.id}`);
      const sentMessagesAPI =  await filter('messages', `sender=${myself.id}& receiver=${contact.id}`);

      const messages = [...receivedMessagesAPI.data, ...sentMessagesAPI.data ].sort((a,b) => a.created > b.created);

      dispatch({ type: SELECT_CONTACT, payload: {...contact, messages} });
      return okAndLog('contactLogin', contactAPI.status, contact);
    }
    return errorAndLog('contactLogin', contactAPI.status, contact);
  } catch (e) {
    return errorAndLog('contactLogin', e.status, e.data);
  }
   
};
export const registersSelectedContactMessage = message =>  dispatch => {
    dispatch({ type: REGISTER_MESSAGE, payload: message });
};

export const contactLogin = contact => async dispatch => {
    console.log('contactLogin Action - Entering');
    const { post, filter, patch } = jsonServer();
     
    try {
      
      let contactAPI =  await filter('users', `id=${contact.id}`);
      if(!contactAPI.data.length) 
        contactAPI =  await post('users', contact);
      else {
          
        dispatch({
          type: CONTACT_LOGIN,
          payload: contact
        });
        await patch(`users/${contact.id}`, {...contact, isOnline: true });
        return okAndLog('contactLogin', contactAPI.status, contact);
      }
      return errorAndLog('contactLogin', contactAPI.status, contact);
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };

  export const contactLogout = contact => async dispatch => {
    console.log('contactLogout Action - Entering');
    const { patch } = jsonServer();
     
    try {
      await patch(`users/${contact.id}`, {...contact, isOnline: false });
     
          
        dispatch({
          type: CONTACT_LOGOUT,
          payload: contact
        });
       
        return okAndLog('contactLogout', 200, contact);
     
    } catch (e) {
      return errorAndLog('contactLogout', e.status, e.data);
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