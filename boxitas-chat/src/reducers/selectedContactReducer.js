import { SELECT_CONTACT, REGISTER_MESSAGE } from '../actions/types';

const selectedContactReducer = (state = {}, action)  => {
    switch (action.type) {
        case SELECT_CONTACT:
          return action.payload;
        case REGISTER_MESSAGE:
            return {...state, messages: [...state.messages || [], action.payload] };
    
        default:
          return state;
      }
};

export default selectedContactReducer;