import React from 'react'
import { Link } from 'react-router-dom'
import LogInOutButton from './LogInOutButton'
import { useSelector, useDispatch } from 'react-redux'
import { logOutUser } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'


function TheNavbar() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()
  const history = useHistory()

  function logOut() {
    dispatch(logOutUser())
    history.push('/')
  }

  return (
    <div className="h-20 w-full text-center fixed bg-white top-0 z-30 flex items-center border-b-2 shadow-md">
      <div className="flex w-full justify-between">
        <Link to="/" className="text-xl text-left p-2 block cursor-pointer font-bold text-green-500">
          Password Manager
        </Link>
        {
          isLoggedIn
          ? <LogInOutButton text="Log Out" onClick={logOut}/>
          : <LogInOutButton text="Log In" onClick={() => history.push('/login')}/>
        }
    </div>
  </div>
  )
}

export default TheNavbar