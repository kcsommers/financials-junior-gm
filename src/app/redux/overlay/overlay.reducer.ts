import { TOGGLE_OVERLAY } from './overlay.actions';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

type OverlayState = {
  isOpen: boolean;
  template: any;
  sign: any;
  canClose: boolean;
  onClose: any;
};

const initialState: OverlayState = {
  isOpen: false,
  template: null,
  sign: null,
  canClose: true,
  onClose: null,
};

export const overlayReducer: Reducer<OverlayState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOGGLE_OVERLAY: {
      return {
        sign: action.payload.sign,
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
