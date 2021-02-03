import jsonServer from "../apis/jsonServer";
import { errorAndLog, okAndLog } from "../helpers/utils";
import {  SELECT_CONTACT, REGISTER_MESSAGE, CONTACT_LOGIN,
   SUBSCRIBED_CONTACTS, CONTACT_LOGOUT, NOTIFY_MESSAGES, UPDATE_MESSAGES_STATUS } from "./types";

export const selectContact = (contact, myself) => async dispatch => {
  console.log('selectContact Action - Entering');
  const { get, filter } = jsonServer();
   
  try {
    
    const contactAPI =  await get('users', contact.id);
    if(contactAPI.status < 400)  {
      const receivedMessagesAPI =  await filter('messages', `sender=${contact.id}&receiver=${myself.id}`);
      const sentMessagesAPI =  await filter('messages', `sender=${myself.id}&receiver=${contact.id}`);

      const messages = [...receivedMessagesAPI.data, ...sentMessagesAPI.data ];
      messages.sort((a,b) => a.created > b.created);

      dispatch({ type: SELECT_CONTACT, payload: {...contact, messages} });
      return okAndLog('selectContact', contactAPI.status, contact);
    }
    return errorAndLog('selectContact', contactAPI.status, contact);
  } catch (e) {
    return errorAndLog('selectContact', e.status, e.data);
  }
   
};

// export const updateMessagesStatus = (contact, myself) => async dispatch => {
//   console.log('updateMessagesStatus Action - Entering');
//   const { filter } = jsonServer();
   
//   try {
//       const sentMessagesAPI =  await filter('messages', `sender=${myself.id}&receiver=${contact.id}`);
//       if(sentMessagesAPI.status < 400)  {
//       const messages = sentMessagesAPI.data;

//       dispatch({ type: UPDATE_MESSAGE_STATUS, payload: messages });
//       return okAndLog('updateMessagesStatus', sentMessagesAPI.status, sentMessagesAPI.data);
//     }
//     return errorAndLog('updateMessagesStatus', sentMessagesAPI.status, sentMessagesAPI.datda);
//   } catch (e) {
//     return errorAndLog('updateMessagesStatus', e.sentMessagesAPI, e.data);
//   }
   
// };

export const registersSelectedContactMessage = message =>  dispatch => {
  console.log('registersSelectedContactMessage Action - Entering');
    dispatch({ type: REGISTER_MESSAGE, payload: message });
    console.log('registersSelectedContactMessage Action - Exiting');
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
        await patch(`users/${contact.id}`, {isOnline: true});
          
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
      const loggedoutContact = {...contact, isOnline: false };
      await patch(`users/${contact.id}`, {isOnline: false});
     
          
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
    console.log('getContacts Action - Entering');
    const { get } = jsonServer();
    try {
      const contactAPI =  await get('users');
      if (contactAPI.status === 200) {
        dispatch({
          type: SUBSCRIBED_CONTACTS,
          payload: contactAPI.data
        });
        return okAndLog('getContacts', contactAPI.status, contactAPI.data);
      }
      return errorAndLog('getContacts', contactAPI.status, contactAPI.data);
    } catch (e) {
      return errorAndLog('getContacts', e.status, e.data);
    }
  };


  export const setMessageWasViewed = message => async dispatch => {
    console.log('setMessageWasViewed Action - Entering');
    const { patch } = jsonServer();
    try {
      const viewedMessage = { wasViewed: true };
      const messagestAPI =  await patch(`messages/${message.id}`, viewedMessage);
      if (messagestAPI.status === 200) {
        
        return okAndLog('setMessageWasViewed', messagestAPI.status, messagestAPI.data);
      }
      return errorAndLog('setMessageWasViewed', messagestAPI.status, messagestAPI.data);
    } catch (e) {
      return errorAndLog('setMessageWasViewed', e.status, e.data);
    }
  };

  export const notify = myself => async dispatch => {
    console.log('notify Action - Entering');
    const { filter } = jsonServer();
    try {
      const messagesReceivedAPI = await filter('messages', `receiver=${myself.id}&wasViewed=false`);
      if (messagesReceivedAPI.status === 200) {
        dispatch({
          type: NOTIFY_MESSAGES,
          payload: messagesReceivedAPI.data
        });
      
      const messagesSentAPI = await filter('messages', `sender=${myself.id}&wasViewed=false`);
      if (messagesSentAPI.status === 200) {
        dispatch({
          type: UPDATE_MESSAGES_STATUS,
          payload: messagesSentAPI.data
        });
        
        return okAndLog('notify', messagesReceivedAPI.status, messagesReceivedAPI.data);
      }
    }
      return errorAndLog('notify', messagesReceivedAPI.status, messagesReceivedAPI.data);
    } catch (e) {
      return errorAndLog('notify', e.status, e.data);
    }
  };

  