import { SET_ADMIN } from './admin-state.actions';
import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

const initialState = {
  admin: null,
};

export const adminStateReducer: Reducer<typeof initialState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_ADMIN: {
      const clonedState = cloneDeep(state);
      clonedState.admin = action.payload;
      return clonedState;
    }
    default: {
      return state;
    }
  }
};
