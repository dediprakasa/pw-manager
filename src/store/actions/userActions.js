import { 
  SET_IS_LOGGED_IN,
  SET_IS_LOADING,
  SET_ERROR
} from '../actionsType'
import { firebaseAppAuth } from '../../configs/firebaseConfig'

export function setIsLoggedIn(userId, isLoggedIn = true) {
  return {
    type: SET_IS_LOGGED_IN,
    userId,
    isLoggedIn
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error
  }
}

export function submitRegister(email, password) {
  return function(dispatch) {
    dispatch(setIsLoading(true))
    firebaseAppAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res)
      dispatch(setIsLoggedIn(res.user.uid))
      dispatch(setIsLoading(false))
    })
    .catch(err => {
      dispatch(setIsLoading(false))
      dispatch(setError(err.message))
    })
  }
}

export function setIsLoading(isLoading) {
  return {
    type: SET_IS_LOADING,
    isLoading
  }
}

export function submitLogin(email, password) {
  return function(dispatch) {
    dispatch(setIsLoading(true))
    firebaseAppAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      dispatch(setIsLoggedIn(res.user.uid))
      dispatch(setIsLoading(false))
    })
    .catch(err => {
      dispatch(setIsLoading(false))
      dispatch(setError(err.message))
    })
  }
}

export function logOutUser() {
  return function(dispatch) {
    firebaseAppAuth.signOut()
      .then(() => {
        dispatch(setIsLoggedIn(null, false))
      })
      .catch(err =>  {
        dispatch(setError(err.message))
      });
  }
}

export function verifyAuth() {
  return function(dispatch) {
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setIsLoggedIn(user.uid))
      } else {
        dispatch(setIsLoggedIn(null, false))
      }
    })
  }
}