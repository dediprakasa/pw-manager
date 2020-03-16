import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBZ4NipqX82ahCt3od3R_cx_tkbNGx_flM",
  authDomain: "password-manager-84b9a.firebaseapp.com",
  databaseURL: "https://password-manager-84b9a.firebaseio.com",
  projectId: "password-manager-84b9a",
  storageBucket: "password-manager-84b9a.appspot.com",
  messagingSenderId: "670429063603",
  appId: "1:670429063603:web:451a284e432813a5b203c6"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const firebaseAppAuth = firebase.auth()