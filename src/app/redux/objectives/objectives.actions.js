export const ADD_OBJECTIVE = 'ADD_OBJECTIVE';

export const OBJECTIVE_COMPLETE = 'OBJECTIVE_COMPLETE';

export const REMOVE_OBJECTIVE = 'REMOVE_OBJECTIVE';

export const addObjective = (objective) => ({
  type: ADD_OBJECTIVE,
  payload: objective,
});

export const objectiveComplete = (objective) => ({
  type: OBJECTIVE_COMPLETE,
  payload: objective,
});

export const removeObjective = (objective) => ({
  type: REMOVE_OBJECTIVE,
  payload: objective,
});
