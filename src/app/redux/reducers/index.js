import { combineReducers } from 'redux';
import tutorial from './tutorials.reducer';
import overlay from './overlay.reducer';
import studentState from './student-state.reducer';
import players from './players.reducer';
import loginState from './login-state.reducer';
import season from './season.reducer';
import { SET_LOGIN_STATE } from '../actionTypes';

const appReducer = combineReducers({
  tutorial,
  overlay,
  studentState,
  players,
  loginState,
  season,
});

export const rootReducer = (state, action) => {
  // clears the redux store on logout
  if (action.type === SET_LOGIN_STATE && !action.payload.isLoggedIn) {
    state = undefined;
  }
  return appReducer(state, action);
};
