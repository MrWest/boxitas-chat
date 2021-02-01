import jsonServer from "../apis/jsonServer";
import { errorAndLog, okAndLog } from "../helpers/utils";
import {  SELECT_CONTACT, REGISTER_MESSAGE, CONTACT_LOGIN, ONLINE_CONTACTS } from "./types";

export const selectContact = (contact, myself) => async dispatch => {
  console.log('selectContact Action - Entering');
  const { get, filter } = jsonServer();
   
  try {
    
    const contactAPI =  await get('users', contact.id);
    if(contactAPI.status < 400)  {
      const receivedMessagesAPI =  await filter('messages', `sender=${contact.id}& receiver=${myself.id}`);
      const sentMessagesAPI =  await filter('messages', `sender=${myself.id}& receiver=${contact.id}`);

      const messages = [...receivedMessagesAPI.data, sentMessagesAPI.data ].sort((a,b) => a.created > b.created);

      dispatch({ type: SELECT_CONTACT, payload: contact });
      return okAndLog('contactLogin', contactAPI.status, {...contact, messages});
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