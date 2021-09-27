export const ADD_OBJECTIVE = 'ADD_OBJECTIVE';

export const SET_OBJECTIVE_COMPLETE = 'SET_OBJECTIVE_COMPLETE';

export const REMOVE_OBJECTIVE = 'REMOVE_OBJECTIVE';

export const INITIALIZE_OBJECTIVES = 'INITIALIZE_OBJECTIVES';

export const addObjective = (objective: any) => ({
  type: ADD_OBJECTIVE,
  payload: objective,
});

export const setObjectiveComplete = (objectiveType: any, isComplete: any) => ({
  type: SET_OBJECTIVE_COMPLETE,
  payload: { objectiveType, isComplete },
});

export const removeObjective = (objectiveType: any) => ({
  type: REMOVE_OBJECTIVE,
  payload: objectiveType,
});

export const initializeObjectives = (student: any, reset: any) => ({
  type: INITIALIZE_OBJECTIVES,
  payload: { student, reset },
});
