import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import PrivateRoute from './PrivateRoute'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../store/reducers'

jest.mock('../store/actions/userActions')
const history = createMemoryHistory()


test('renders User logged in', () => {  
  let store = createStore(
    reducers,
    {
      user: {
        isLoggedIn: true,
        userId: 'dummy'
      }
    }
  )
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </Provider>
  )
  expect(history.location.pathname).toBe('/')
})

test('renders User not logged in', () => {  
  let store = createStore(
    reducers,
    {
      user: {
        isLoggedIn: false,
        userId: null
      }
    }
  )
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </Provider>
  )
  expect(history.location.pathname).toBe('/login')
})