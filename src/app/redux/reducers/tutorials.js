import { SET_ANIMATION_STATE } from '../actionTypes';

const initialState = {
  home: {
    objectivesBoard: {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 0,
      opacity: 0,
    },
    teamRank: {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 0,
      opacity: 0,
    },
  },
};

const tutorialsReducer = (state = initialState, action) => {
  console.log('tutorialsReducer:::: ', state);
  switch (action.type) {
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
