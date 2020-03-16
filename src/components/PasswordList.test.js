import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import PasswordList from './PasswordList'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../store/reducers'

jest.mock('../store/actions/passwordActions')
const history = createMemoryHistory()
const store = createStore(
  reducers
)

test('renders Password List', () => {
  let { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <PasswordList />
      </Router>
    </Provider>
  )
  
  const urlHead = getByTestId('url-head')
  const usernameHead = getByTestId('username-head')
  const passwordHead = getByTestId('password-head')
  const createdAtHead = getByTestId('createdAt-head')
  const updatedAtHead = getByTestId('updatedAt-head')
  const actionsHead = getByTestId('actions-head')

  expect(urlHead).toHaveTextContent('Website URL')
  expect(usernameHead).toHaveTextContent('Username')
  expect(passwordHead).toHaveTextContent('Password')
  expect(createdAtHead).toHaveTextContent('Created At')
  expect(updatedAtHead).toHaveTextContent('Updated At')
  expect(actionsHead).toHaveTextContent('')
})