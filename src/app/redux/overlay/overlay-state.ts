import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOverlayState {
  isOpen: boolean;
  template: any;
  sign: any;
  canClose: boolean;
  onClose: any;
}

const initialState: IOverlayState = {
  isOpen: false,
  template: null,
  sign: null,
  canClose: true,
  onClose: null,
};

const overlayStateSlice = createSlice({
  name: 'OVERLAY_STATE',
  initialState,
  reducers: {
    toggleOverlay: (state, action: PayloadAction<IOverlayState>) => {
      state.sign = action.payload.sign;
      state.isOpen = action.payload.isOpen;
      state.template = action.payload.template;
      state.onClose = action.payload.onClose;
      state.canClose = action.payload.canClose;
    },
  },
});

export const overlayStateReducer = overlayStateSlice.reducer;
export const { toggleOverlay } = overlayStateSlice.actions;
