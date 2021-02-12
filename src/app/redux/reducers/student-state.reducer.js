import { SET_STUDENT, SET_SAVINGS } from '../actionTypes';
import { getMoneySpent } from './../../utils';

const initialState = {
  student: null,
};

const studentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT: {
      // total up money spent on players
      const student = action.payload;
      student.moneySpent = getMoneySpent(student);

      return { ...state, student };
    }
    case SET_SAVINGS: {
      const amount = action.payload;
      return {
        ...state,
        student: {
          ...state.student,
          savingsBudget: amount,
        },
      };
    }
    default:
      return state;
  }
};

export default studentStateReducer;
