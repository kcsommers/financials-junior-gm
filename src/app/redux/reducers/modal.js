import { TOGGLE_MODAL } from '../actionTypes';

const initialState = {
  isOpen: false,
  template: null,
};

const tutorialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
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

export default tutorialsReducer;
