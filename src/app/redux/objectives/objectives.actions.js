export const ADD_OBJECTIVE = 'ADD_OBJECTIVE';

export const SET_OBJECTIVE_COMPLETE = 'SET_OBJECTIVE_COMPLETE';

export const REMOVE_OBJECTIVE = 'REMOVE_OBJECTIVE';

export const INITIALIZE_OBJECTIVES = 'INITIALIZE_OBJECTIVES';

export const addObjective = (objective) => ({
  type: ADD_OBJECTIVE,
  payload: objective,
});

export const setObjectiveComplete = (objectiveType, isComplete) => ({
  type: SET_OBJECTIVE_COMPLETE,
  payload: { objectiveType, isComplete },
});

export const removeObjective = (objective) => ({
  type: REMOVE_OBJECTIVE,
  payload: objective,
});

export const initializeObjectives = (student) => ({
  type: INITIALIZE_OBJECTIVES,
  payload: student,
});
