export const SET_SEASON_COMPLETE = 'SET_SEASON_COMPLETE';

export const GAME_ENDED = 'GAME_ENDED';

export const THROW_SCENARIO = 'THROW_SCENARIO';

export const INITIALIZE_SEASON = 'INITIALIZE_SEASON';

export const SET_IN_TRANSITION = 'SET_IN_TRANSITION';

export const SET_SEASON_ACTIVE = 'SET_SEASON_ACTIVE';

export const REMOVE_SCENARIO = 'REMOVE_SCENARIO';

export const setSeasonComplete = (student) => ({
  type: SET_SEASON_COMPLETE,
  payload: student,
});

export const setSeasonActive = (isActive) => ({
  type: SET_SEASON_ACTIVE,
  payload: isActive,
});

export const gameEnded = (gameResult, opponent, newOpponentIndex) => ({
  type: GAME_ENDED,
  payload: { gameResult, opponent, newOpponentIndex },
});

export const throwScenario = (scenario) => ({
  type: THROW_SCENARIO,
  payload: scenario,
});

export const removeScenario = () => ({
  type: THROW_SCENARIO,
});

export const initializeSeason = (student) => ({
  type: INITIALIZE_SEASON,
  payload: student,
});

export const setInTransition = (inTransition) => ({
  type: SET_IN_TRANSITION,
  payload: inTransition,
});
