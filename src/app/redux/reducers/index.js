import { combineReducers } from 'redux';
import tutorial from './tutorials.reducer';
import overlay from './overlay.reducer';
import scouting from './scouting.reducer';
import appState from './app-state.reducer';

export default combineReducers({ tutorial, overlay, scouting, appState });
