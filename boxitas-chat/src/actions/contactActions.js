import jsonServer from "../apis/jsonServer";
import { errorAndLog, okAndLog } from "../helpers/utils";
import {  SELECT_CONTACT, REGISTER_MESSAGE, CONTACT_LOGIN,
   SUBSCRIBED_CONTACTS, CONTACT_LOGOUT, MESSAGE_WAS_VIEWED, NOTIFY_MESSAGES } from "./types";

export const selectContact = (contact, myself) => async dispatch => {
  console.log('selectContact Action - Entering');
  const { get, filter } = jsonServer();
   
  try {
    
    const contactAPI =  await get('users', contact.id);
    if(contactAPI.status < 400)  {
      const receivedMessagesAPI =  await filter('messages', `sender=${contact.id}&receiver=${myself.id}`);
      const sentMessagesAPI =  await filter('messages', `sender=${myself.id}&receiver=${contact.id}`);

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
      const loggedContact = {...contact, isOnline: true };
      let contactAPI =  await filter('users', `id=${contact.id}`);
      if(!contactAPI.data.length) 
        contactAPI =  await post('users', loggedContact);
      else 
        await patch(`users/${contact.id}`, loggedContact);
          
        dispatch({
          type: CONTACT_LOGIN,
          payload: loggedContact
        });
        
        return okAndLog('contactLogin', 200, contact);
     
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };

  export const contactLogout = contact => async dispatch => {
    console.log('contactLogout Action - Entering');
    const { patch } = jsonServer();
     
    try {
      const loggedoutContact = {...contact, isOnline: false, current: false };
      await patch(`users/${contact.id}`, loggedoutContact);
     
          
        dispatch({
          type: CONTACT_LOGOUT,
          payload: loggedoutContact
        });
       
        return okAndLog('contactLogout', 200, loggedoutContact);
     
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
          type: SUBSCRIBED_CONTACTS,
          payload: contactAPI.data
        });
        return okAndLog('contactLogin', contactAPI.status, contactAPI.data);
      }
      return errorAndLog('contactLogin', contactAPI.status, contactAPI.data);
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };


  export const setMessageWasViewed = message => async dispatch => {
    console.log('contactLogin Action - Entering');
    const { patch } = jsonServer();
    try {
      const viewedMessage = {...message, wasViewed: true}
      const messagestAPI =  await patch('message', viewedMessage);
      if (messagestAPI.status === 200) {
        dispatch({
          type: MESSAGE_WAS_VIEWED,
          payload: viewedMessage
        });
        return okAndLog('contactLogin', messagestAPI.status, messagestAPI.data);
      }
      return errorAndLog('contactLogin', messagestAPI.status, messagestAPI.data);
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };

  export const notify = myself => async dispatch => {
    console.log('contactLogin Action - Entering');
    const { filter } = jsonServer();
    try {
      const messagestAPI = await filter('messages', `receiver=${myself.id}&wasViewed_ne=true`);
      if (messagestAPI.status === 200) {
        dispatch({
          type: NOTIFY_MESSAGES,
          payload: messagestAPI.data
        });
        return okAndLog('contactLogin', messagestAPI.status, messagestAPI.data);
      }
      return errorAndLog('contactLogin', messagestAPI.status, messagestAPI.data);
    } catch (e) {
      return errorAndLog('contactLogin', e.status, e.data);
    }
  };

  