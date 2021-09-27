import { combineReducers } from 'redux';
import { SET_LOGIN_STATE } from './actions';
import { adminStateReducer } from './admin-state/admin-state.reducer';
import { loginStateReducer } from './login-state/login-state.reducer';
import { objectivesReducer } from './objectives/objectives.reducer';
import { overlayReducer } from './overlay/overlay.reducer';
import { playersReducer } from './players/players.reducer';
import { seasonReducer } from './season/season.reducer';
import { studentStateReducer } from './student-state/student-state.reducer';
import { teacherStateReducer } from './teacher-state/teacher-state.reducer';
import { tutorialsReducer } from './tutorials/tutorials.reducer';

const appReducer = combineReducers({
  tutorial: tutorialsReducer,
  overlay: overlayReducer,
  studentState: studentStateReducer,
  players: playersReducer,
  season: seasonReducer,
  loginState: loginStateReducer,
  teacherState: teacherStateReducer,
  objectives: objectivesReducer,
  adminState: adminStateReducer,
});

export const rootReducer = (state, action) => {
  // clears the redux store on logout
  if (action.type === SET_LOGIN_STATE && !action.payload.isLoggedIn) {
    state = undefined;
  }
  return appReducer(state, action);
};
