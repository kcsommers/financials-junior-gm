import {
  SET_ANIMATION_STATE,
  TOGGLE_OVERLAY,
  SET_SCOUTING_STATE,
  SET_TUTORIAL_STATE,
} from './actionTypes';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: { state },
});

export const setTutorialState = (state) => ({
  type: SET_TUTORIAL_STATE,
  payload: { state },
});

export const toggleOverlay = (state) => ({
  type: TOGGLE_OVERLAY,
  payload: state,
});

export const setScoutingState = (state) => ({
  type: SET_SCOUTING_STATE,
  payload: state,
});
