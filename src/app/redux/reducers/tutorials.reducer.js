import { SET_ANIMATION_STATE, SET_TUTORIAL_STATE } from '../actionTypes';

const initialState = {
  isActive: false,
  home: {
    objectivesBoard: {
      x: '0%',
      y: '0%',
      scale: 1,
      opacity: 0,
    },
    teamRankCard: {
      x: '0%',
      y: '0%',
      scale: 1,
      opacity: 0,
    },
    budgetCard: {
      x: '0%',
      y: '0%',
      scale: 1,
      opacity: 0,
    },
    teamStick: {
      x: '0%',
      y: '0%',
      scale: 1,
      opacity: 0,
    },
    budgetStick: {
      x: '0%',
      y: '0%',
      scale: 1,
      opacity: 0,
    },
  },
  team: {
    playerCard: {
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: '0px',
      borderStyle: 'solid',
      scale: 1,
    },
    playerCardEmpty: {
      borderColor: '#f3901d',
      borderWidth: '3px',
      borderStyle: 'solid',
      scale: 1,
    },
  },
  scout: {
    availablePlayersBoard: {
      scale: 1,
      opacity: 1,
    },
    moneyLevel1: {
      scale: 1,
      opacity: 1,
    },
    moneyLevel2: {
      scale: 1,
      opacity: 1,
    },
    moneyLevel3: {
      scale: 1,
      opacity: 1,
    },
    finishedBtn: {
      scale: 1,
      opacity: 1,
    },
  },
  budget: {
    equationBoard: {
      scale: 1,
      opacity: 1,
    },
    total: {
      scale: 1,
      opacity: 1,
    },
    spending: {
      scale: 1,
      opacity: 1,
    },
    savings: {
      scale: 1,
      opacity: 1,
    },
  },
};

const tutorialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TUTORIAL_STATE: {
      return {
        ...state,
        isActive: action.payload.state.isActive,
      };
    }
    case SET_ANIMATION_STATE: {
      const payload = action.payload.state;
      const componentStates = {};
      if (payload.animationStates && payload.animationStates.length) {
        payload.animationStates.forEach((s) => {
          componentStates[s.component] = {
            ...state[payload.page][s.component],
            ...s.state,
          };
        });
      }

      return {
        ...state,
        [payload.page]: {
          ...state[payload.page],
          ...componentStates,
        },
      };
    }
    default:
      return state;
  }
};

export default tutorialsReducer;
