import {
  SET_IS_LOGGED_IN
} from '../actionsType'

const initialUserState = {
  isLoggedIn: false,
  userId: null
}

export default function userReducer(state = initialUserState, action) {
  switch(action.type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        userId: action.userId
      }
    default:
      return state
  }
}