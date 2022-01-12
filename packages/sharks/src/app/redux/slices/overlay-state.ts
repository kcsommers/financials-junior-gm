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
    toggleOverlay: (state, action: PayloadAction<Partial<IOverlayState>>) => {
      state.sign = action.payload.sign;
      state.isOpen = action.payload.isOpen || false;
      state.template = action.payload.template;
      state.onClose = action.payload.onClose;
      state.canClose = action.payload.canClose || false;
    },
  },
});

export const overlayStateReducer = overlayStateSlice.reducer;
export const { toggleOverlay } = overlayStateSlice.actions;
