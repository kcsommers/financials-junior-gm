import { combineReducers } from 'redux';
import tutorial from './tutorials.reducer';
import overlay from './overlay.reducer';
import studentState from './student-state.reducer';
import players from './players.reducer';
import season from './season.reducer';
import { DESTROY_SESSION } from '../actionTypes';

const appReducer = combineReducers({
  tutorial,
  overlay,
  studentState,
  players,
  season,
});

export const rootReducer = (state, action) => {
  // clears the redux store on logout
  if (action.type === DESTROY_SESSION) {
    state = undefined;
  }
  return appReducer(state, action);
};
