import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import LogInOutButton from './LogInOutButton' 
import { createMemoryHistory } from 'history'
import { SET_IS_LOGGED_IN } from '../store/actionsType'
import { createStore } from 'redux'
import { logOutUser } from '../store/actions/userActions'
import { Provider } from 'react-redux'
import reducers from '../store/reducers'

jest.mock('../store/actions/userActions')

const history = createMemoryHistory()
const store = createStore(
  reducers,
  {
    user: {
      isLoggedIn: true,
      userId: 'userIdDummy'
    }
  }
)

const mockLogOutUser = jest.fn(() => {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn: false,
    userId: null
  }
})

logOutUser.mockImplementation(mockLogOutUser)

test('render log in button', () => {
  let { getByText } = render(
    <Router history={history}>
      <LogInOutButton text="Log In" onClick={() => history.push('/login')} />
    </Router>
  )
  let textBtn = getByText('Log In')
  expect(textBtn).toBeInTheDocument('Log In')
  fireEvent.click(textBtn)
  expect(history.location.pathname).toBe('/login')
  
})

test('render log out button', () => {
  let { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <LogInOutButton text="Log Out" onClick={logOut}/>
      </Router>
    </Provider>
  )
  function logOut() {
    store.dispatch(logOutUser())
    history.push('/')
  }
  let textBtn = getByText('Log Out')
  expect(textBtn).toBeInTheDocument('Log Out')
  fireEvent.click(textBtn)
  expect(history.location.pathname).toBe('/')
})