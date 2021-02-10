import {SET_SIGN_STATE} from '../actionTypes'

const initialState = {
  sign: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_SIGN_STATE:
      return {
        ...state,
        sign: action.payload
      }
    default: 
      return state;
  }
}