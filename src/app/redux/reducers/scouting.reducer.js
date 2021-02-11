import { SET_SCOUTING_STATE } from '../actionTypes';

const initialState = {
  levelOne: [],
  levelTwo: [],
  levelThree: [],
  available: [],
  initialized: false,
};

const scoutingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOUTING_STATE: {
      const newState = Object.keys(action.payload).reduce((obj, k) => {
        obj[k] = action.payload[k];
        return obj;
      }, {});

      return {
        ...state,
        ...newState,
      };
    }
    default:
      return state;
  }
};

export default scoutingReducer;
