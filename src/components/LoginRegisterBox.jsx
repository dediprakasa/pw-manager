import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginRegisterButton from './LoginRegisterButton'
import { submitRegister, submitLogin } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function LoginRegisterBox(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  function handleSubmit() {
    if (props.type === 'register') {
      dispatch(submitRegister(email, password))
    } else {
      dispatch(submitLogin(email, password))
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function renderLoginRegisterButton() {
    if (props.type === 'login') {
      return (
        <div className="flex flex-col items-center justify-between">
          <LoginRegisterButton
            onClick={handleSubmit}
            type="Log In" />
          <Link
            to="/register"
            className="text-sm font-bold text-gray-700 hover:text-green-500">
            Create an account
          </Link>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-between">
          <LoginRegisterButton
            onClick={handleSubmit}
            type="Register" />
          <Link
            to="/login"
            className="text-sm font-bold text-gray-700 hover:text-green-500">
            Already have an account
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="w-full max-w-xs text-left">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border border-green-200">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="email">
            Email
          </label>
          <input
            data-testid="email-form"
            onChange={handleEmailChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" 
            type="email"
            placeholder="Email" />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="password">
            Password
          </label>
          <input
            data-testid="password-form"
            onChange={handlePasswordChange}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************" />
        </div>
        { renderLoginRegisterButton() }
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Deprak. All rights reserved.
      </p>
    </div>
  )
}

export default LoginRegisterBox