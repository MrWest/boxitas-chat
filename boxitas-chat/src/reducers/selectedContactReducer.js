import { SELECT_CONTACT, REGISTER_MESSAGE, UPDATE_MESSAGES_STATUS } from '../actions/types';

const selectedContactReducer = (state = { messages: [] }, action)  => {
    switch (action.type) {
        case SELECT_CONTACT:
          return action.payload;
        case REGISTER_MESSAGE:
            return state.id ? {...state, 
              messages: state.messages.find(msg => msg.id === action.payload.id) ? [...state.messages] :
               [...state.messages, action.payload] } : {};
        case UPDATE_MESSAGES_STATUS: 
            return {...state, messages: state.messages
              .map(msg => {
                const msj = action.payload.find(m => !msg.wasViewed && m.id === msg.id);
                return msj ||  {...msg, wasViewed: true }}) };
        default:
          return state;
      }
};

export default selectedContactReducer;