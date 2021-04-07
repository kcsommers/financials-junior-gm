import { TOGGLE_OVERLAY } from './overlay.actions';

const initialState = {
  isOpen: false,
  template: null,
  sign: null,
  canClose: true,
  onClose: null,
};

const overlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY: {
      return {
        isOpen: action.payload.isOpen,
        template: action.payload.template,
        onClose: action.payload.onClose,
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
