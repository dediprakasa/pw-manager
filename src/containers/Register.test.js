import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Register from './Register'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../store/reducers'
import { SET_IS_LOGGED_IN } from '../store/actionsType'
import { submitRegister } from '../store/actions/userActions'

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

  const mockedSubmitRegister = jest.fn(() => {
    return {
      type: SET_IS_LOGGED_IN,
      isLoggedIn: true,
      userId: 'userIdxxxxx'
    }
  })
  
  submitRegister.mockImplementation(mockedSubmitRegister)

  const { debug, container, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Register />
      </Router>
    </Provider>
  )
  // debug()
  fireEvent.click(getByTestId('login-register-button'))
  const { isLoggedIn, userId } = store.getState().user
  expect(userId).not.toBeNull()
  expect(isLoggedIn).toBe(true)
  expect(history.location.pathname).toBe('/home')
})