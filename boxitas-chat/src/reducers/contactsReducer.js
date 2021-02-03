import { SUBSCRIBED_CONTACTS, NOTIFY_MESSAGES } from '../actions/types';

const contactsReducer = (state = [], action)  => {
    switch (action.type) {
        case SUBSCRIBED_CONTACTS:
          return action.payload;
        case NOTIFY_MESSAGES:
          return state.map(contact => ({...contact, hasNewMessages: !! action.payload.find(message =>
            message.sender === contact.id)}));
        default:
          return state;
      }
};


export default contactsReducer;