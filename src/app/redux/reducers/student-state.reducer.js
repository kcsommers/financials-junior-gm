import { SET_STUDENT, SET_SAVINGS, UPDATE_STUDENT } from '../actionTypes';
import { getMoneySpent, getTeamRank } from '@utils';
import { cloneDeep } from 'lodash';

const initialState = {
  student: null,
  pagesVisited: null,
};

const studentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT: {
      const student = action.payload;
      if (!student) {
        return state;
      }

      // total up money spend and teamRank
      student.moneySpent = getMoneySpent(student.players);
      student.teamRank = getTeamRank(student.players);

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
      clonedState.student.moneySpent = getMoneySpent(clonedState.student);
      clonedState.student.teamRank = getTeamRank(clonedState.student);
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
