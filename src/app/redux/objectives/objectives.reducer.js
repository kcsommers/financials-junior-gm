import { Objective } from '@data/objectives/objectives';
import {
  ADD_OBJECTIVE,
  OBJECTIVE_COMPLETE,
  REMOVE_OBJECTIVE,
} from './objectives.actions';
import { cloneDeep } from 'lodash';

const initialState = {
  currentObjectives: [
    new Objective('Learn about your budget.'),
    new Objective('Fill your team by signing players.'),
    new Objective('Scout three more players for your bench.'),
  ],
};

const objectivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OBJECTIVE: {
      const clonedState = cloneDeep(state);
      clonedState.currentObjectives.unshift(action.payload);
      return clonedState;
    }

    case OBJECTIVE_COMPLETE: {
      const clonedState = cloneDeep(state);
      clonedState.currentObjectives.splice(
        clonedState.currentObjectives.findIndex(
          (o) => o.id === action.payload.id
        ),
        1,
        action.payload.id
      );
      return clonedState;
    }

    case REMOVE_OBJECTIVE: {
      const clonedState = cloneDeep(state);
      clonedState.currentObjectives.splice(
        clonedState.currentObjectives.findIndex(
          (o) => o.id === action.payload.id
        ),
        1
      );
      return clonedState;
    }

    default:
      return state;
  }
};

export default objectivesReducer;
