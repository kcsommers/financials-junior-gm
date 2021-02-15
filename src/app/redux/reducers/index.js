import { combineReducers } from 'redux';
import tutorial from './tutorials.reducer';
import overlay from './overlay.reducer';
import studentState from './student-state.reducer';
import players from './players.reducer';
import loginState from './login-state.reducer';
import season from './season.reducer';


export default combineReducers({
  tutorial,
  overlay,
  studentState,
  players,
  loginState,
  season
});
