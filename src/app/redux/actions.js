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
  DESTROY_SESSION,
  SET_SCORE,
  SET_RANK,
  SET_IMAGE,
  SET_NAME,
  SET_STATS,
  SET_STANDINGS,
  UPDATE_CURRENT_OPPONENT,
  SET_TEAMS,
  SET_JUMBOTRON_DISPLAY,
  SET_SEASON_SIGN,
  SET_SIMULATION_BUTTON,
  SET_SIMULATE_GAME,
  UPDATE_OPPONENT_INDEX,
  UPDATE_TEAMS,
  UPDATE_SEASON_STATE,
  GAME_BLOCK_ENDED,
  INJURE_PLAYER,
  THROW_SCENARIO,
  SET_SEASON_COMPLETE,
  GAME_ENDED,
  SET_CURRENT_OPPONENT_INDEX,
  INITIALIZE_SEASON,
  SET_LOGIN_STATE,
  SET_TEACHER,
} from './actionTypes';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: state,
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

export const signPlayer = (player, assignment, student) => ({
  type: SIGN_PLAYER,
  payload: { player, assignment, student },
});

export const releasePlayer = (player, prevAssignment, student) => ({
  type: RELEASE_PLAYER,
  payload: { player, prevAssignment, student },
});

export const tradePlayer = (releasedPlayer, signedPlayer, student) => ({
  type: TRADE_PLAYER,
  payload: { releasedPlayer, signedPlayer, student },
});

export const injurePlayer = (injuredPlayer, previousAssignment) => ({
  type: INJURE_PLAYER,
  payload: { injuredPlayer, previousAssignment },
});

export const destroySession = () => ({
  type: DESTROY_SESSION,
  payload: null,
});

export const setScore = (state) => ({
  type: SET_SCORE,
  payload: state,
});

export const setRank = (state) => ({
  type: SET_RANK,
  payload: { state },
});

export const setImage = (state) => ({
  type: SET_IMAGE,
  payload: { state },
});

export const setName = (state) => ({
  type: SET_NAME,
  payload: { state },
});

export const setStats = (state) => ({
  type: SET_STATS,
  payload: state,
});

export const setStandings = (state) => ({
  type: SET_STANDINGS,
  payload: { state },
});

export const updateCurrentOpponent = (currentOpponent) => ({
  type: UPDATE_CURRENT_OPPONENT,
  payload: currentOpponent,
});

export const updateOpponentIndex = (currentOpponentIndex) => ({
  type: UPDATE_OPPONENT_INDEX,
  payload: currentOpponentIndex,
});

export const setUpcomingGames = (state) => ({
  type: SET_TEAMS,
  payload: { state },
});

export const setJumbotronDisplay = (display) => ({
  type: SET_JUMBOTRON_DISPLAY,
  payload: display,
});

export const setSeasonSign = (sign) => ({
  type: SET_SEASON_SIGN,
  payload: sign,
});

export const setSimulationButton = (simulation) => ({
  type: SET_SIMULATION_BUTTON,
  payload: simulation,
});

export const setSimulateGame = (state) => ({
  type: SET_SIMULATE_GAME,
  payload: state,
});

export const updateTeams = (state) => ({
  type: UPDATE_TEAMS,
  payload: state,
});

export const updateSeasonState = (updatedState) => ({
  type: UPDATE_SEASON_STATE,
  payload: updatedState,
});

export const gameBlockEnded = () => ({
  type: GAME_BLOCK_ENDED,
  payload: null,
});

export const setSeasonComplete = (student) => ({
  type: SET_SEASON_COMPLETE,
  payload: student,
});

export const gameEnded = (gameResult, opponent) => ({
  type: GAME_ENDED,
  payload: { gameResult, opponent },
});

export const throwScenario = (scenario) => ({
  type: THROW_SCENARIO,
  payload: scenario,
});

export const setCurrentOpponentIndex = (index) => ({
  type: SET_CURRENT_OPPONENT_INDEX,
  payload: index,
});

export const initializeSeason = (student) => ({
  type: INITIALIZE_SEASON,
  payload: student,
});

export const setLoginState = (isLoggedIn, userRole) => ({
  type: SET_LOGIN_STATE,
  payload: { isLoggedIn, userRole },
});

export const setTeacher = (teacher) => ({
  type: SET_TEACHER,
  payload: teacher,
});
