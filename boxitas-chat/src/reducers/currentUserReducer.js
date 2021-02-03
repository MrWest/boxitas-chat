import { CONTACT_LOGIN, CONTACT_LOGOUT } from '../actions/types';

const currentUserReducer = (state = {}, action)  => {
    switch (action.type) {
        case CONTACT_LOGIN:
          return action.payload;
        case CONTACT_LOGOUT:
          return {}
        default:
          return state;
      }
};


export default currentUserReducer;