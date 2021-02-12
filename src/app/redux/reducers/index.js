import { combineReducers } from 'redux';
import tutorial from './tutorials.reducer';
import overlay from './overlay.reducer';
import scouting from './scouting.reducer';
import studentState from './student-state.reducer';

export default combineReducers({ tutorial, overlay, scouting, studentState });
