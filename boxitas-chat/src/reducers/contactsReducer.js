import { ONLINE_CONTACTS, CONTACT_LOGIN, CONTACT_LOGOUT } from '../actions/types';

const contactsReducer = (state = [], action)  => {
    switch (action.type) {
        case ONLINE_CONTACTS:
          return action.payload;
        case CONTACT_LOGIN:
          return [...state.filter(contact => contact.id !== action.payload.id),
             {...action.payload, current: true}];
        case CONTACT_LOGOUT:
          return state.map(contact => contact.id !== action.payload.id ? 
            contact :  {...action.payload, current: false})
        default:
          return state;
      }
};

export default contactsReducer;