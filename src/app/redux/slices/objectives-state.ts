import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Objective, Objectives } from '@data/objectives/objectives';
import { startingLineupFull } from '@data/players/players-utils';

interface IObjectivesState {
  currentObjectives: any[];
}

const initialState: IObjectivesState = {
  currentObjectives: [
    new Objective(
      'Learn about your budget and adjust your savings.',
      Objectives.LEARN_BUDGET
    ),
    new Objective('Fill your team by signing players.', Objectives.FILL_TEAM),
    new Objective('Play the season!', Objectives.PLAY_SEASON),
  ],
};

const objectivesStateSlice = createSlice({
  name: 'OBJECTIVES_STATE',
  initialState,
  reducers: {
    addObjective: (state, action: PayloadAction<any>) => {
      state.currentObjectives.unshift(action.payload);
    },
    setObjectiveComplete: (
      state,
      action: PayloadAction<{ objectiveType: any; isComplete: boolean }>
    ) => {
      const { objectiveType, isComplete } = action.payload;
      const objective = state.currentObjectives.find(
        (o) => o.type === objectiveType
      );
      if (objective) {
        objective.setIsComplete(isComplete);
      }
    },
    removeObjective: (state, action: PayloadAction<any>) => {
      const objectiveIndex = state.currentObjectives.findIndex(
        (o) => o.type === action.payload
      );
      if (objectiveIndex > -1) {
        state.currentObjectives.splice(objectiveIndex, 1);
      }
    },
    initializeObjectives: (
      state,
      action: PayloadAction<{ student: any; reset: boolean }>
    ) => {
      const { student, reset } = action.payload;
      // check if theyve watched the budget tutorial
      // @TODO
      // state.currentObjectives[0].isComplete = !!(
      //   student.objectives && student.objectives[Objectives.LEARN_BUDGET]
      // );
      // check if they have players

      state.currentObjectives[1].isComplete = startingLineupFull(student);
      if (reset) {
        state.currentObjectives = state.currentObjectives.filter(
          (o) => o.type !== Objectives.SEASON_SCENARIO
        );
      }
      // check for a season scenario
      if (
        student.objectives &&
        student.objectives[Objectives.SEASON_SCENARIO] === false
      ) {
        state.currentObjectives.unshift(
          new Objective(
            'Replace the injured player', // @TODO hard coding this is gross
            Objectives.SEASON_SCENARIO,
            true
          )
        );
      }
      console.log('state:::: ', JSON.parse(JSON.stringify(state)));
    },
  },
});

export const objectivesStateReducer = objectivesStateSlice.reducer;
export const {
  addObjective,
  setObjectiveComplete,
  removeObjective,
  initializeObjectives,
} = objectivesStateSlice.actions;
