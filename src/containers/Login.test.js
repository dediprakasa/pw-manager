import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Login from './Login'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../store/reducers'
import { SET_IS_LOGGED_IN } from '../store/actionsType'
import { submitLogin } from '../store/actions/userActions'

jest.mock('../store/actions/userActions')

test('renders User log in', () => {
  const history = createMemoryHistory()
  const store = createStore(
    reducers,
    {
      user: {
        isLoggedIn: false,
        userId: null
      }
    }
  )

  const mockedSubmitLogin = jest.fn(() => {
    return {
      type: SET_IS_LOGGED_IN,
      isLoggedIn: true,
      userId: 'userIdxxxxx'
    }
  })
  
  submitLogin.mockImplementation(mockedSubmitLogin)

  const { debug, container, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Login/>
      </Router>
    </Provider>
  )
  // debug()
  let emailForm = getByTestId('email-form')
  let passwordForm = getByTestId('password-form')

  expect(emailForm.value).toBe('')
  expect(passwordForm.value).toBe('')

  fireEvent.change(emailForm, { target: { value: 'example@mail.com' }})
  fireEvent.change(passwordForm, { target: { value: 'dummyPassword1!' }})

  expect(emailForm.value).toBe('example@mail.com')
  expect(passwordForm.value).toBe('dummyPassword1!')

  fireEvent.click(getByTestId('login-register-button'))

  const { isLoggedIn, userId } = store.getState().user
  expect(userId).not.toBeNull()
  expect(isLoggedIn).toBe(true)
  expect(history.location.pathname).toBe('/home')
})