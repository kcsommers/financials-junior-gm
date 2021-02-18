import { allTeams } from '@data/season/season';
import { cloneDeep } from 'lodash';
import {
  GAME_BLOCK_ENDED,
  SET_SEASON_COMPLETE,
  GAME_ENDED,
  THROW_SCENARIO,
} from './../actionTypes';

const initialState = {
  completedBlocks: [], // array of game blocks
  completedGames: [],
  gameBlocks: [
    allTeams.slice(0, 4),
    allTeams.slice(4, 8),
    allTeams.slice(8, 12),
  ],
  currentBlockIndex: 0,
  currentScenario: null,
  allTeams: cloneDeep(allTeams),
  isComplete: false,
  stats: {
    wins: 0,
    losses: 0,
    points: 0,
  },
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case THROW_SCENARIO: {
      const clonedState = cloneDeep(state);
      const scenario = action.payload;
      clonedState.currentScenario = scenario;
      return clonedState;
    }
    case GAME_BLOCK_ENDED: {
      const clonedState = cloneDeep(state);

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.currentBlockIndex = state.currentBlockIndex + 1;
      clonedState.currentScenario = null;
      clonedState.completedGames = [];
      console.log(
        'GAME BLOCK ENDED:::: ',
        clonedState.currentBlockIndex,
        clonedState.completedGames
      );
      return clonedState;
    }
    case GAME_ENDED: {
      const { gameResult, opponent } = action.payload;
      const clonedState = cloneDeep(state);
      clonedState.stats.points += gameResult.score[0];
      opponent.stats.points += gameResult.score[1];
      if (gameResult.score[0] > gameResult.score[1]) {
        clonedState.stats.wins += 1;
        opponent.stats.losses += 1;
      } else {
        clonedState.stats.losses += 1;
        opponent.stats.wins += 1;
      }
      clonedState.completedGames.push(gameResult);
      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
