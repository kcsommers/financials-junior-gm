import { TOGGLE_OVERLAY } from '../actionTypes';

const initialState = {
  isOpen: false,
  template: null,
  sign: null,
  canClose: true,
};

const overlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY: {
      return {
        isOpen: action.payload.isOpen,
        template: action.payload.template,
        canClose:
          action.payload.canClose === undefined
            ? true
            : action.payload.canClose,
      };
    }
    default:
      return state;
  }
};

export default overlayReducer;
