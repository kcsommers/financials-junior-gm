import { SET_SCOUTING_STATE } from '../actionTypes';

const initialState = {
  levelOne: [],
  levelTwo: [],
  levelThree: [],
  available: [],
};

const scoutingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOUTING_STATE: {
      return {
        levelOne: action.payload.levelOne,
        levelTwo: action.payload.levelTwo,
        levelThree: action.payload.levelThree,
        available: action.payload.available,
      };
    }
    default:
      return state;
  }
};

export default scoutingReducer;
