export * from './login-state/login-state.actions';
export * from './overlay/overlay.actions';
export * from './players/players.actions';
export * from './season/season.actions';
export * from './student-state/student-state.actions';
export * from './teacher-state/teacher-state.actions';
export * from './tutorials/tutorials.actions';
export * from './objectives/objectives.actions';

export const DESTROY_SESSION = 'DESTROY_SESSION';
export const destroySession = () => ({
  type: DESTROY_SESSION,
  payload: null,
});
