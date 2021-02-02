import { SUBSCRIBED_CONTACTS, CONTACT_LOGIN, CONTACT_LOGOUT } from '../actions/types';

const contactsReducer = (state = [], action)  => {
    switch (action.type) {
        case SUBSCRIBED_CONTACTS:
          const myself = state.find(c => c.current);
          return action.payload.map(contact => contact.id !== myself.id ? 
            contact :  myself);
        case CONTACT_LOGIN:
          return [{...action.payload, current: true}, ...state.filter(contact => contact.id !== action.payload.id)];
        case CONTACT_LOGOUT:
          return state.map(contact => contact.id !== action.payload.id ? 
            contact :  {...action.payload, current: false})
        default:
          return state;
      }
};

export default contactsReducer;