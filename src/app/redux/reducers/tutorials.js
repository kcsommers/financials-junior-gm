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
  },
};

const tutorialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMATION_STATE: {
      console.log('PAYLOAD:::: ', action.payload.state);
      const newState = action.payload.state;
      return {
        ...state,
        [newState.page]: {
          ...state[newState.page],
          [newState.component]: {
            ...state[newState.page][newState.component],
            ...newState.state,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default tutorialsReducer;
