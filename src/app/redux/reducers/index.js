import { combineReducers } from 'redux';
import tutorial from './tutorials.reducer';
import overlay from './overlay.reducer';
import scouting from './scouting.reducer';

export default combineReducers({ tutorial, overlay, scouting });
