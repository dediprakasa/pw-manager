import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux'
import reducers from '../store/reducers'
import { submitPassword } from '../store/actions/passwordActions'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import PasswordForm from './PasswordForm'
import { PUSH_PASSWORDS } from '../store/actionsType'

jest.mock('../store/actions/passwordActions')

test('Input new password', () => {
  const history = createMemoryHistory()
  const store = createStore(
    reducers,
    {
      password: []
    }
  )
  
  let dateInput = new Date()
  const mockSubmitPassword = jest.fn(() => {
    return {
      type: PUSH_PASSWORDS,
      passwords: [
        {
          url: 'http://dummy.com',
          username: 'dummy',
          password: 'dummyPassword1!',
          createdAt: dateInput,
          updatedAt: dateInput
        }
      ]
    }
  })

  submitPassword.mockImplementation(mockSubmitPassword)

  const { debug, container, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <PasswordForm />
      </Router>
    </Provider>
  )

  let urlForm = getByTestId('url-form')
  let usernameForm = getByTestId('username-form')
  let passwordForm = getByTestId('password-form')

  expect(urlForm.value).toBe('')
  expect(usernameForm.value).toBe('')
  expect(passwordForm.value).toBe('')

  fireEvent.change(urlForm, { target: { value: 'http://dummy.com' }})
  fireEvent.change(usernameForm, { target: { value: 'dummy' }})
  fireEvent.change(passwordForm, { target: { value: 'dummyPassword1!' }})

  expect(urlForm.value).toBe('http://dummy.com')
  expect(usernameForm.value).toBe('dummy')
  expect(passwordForm.value).toBe('dummyPassword1!')

  const savePasswordBtn = getByTestId('save-password-btn')

  fireEvent.click(savePasswordBtn)
  
  expect(urlForm.value).toBe('')
  expect(usernameForm.value).toBe('')
  expect(passwordForm.value).toBe('')
  
  const { url, username, password, createdAt, updatedAt } = store.getState().password[0]

  expect(url).toBe('http://dummy.com')
  expect(username).toBe('dummy')
  expect(password).toBe('dummyPassword1!')
  expect(createdAt).toBe(dateInput)
  expect(updatedAt).toBe(dateInput)

  
})