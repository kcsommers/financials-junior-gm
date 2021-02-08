import { SET_ANIMATION_STATE, TOGGLE_MODAL, SET_SIGN_STATE } from './actionTypes';

export const setAnimationState = (state) => ({
  type: SET_ANIMATION_STATE,
  payload: { state },
});

export const toggleModal = (state) => ({
  type: TOGGLE_MODAL,
  payload: { state },
});

export const setSignState = (state) => ({
  type: SET_SIGN_STATE,
  payload: {state}
})
