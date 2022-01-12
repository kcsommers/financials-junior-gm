import { configureStore } from '@reduxjs/toolkit';
import { adminStateReducer } from './slices/admin-state';
import { loginStateReducer } from './slices/login-state';
import { objectivesStateReducer } from './slices/objectives-state';
import { overlayStateReducer } from './slices/overlay-state';
import { playersStateReducer } from './slices/players-state';
import { seasonStateReducer } from './slices/season-state';
import { studentStateReducer } from './slices/student-state';
import { teacherStateReducer } from './slices/teacher-state';
import { tutorialStateReducer } from './slices/tutorial-state';

export const store = configureStore({
  reducer: {
    tutorial: tutorialStateReducer,
    overlay: overlayStateReducer,
    studentState: studentStateReducer,
    players: playersStateReducer,
    season: seasonStateReducer,
    loginState: loginStateReducer,
    teacherState: teacherStateReducer,
    objectives: objectivesStateReducer,
    adminState: adminStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { overlay: OverlayState }
export type AppDispatch = typeof store.dispatch;

// @TODO
// export const rootReducer = (state, action) => {
//   // clears the redux store on logout
//   if (action.type === SET_LOGIN_STATE && !action.payload.isLoggedIn) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };
