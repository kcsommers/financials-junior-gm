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
  SET_SCORE,
  SET_RANK,
  SET_IMAGE,
  SET_NAME,
  SET_STATS,
  SET_STANDINGS,
  SET_NEXT_OPPONENT,
  SET_UPCOMING_GAMES,
  SET_JUMBOTRON_DISPLAY,
  SET_SEASON_SIGN,
  SET_SIMULATION_BUTTON
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

export const setInitialPlayersState = (players) => ({
  type: SET_INITIAL_PLAYERS_STATE,
  payload: players,
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

export const setScore = (state) => ({
  type: SET_SCORE,
  payload: {state}
})

export const setRank = (state) => ({
  type: SET_RANK,
  payload: {state}
})

export const setImage = (state) => ({
  type: SET_IMAGE,
  payload: {state}
})

export const setName = (state) => ({
  type: SET_NAME,
  payload: {state}
})

export const setStats = (state) => ({
  type: SET_STATS,
  payload: {state}
})

export const setStandings = (state) => ({
  type: SET_STANDINGS,
  payload: {state}
})

export const setNextOpponent = (state) => ({
  type: SET_NEXT_OPPONENT,
  payload: {state}
})

export const setUpcomingGames = (state) => ({
  type: SET_UPCOMING_GAMES,
  payload: {state}
})

export const setJumbotronDisplay = (display) => ({
  type: SET_JUMBOTRON_DISPLAY,
  payload: display
})

export const setSeasonSign = (sign) => ({
  type: SET_SEASON_SIGN,
  payload: sign
})

export const setSimulationButton = (simulation) => ({
  type: SET_SIMULATION_BUTTON,
  payload: simulation
})