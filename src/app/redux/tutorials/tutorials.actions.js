export const SET_ANIMATION_STATE = 'SET_ANIMATION_STATE';
export const SET_TUTORIAL_STATE = 'SET_TUTORIAL_STATE';
export const SET_ADVANCE_LISTENER = 'SET_ADVANCE_LISTENER';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: state,
});

export const setTutorialState = (state) => ({
  type: SET_TUTORIAL_STATE,
  payload: { state },
});

export const setAdvanceListener = (listener) => ({
  type: SET_ADVANCE_LISTENER,
  payload: listener,
});
