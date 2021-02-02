import { SELECT_CONTACT, REGISTER_MESSAGE, MESSAGE_WAS_VIEWED } from '../actions/types';

const selectedContactReducer = (state = {}, action)  => {
    switch (action.type) {
        case SELECT_CONTACT:
          return action.payload;
        case REGISTER_MESSAGE:
            return state.id ? {...state, messages: [...state.messages || [], action.payload] } : {};
        case MESSAGE_WAS_VIEWED: 
            return {...state, messages: state.messages
              .map(msg => msg.created !== action.payload.created ? msg : action.payload) };
        default:
          return state;
      }
};

export default selectedContactReducer;