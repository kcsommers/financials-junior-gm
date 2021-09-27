import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIsLoggedIn, getUserRole } from '@data/auth/auth';

interface ILoginState {
  isLoggedIn: boolean;
  userRole: string;
}

const initialState: ILoginState = {
  isLoggedIn: getIsLoggedIn(),
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
