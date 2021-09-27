import { SET_LOGIN_STATE } from './login-state.actions';
import { getIsLoggedIn, getUserRole } from '@data/auth/auth';
import { AnyAction } from 'redux';
import { Reducer } from 'react';

const initialState = {
  isLoggedIn: getIsLoggedIn(),
  userRole: getUserRole(),
};

export const loginStateReducer: Reducer<typeof initialState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
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
