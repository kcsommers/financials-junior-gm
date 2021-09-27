export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';

export const setLoginState = (isLoggedIn: boolean, userRole: string) => ({
  type: SET_LOGIN_STATE,
  payload: { isLoggedIn, userRole },
});
