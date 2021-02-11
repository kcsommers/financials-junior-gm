import {
  SET_ANIMATION_STATE,
  TOGGLE_OVERLAY,
  SET_TUTORIAL_IS_ACTIVE,
  SET_TUTORIAL_STATE,
} from './actionTypes';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: { state },
});

export const setTutorialIsActive = (state) => ({
  type: SET_TUTORIAL_IS_ACTIVE,
  payload: { state },
});

export const setTutorialState = (state) => ({
  type: SET_TUTORIAL_STATE,
  payload: { state },
});

export const toggleOverlay = (state) => ({
  type: TOGGLE_OVERLAY,
  payload: { state },
});
