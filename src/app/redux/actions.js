import {
  SET_ANIMATION_STATE,
  TOGGLE_MODAL,
  SET_TUTORIAL_IS_ACTIVE,
} from './actionTypes';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: { state },
});

export const setTutorialIsActive = (state) => ({
  type: SET_TUTORIAL_IS_ACTIVE,
  payload: { state },
});

export const toggleModal = (state) => ({
  type: TOGGLE_MODAL,
  payload: { state },
});
