import firebase from 'firebase'
import { db } from '../../configs/firebaseConfig'
import store from '../index'
import { setIsLoading, setError } from './userActions'
import { PUSH_PASSWORDS } from '../actionsType'

export function submitPassword(payload) {
  return function(dispatch) {
    dispatch(setIsLoading(true))
    const userId = store.getState().user.userId
    const { url, username, password } = payload
    db.collection('passwords').add({
      url,
      username,
      password,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    })
      .then(doc => {
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        dispatch(setIsLoading(false))
        dispatch(setError(err.message))
      })
  }
}

export function pushPasswords(passwords) {
  return {
    type: PUSH_PASSWORDS,
    passwords
  }
}

export function fetchPasswords() {
  return function(dispatch) {
    const userId = store.getState().user.userId
    db.collection('passwords').where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        let tempArr = []
        querySnapshot.forEach(doc => {
          let password = { id: doc.id, ...doc.data() }
          tempArr.push(password)
        })
        dispatch(pushPasswords(tempArr))
        dispatch(setIsLoading(false))
      }, err => {
        dispatch(setIsLoading(false))
        console.log(err)
      })
  }
}

export function editPassword(payload) {
  return function(dispatch) {
    const { url, username, password, passwordId } = payload
    db.collection('passwords').doc(passwordId).update({
      url,
      username,
      password,
      updatedAt: new Date()
    })
      .then(() => {
        dispatch(setIsLoading(false))
      })
  }
}

export function deletePassword(passwordId) {
  return function(dispatch) {
    db.collection('passwords').doc(passwordId)
      .delete().then(() => {
        dispatch(fetchPasswords)
      })
      .catch(err => {
        console.log(err)
      })
  }
}