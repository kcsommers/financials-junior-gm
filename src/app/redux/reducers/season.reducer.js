import { allTeams } from '@data/season/season';
import { cloneDeep } from 'lodash';
import { GAME_BLOCK_ENDED } from './../actionTypes';

const initialState = {
  previousGameBlocks: [], // array of game blocks
  gameBlocks: [
    allTeams.slice(0, 4),
    allTeams.slice(4, 8),
    allTeams.slice(8, 12),
  ],
  gameBlockIndex: 0,
  currentScenario: null,
  allTeams: cloneDeep(allTeams),
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_BLOCK_ENDED: {
      const { blockIndex, newBlockIndex, results, student } = action.payload;

      const clonedState = cloneDeep(state);
      clonedState.previousGameBlocks = action.payload.gameBlocks;
      clonedState.gameBlockIndex = action.payload.gameBlockIndex;
      clonedState.scenario = scenarios[student.level][blockIndex];
      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
