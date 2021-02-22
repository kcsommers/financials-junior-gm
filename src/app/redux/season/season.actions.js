export const GAME_BLOCK_ENDED = 'GAME_BLOCK_ENDED';

export const SET_SEASON_COMPLETE = 'SET_SEASON_COMPLETE';

export const GAME_ENDED = 'GAME_ENDED';

export const THROW_SCENARIO = 'THROW_SCENARIO';

export const SET_CURRENT_OPPONENT_INDEX = 'SET_CURRENT_OPPONENT_INDEX';

export const INITIALIZE_SEASON = 'INITIALIZE_SEASON';

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
