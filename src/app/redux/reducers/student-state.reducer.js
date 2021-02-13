import { SET_STUDENT, SET_SAVINGS, PLAYER_SIGNED } from '../actionTypes';
import { getMoneySpent } from '@utils';
import { cloneDeep } from 'lodash';

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
    case PLAYER_SIGNED: {
      const player = action.payload.player;
      const position = action.payload.position;
      const student = state.student;

      student[position] = player;
      return cloneDeep(state);
    }
    default:
      return state;
  }
};

export default studentStateReducer;
