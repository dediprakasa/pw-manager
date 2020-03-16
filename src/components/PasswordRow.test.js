import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../store/reducers'
import PasswordRow from './PasswordRow'
import '@testing-library/jest-dom'

jest.mock('../store/actions/passwordActions')

const history = createMemoryHistory()
const store = createStore(
  reducers,
)
const dateInput = {
  seconds: 1581274,
  nanoseconds: 467
}
const password = {
    url: 'http://dummy.com',
    username: 'dummy',
    password: 'dummyPassword1!',
    createdAt: dateInput,
    updatedAt: dateInput
  }


test('renders User log in', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <PasswordRow payload={password}/>
      </Router>
    </Provider>
  )

  const urlRow = getByTestId('url-row')
  const usernameRow = getByTestId('username-row')
  const passwordRow = getByTestId('password-row')
  const createdAtRow = getByTestId('created-at-row')
  const updatedAtRow = getByTestId('updated-at-row')
  const actionsRow = getByTestId('actions-row')

  expect(urlRow.value).toBe('http://dummy.com')
  expect(usernameRow.value).toBe('dummy')
  expect(passwordRow.value).toBe('dummyPassword1!')
  expect(createdAtRow).toContainHTML('span')
  expect(updatedAtRow).toContainHTML('span')
  expect(actionsRow).toContainHTML('button')
  
})

