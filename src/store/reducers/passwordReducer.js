import {
  PUSH_PASSWORDS
} from '../actionsType'

const initialState = []

export default function appReducer(state = initialState, action) {
  switch(action.type) {
    case PUSH_PASSWORDS:
      return [...action.passwords]
    default:
      return state
  }
}