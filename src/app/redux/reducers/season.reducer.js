import { allTeams, scenarios } from '@data/season/season';
import { cloneDeep } from 'lodash';
import {
  GAME_BLOCK_ENDED,
  SET_SCENARIO_COMPLETE,
  SET_SEASON_COMPLETE,
} from './../actionTypes';

const initialState = {
  previousGameBlocks: [], // array of game blocks
  gameBlocks: [
    allTeams.slice(0, 1),
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
    case GAME_BLOCK_ENDED: {
      const { results, scenario, student } = action.payload;

      const clonedState = cloneDeep(state);
      clonedState.previousGameBlocks.push(results);
      clonedState.currentBlockIndex = state.currentBlockIndex + 1;
      clonedState.currentScenario =
        scenarios[student.level][state.currentBlockIndex];
      return clonedState;
    }
    case SET_SCENARIO_COMPLETE: {
      const clonedState = cloneDeep(state);
      clonedState.currentScenario = null;
      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
