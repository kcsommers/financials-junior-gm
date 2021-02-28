import { combineReducers } from 'redux';
import tutorial from './tutorials/tutorials.reducer';
import overlay from './overlay/overlay.reducer';
import studentState from './student-state/student-state.reducer';
import players from './players/players.reducer';
import loginState from './login-state/login-state.reducer';
import teacherState from './teacher-state/teacher-state-reducer';
import season from './season/season.reducer';
import objectives from './objectives/objectives.reducer';
import { SET_LOGIN_STATE } from './login-state/login-state.actions';

const appReducer = combineReducers({
  tutorial,
  overlay,
  studentState,
  players,
  season,
  loginState,
  teacherState,
  objectives,
});

export const rootReducer = (state, action) => {
  // clears the redux store on logout
  if (action.type === SET_LOGIN_STATE && !action.payload.isLoggedIn) {
    state = undefined;
  }
  return appReducer(state, action);
};
