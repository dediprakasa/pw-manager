import { combineReducers } from 'redux'
import userReducer from './userReducer'
import appReducer from './appReducer'
import passwordReducer from './passwordReducer'

export default combineReducers({
  user: userReducer,
  app: appReducer,
  password: passwordReducer
})