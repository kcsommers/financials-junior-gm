import { TOGGLE_OVERLAY } from '../actionTypes';

const initialState = {
  isOpen: false,
  template: null,
  sign: null,
  tutorialActive: false,
};

const overlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY: {
      return {
        isOpen: action.payload.state.isOpen,
        template: action.payload.state.template,
        sign: action.playload,
      };
    }
    default:
      return state;
  }
};

export default overlayReducer;
