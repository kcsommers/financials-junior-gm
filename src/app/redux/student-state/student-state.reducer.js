import {
  SET_STUDENT,
  SET_SAVINGS,
  UPDATE_STUDENT,
  SET_START_TIME,
} from './student-state.actions';
import { cloneDeep } from 'lodash';

const initialState = {
  student: null,
  startTime: null,
};

const studentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT: {
      const student = action.payload;
      if (!student) {
        return state;
      }

      const clonedState = cloneDeep(state);
      clonedState.student = student;

      return clonedState;
    }
    case UPDATE_STUDENT: {
      // total up money spent on players
      const clonedState = cloneDeep(state);
      clonedState.student = {
        ...clonedState.student,
        ...action.payload,
      };
      return clonedState;
    }
    case SET_SAVINGS: {
      const amount = action.payload;
      const clonedState = cloneDeep(state);
      clonedState.student.savingsBudget = amount;

      return clonedState;
    }
    case SET_START_TIME: {
      const clonedState = cloneDeep(state);
      clonedState.startTime = Date.now();

      return clonedState;
    }
    default:
      return state;
  }
};

export default studentStateReducer;
