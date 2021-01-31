import { REGISTER_MESSAGE } from '../actions/types';

const selectedContactReducer = (state = {}, action)  => {
    switch (action.type) {
        case REGISTER_MESSAGE:
          return action.payload;
    
        default:
          return state;
      }
};

export default selectedContactReducer;