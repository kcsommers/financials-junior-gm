import { SET_LOGIN_STATE } from './login-state.actions';
import { getIsLoggedIn, getUserRole } from '@data/auth/auth';

const initialState = {
  isLoggedIn: getIsLoggedIn(),
  userRole: getUserRole(),
};

const loginStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: {
      return {
        isLoggedIn: action.payload.isLoggedIn,
        userRole: action.payload.userRole || '',
      };
    }
    default:
      return state;
  }
};

export default loginStateReducer;
