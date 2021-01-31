import { REGISTER_MESSAGE } from '../actions/types';

const contactsReducer = (state = [{ name: 'Karen' }, { name: 'Ashley'}, { name: 'Carl'}], action)  => {
    switch (action.type) {
        case REGISTER_MESSAGE:
          return action.payload;
    
        default:
          return state;
      }
};

export default contactsReducer;