import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitPassword } from '../store/actions/passwordActions'
import { setIsLoading } from '../store/actions/userActions'
import { ClipLoader } from 'react-spinners'
import PasswordWidget from './PasswordWidget'
import TypeImage from './TypeImage'

function PasswordForm() {
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.app.isLoading)
  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      url,
      username,
      password
    }
    setUrl('')
    setUsername('')
    setPassword('')
    setIsTyping(false)
    dispatch(setIsLoading(true))
    dispatch(submitPassword(payload))
  }

  function handleUrlChange(e) {
    setIsTyping(true)
    setUrl(e.target.value)
  }

  function handleUsernameChange(e) {
    setIsTyping(true)
    setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    setIsTyping(true)
    setPassword(e.target.value)
  }

  return (
    <div
      data-testid="password-form-container"
      className="w-full text-left">
      <form 
        onSubmit={handleSubmit}
        className={`bg-white flex shadow-lg ${!isTyping ? 'justify-between' : ''} rounded px-8 pt-6 pb-8 mb-4 border border-green-200`}>
        <div className="w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="website">
              Website URL
            </label>
            <input
              data-testid="url-form"
              value={url}
              onChange={handleUrlChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="website" 
              type="text"
              placeholder="http://example.com"
              required />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="username">
              Username
            </label>
            <input
              data-testid="username-form"
              value={username}
              onChange={handleUsernameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" 
              type="text"
              placeholder="Username"
              required />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="password">
              Password
            </label>
            <input
              data-testid="password-form"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="Password"
              required />
          </div>
          <button 
            data-testid="save-password-btn"
            className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center"
            type="submit"
          >
            {
              isLoading
                ? <div className="flex justify-center">
                    <ClipLoader
                      size={20}
                      color={"#fff"}
                      loading={isLoading}
                    />
                  </div>
                : 'Save'
            }
          </button>
        </div>
        {
          isTyping
          ? <PasswordWidget password={password} display="col"/>
          : <TypeImage />
        }
      </form>
    </div>
  )
}

export default PasswordForm