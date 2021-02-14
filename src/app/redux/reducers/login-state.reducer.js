import { SET_LOGIN_STATE } from '../actionTypes';

const initialState = {
  isLoggedIn: false,
  role: '',
};

const loginStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: {
      return {
        isLoggedIn: action.payload.isLoggedIn,
        role: action.payload.role || '',
      };
    }
    default:
      return state;
  }
};

export default loginStateReducer;
