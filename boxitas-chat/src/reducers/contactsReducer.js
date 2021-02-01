import { ONLINE_CONTACTS, CONTACT_LOGIN } from '../actions/types';

const contactsReducer = (state = [], action)  => {
    switch (action.type) {
        case ONLINE_CONTACTS:
          return action.payload;
        case CONTACT_LOGIN:
          return [...state.filter(contact => contact.id !== action.payload.id),
             {...action.payload, current: true}];
        default:
          return state;
      }
};

export default contactsReducer;