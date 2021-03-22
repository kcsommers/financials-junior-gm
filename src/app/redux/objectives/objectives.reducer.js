import { Objective, Objectives } from '@data/objectives/objectives';
import {
  ADD_OBJECTIVE,
  SET_OBJECTIVE_COMPLETE,
  REMOVE_OBJECTIVE,
  INITIALIZE_OBJECTIVES,
} from './objectives.actions';
import { cloneDeep } from 'lodash';
import { startingLineupFull } from '@data/players/players-utils';

const initialState = {
  currentObjectives: [
    new Objective(
      'Learn about your budget and adjust your savings.',
      Objectives.LEARN_BUDGET
    ),
    new Objective('Fill your team by signing players.', Objectives.FILL_TEAM),
    new Objective('Play the season!', Objectives.PLAY_SEASON),
  ],
};

const objectivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_OBJECTIVES: {
      const student = action.payload;
      const clonedState = cloneDeep(state);

      clonedState.currentObjectives = initialState.currentObjectives;

      // check if theyve watched the budget tutorial
      clonedState.currentObjectives[0].setIsComplete(
        !!(student.objectives && student.objectives[Objectives.LEARN_BUDGET])
      );

      // check if they have players
      clonedState.currentObjectives[1].setIsComplete(
        startingLineupFull(student)
      );

      // check for a season scenario
      if (
        student.objectives &&
        student.objectives[Objectives.SEASON_SCENARIO] === false
      ) {
        clonedState.currentObjectives.unshift(
          new Objective(
            'Replace the injured player', // @TODO hard coding this is gross
            Objectives.SEASON_SCENARIO,
            true
          )
        );
      }

      return clonedState;
    }
    case ADD_OBJECTIVE: {
      const clonedState = cloneDeep(state);
      clonedState.currentObjectives.unshift(action.payload);
      return clonedState;
    }

    case SET_OBJECTIVE_COMPLETE: {
      const { objectiveType, isComplete } = action.payload;
      const clonedState = cloneDeep(state);

      const objective = clonedState.currentObjectives.find(
        (o) => o.type === objectiveType
      );
      if (!objective) {
        return state;
      }

      objective.setIsComplete(isComplete);

      return clonedState;
    }

    case REMOVE_OBJECTIVE: {
      const objectiveType = action.payload;
      const objectiveIndex = state.currentObjectives.findIndex(
        (o) => o.type === objectiveType
      );

      if (objectiveIndex > -1) {
        const clonedState = cloneDeep(state);
        clonedState.currentObjectives.splice(objectiveIndex, 1);
        return clonedState;
      }

      return state;
    }

    default:
      return state;
  }
};

export default objectivesReducer;
