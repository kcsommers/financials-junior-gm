export const SET_STUDENT = 'SET_STUDENT';

export const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const SET_SAVINGS = 'SET_SAVINGS';

export const SET_START_TIME = 'SET_START_TIME';

export const setStudent = (student) => ({
  type: SET_STUDENT,
  payload: student,
});

export const updateStudent = (newData) => ({
  type: UPDATE_STUDENT,
  payload: newData,
});

export const setSavings = (amount) => ({
  type: SET_SAVINGS,
  payload: amount,
});

export const setStartTime = () => ({
  type: SET_START_TIME,
});
