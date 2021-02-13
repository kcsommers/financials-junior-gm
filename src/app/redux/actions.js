import {
  SET_ANIMATION_STATE,
  TOGGLE_OVERLAY,
  SET_SCOUTING_STATE,
  SET_TUTORIAL_STATE,
  SET_STUDENT,
  SET_SAVINGS,
  SET_MARKET_PLAYERS,
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

export const setScoutingState = (state) => ({
  type: SET_SCOUTING_STATE,
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

export const setMarketPlayers = (players) => ({
  type: SET_MARKET_PLAYERS,
  payload: players,
});

export const setInitialPlayersState = (players) => ({
  type: SET_INITIAL_PLAYERS_STATE,
  payload: players,
});

export const signPlayer = (player, assignment) => ({
  type: SIGN_PLAYER,
  payload: { player, assignment },
});

export const releasePlayer = (player) => ({
  type: RELEASE_PLAYER,
  payload: player,
});

export const tradePlayer = (releasedPlayer, signedPlayer, position) => ({
  type: TRADE_PLAYER,
  payload: { releasedPlayer, signedPlayer, position },
});
