import { TOGGLE_OVERLAY } from '../actionTypes';

const initialState = {
  isOpen: false,
  template: null,
  tutorialActive: false,
};

const overlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY: {
      console.log(state, action.payload.state);
      return {
        isOpen: action.payload.state.isOpen,
        template: action.payload.state.template,
      };
    }
    default:
      return state;
  }
};

export default overlayReducer;
