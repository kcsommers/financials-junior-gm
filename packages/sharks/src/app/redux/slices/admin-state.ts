import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAdminState {
  admin: any;
}

const initialState: IAdminState = {
  admin: null,
};

const adminStateSlice = createSlice({
  name: 'ADMIN_STATE',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<any>) => {
      state.admin = action.payload;
    },
  },
});

export const adminStateReducer = adminStateSlice.reducer;
export const { setAdmin } = adminStateSlice.actions;
