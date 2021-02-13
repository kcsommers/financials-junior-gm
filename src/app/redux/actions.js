import {
  SET_ANIMATION_STATE,
  TOGGLE_OVERLAY,
  SET_SCOUTING_STATE,
  SET_TUTORIAL_STATE,
  SET_STUDENT,
  SET_SAVINGS,
  PLAYER_SIGNED,
  SET_SIGNABLE_PLAYERS,
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

export const setSignablePlayers = (players) => ({
  type: SET_SIGNABLE_PLAYERS,
  payload: players,
});

export const plaerySigned = (player) => ({
  type: PLAYER_SIGNED,
  payload: player,
});
