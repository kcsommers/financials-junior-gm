import { SET_ANIMATION_STATE, SET_TUTORIAL_STATE } from './tutorials.actions';

const initialState = {
  isActive: false,
  home: {},
  team: {
    playerCard: {
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: '0px',
      borderStyle: 'solid',
      scale: 1,
    },
    playerCardEmpty: {
      borderColor: '#f3901d',
      borderStyle: 'solid',
      scale: 1,
    },
    scoutStick: {
      scale: 1,
    },
  },
  scout: {
    availablePlayersBoard: {
      scale: 1,
      opacity: 1,
    },
    offeredPlayersBoard: {
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
  season: {
    stats: {
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0)',
      scale: 1,
      zIndex: 0,
    },
    standings: {
      borderColor: '#707070',
      scale: 1,
    },
    upcomingGames: {
      borderColor: 'rgba(0,0,0,0)',
      scale: 1,
      zIndex: 0,
    },
    jumbotext: {
      borderColor: 'rgba(0,0,0,0)',
      scale: 1,
    },
    playButton: {
      scale: 1,
    },
    studentRank: {
      scale: 1,
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
      const payload = action.payload;

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
