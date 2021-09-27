import { SET_TEACHER } from './teacher-state.actions';
import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

const initialState = {
  teacher: null,
};

export const teacherStateReducer: Reducer<typeof initialState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_TEACHER: {
      const clonedState = cloneDeep(state);
      clonedState.teacher = action.payload;
      return clonedState;
    }
    default: {
      return state;
    }
  }
};
