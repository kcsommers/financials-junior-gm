import {
  SET_ANIMATION_STATE,
  TOGGLE_OVERLAY,
  UPDATE_SCOUT_PLAYER,
  SET_TUTORIAL_STATE,
  SET_STUDENT,
  SET_SAVINGS,
  SCOUTING_COMPLETE,
  SET_INITIAL_PLAYERS_STATE,
  RELEASE_PLAYER,
  SIGN_PLAYER,
  UPDATE_STUDENT,
  TRADE_PLAYER,
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

export const updateScoutPlayer = (state) => ({
  type: UPDATE_SCOUT_PLAYER,
  payload: state,
});

export const setStudent = (student) => ({
  type: SET_STUDENT,
  payload: student,
});

export const updateStudent = (newData) => ({
  type: UPDATE_STUDENT,
  payload: newData,
});

export const setSavings = (amount) => ({
  type: SET_SAVINGS,
  payload: amount,
});

export const scoutingComplete = (levelOne, levelTwo, levelThree) => ({
  type: SCOUTING_COMPLETE,
  payload: { levelOne, levelTwo, levelThree },
});

export const setInitialPlayersState = (players, student) => ({
  type: SET_INITIAL_PLAYERS_STATE,
  payload: { players, student },
});

export const signPlayer = (player, assignment) => ({
  type: SIGN_PLAYER,
  payload: { player, assignment },
});

export const releasePlayer = (player, prevAssignment) => ({
  type: RELEASE_PLAYER,
  payload: { player, prevAssignment },
});

export const tradePlayer = (releasedPlayer, signedPlayer) => ({
  type: TRADE_PLAYER,
  payload: { releasedPlayer, signedPlayer },
});
