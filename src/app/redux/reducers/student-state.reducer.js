import { SET_STUDENT, SET_SAVINGS } from '../actionTypes';

const initialState = {
  student: null,
};

const playerProps = [
  'fOne',
  'fTwo',
  'fThree',
  'dOne',
  'dTwo',
  'gOne',
  'benchOne',
  'benchTwo',
  'benchThree',
];

const studentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT: {
      // total up money spent on players
      const student = action.payload;
      const moneySpent = playerProps.reduce((total, p) => {
        const player = student[p];
        if (player) {
          total += player.playerCost;
        }
        return total;
      }, 0);
      student.moneySpent = moneySpent;

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
