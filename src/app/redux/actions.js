import {
  SET_ANIMATION_STATE,
  TOGGLE_OVERLAY,
  SET_SCOUTING_STATE,
<<<<<<< HEAD
  SET_TUTORIAL_STATE
=======
  SET_TUTORIAL_STATE,
  SET_STUDENT,
  SET_SAVINGS,
>>>>>>> 2d5c66e44e1139f800b1b9e3d48739a2a590ad0b
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

export const setStudent = (student) => ({
  type: SET_STUDENT,
  payload: student,
});

export const setSavings = (amount) => ({
  type: SET_SAVINGS,
  payload: amount,
});
