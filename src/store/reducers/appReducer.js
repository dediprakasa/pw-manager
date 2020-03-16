import {
  SET_IS_LOADING, SET_ERROR
} from '../actionsType'

const initialState = {
  isLoading: false,
  error: null
}

export default function appReducer(state = initialState, action) {
  switch(action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}