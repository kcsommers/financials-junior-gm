import { configureStore } from '@reduxjs/toolkit';
import { adminStateReducer } from './admin-state/admin-state';
import { loginStateReducer } from './login-state/login-state';
import { objectivesStateReducer } from './objectives/objectives-state';
import { overlayStateReducer } from './overlay/overlay-state';
import { playersStateReducer } from './players/players-state';
import { seasonStateReducer } from './season/season-state';
import { studentStateReducer } from './student-state/student-state';
import { teacherStateReducer } from './teacher-state/teacher-state';
import { tutorialStateReducer } from './tutorials/tutorial-state';

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
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { overlay: OverlayState }
export type AppDispatch = typeof store.dispatch;
