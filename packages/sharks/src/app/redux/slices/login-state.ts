import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isLoggedIn, getUserRole } from '@statrookie/core';

export interface ILoginState {
  isLoggedIn: boolean;
  userRole: string;
}

const initialState: ILoginState = {
  isLoggedIn: isLoggedIn(),
  userRole: getUserRole(),
};

const loginStateSlice = createSlice({
  name: 'LOGIN_STATE',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<ILoginState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userRole = action.payload.userRole;
    },
  },
});

export const loginStateReducer = loginStateSlice.reducer;
export const { setLoginState } = loginStateSlice.actions;
