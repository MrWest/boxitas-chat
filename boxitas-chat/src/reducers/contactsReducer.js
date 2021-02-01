import { ONLINE_CONTACTS, CONTACT_LOGIN } from '../actions/types';

const contactsReducer = (state = [{ name: 'Karen' }, { name: 'Ashley'}, { name: 'Carl'}], action)  => {
    switch (action.type) {
        case ONLINE_CONTACTS:
          return action.payload;
        case CONTACT_LOGIN:
          return [...state.filter(contact => contact.id !== action.payload.id), action.payload];
        default:
          return state;
      }
};

export default contactsReducer;