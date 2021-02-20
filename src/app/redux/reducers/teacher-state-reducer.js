import { SET_TEACHER } from '../actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
  teacher: null,
};

const teacherStateReducer = (state = initialState, action) => {
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

export default teacherStateReducer;
