import { SET_ANIMATION_STATE, TOGGLE_MODAL } from './actionTypes';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: { state },
});

export const toggleModal = (state) => ({
  type: TOGGLE_MODAL,
  payload: { state },
});
