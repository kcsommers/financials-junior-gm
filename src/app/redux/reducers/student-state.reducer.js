import { SET_STUDENT, SET_SAVINGS, UPDATE_STUDENT } from '../actionTypes';
import { getMoneySpent } from '@utils';
import { cloneDeep } from 'lodash';

const initialState = {
  student: null,
  pagesVisited: null,
};

const studentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT: {
      // total up money spent on players
      const student = action.payload;
      const clonedState = cloneDeep(state);

      student.moneySpent = getMoneySpent(student);
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
      clonedState.student.moneySpent = getMoneySpent(clonedState.student);
      return clonedState;
    }
    case SET_SAVINGS: {
      const amount = action.payload;
      const clonedState = cloneDeep(state);
      clonedState.student.savingsBudget = amount;

      return clonedState;
    }
    default:
      return state;
  }
};

export default studentStateReducer;
