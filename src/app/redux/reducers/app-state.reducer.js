import { SET_USER } from '../actionTypes';

const initialState = {
  user: null,
};

const overlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    default:
      return state;
  }
};

export default overlayReducer;
