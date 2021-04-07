import { SET_ADMIN } from './admin-state.actions';
import { cloneDeep } from 'lodash';

const initialState = {
  admin: null,
};

const adminStateReducer = (state = initialState, action) => {
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

export default adminStateReducer;
