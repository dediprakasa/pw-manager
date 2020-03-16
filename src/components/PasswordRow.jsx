import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPassword, fetchPasswords, deletePassword } from '../store/actions/passwordActions'
import PasswordWidget from './PasswordWidget'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function PasswordRow (props) {
  const { payload } = props
  const [url, setUrl] = useState(payload.url)
  const [username, setUsername] = useState(payload.username)
  const [password, setPassword] = useState(payload.password)
  const [createdAt] = useState(payload.createdAt)
  const [updatedAt, setUpdatedAt] = useState(payload.updatedAt)
  const [passwordId] = useState(payload.id)
  const [widget, setWidget] = useState(false)
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.app.isLoading)
  const MySwal = withReactContent(Swal)

  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      url,
      username,
      password,
      passwordId
    }
    setWidget(false)
    dispatch(editPassword(payload))
    dispatch(fetchPasswords())
  }

  useEffect(() => {
    setUrl(payload.url)
    setUsername(payload.username)
    setPassword(payload.password)
    setUpdatedAt(payload.updatedAt)
  }, [payload])

  function handleUrlChange(e) {
    setUrl(e.target.value)
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
    setWidget(true)
  }

  function handleDelete() {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EB6264',
      cancelButtonColor: '#5BBC79',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deletePassword(passwordId))
      }
    })
  }

  function getDate(date) {
    let preDate = new Date(Number(String(date.seconds) + String(date.nanoseconds).slice(0, 3)))
    let finalDate = `${preDate.getDate()}-${preDate.getMonth()+1}-${preDate.getFullYear()}`
    let time = `${preDate.toTimeString().slice(0, preDate.toTimeString().indexOf('(') - 1)}`
    return [ finalDate, time ]
  }

  return (
    <div className="w-full text-left">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-2 pt-6 pb-8 mb-4 border border-green-200 flex items-center">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="w-1/6 px-1">
              <input
                data-testid="url-row"
                value={url}
                onChange={handleUrlChange}
                className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="http://example.com" />
            </div>
            <div className="w-1/6 px-1">
              <input
                data-testid="username-row"
                value={username}
                onChange={handleUsernameChange}
                className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="username"
                placeholder="Username" />
            </div>
            <div className="w-1/6 px-1">
              <input
                data-testid="password-row"
                value={password}
                onChange={handlePasswordChange}
                className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Password" />
            </div>
            <div
              data-testid="created-at-row"
              className="w-1/6 px-4 flex flex-col ">
              <span className="leading-none">{getDate(createdAt)[0]}</span>
              <span className="text-xs">{getDate(createdAt)[1]}</span>
            </div>
            <div
              data-testid="updated-at-row"
              className="w-1/6 px-4 flex flex-col">
              <span className="leading-none">{getDate(updatedAt)[0]}</span>
              <span className="text-xs">{getDate(updatedAt)[1]}</span>
            </div>
            <div
              data-testid="actions-row"
              className="w-1/6 px-1">
              <div className="mx-auto w-full flex justify-center items-center">
                <button 
                  className="mr-2 bg-white hover:text-green-700 border border-green-500 text-green-500 font-bold px-2 rounded focus:outline-none focus:shadow-outline items-center"
                  type="submit"
                >
                  Save
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline items-center"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {
            widget
              ? <PasswordWidget password={password} display="row"/>
              : <div/>
          }
        </div>
      </form>
    </div>
  )
}

export default PasswordRow